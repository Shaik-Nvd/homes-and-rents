const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelFilePath = path.join(__dirname, '../99acres_bangalore_complete_merged.xlsx');
const outputFilePath = path.join(__dirname, '../src/data/excelProperties.json');

// Read the excel file
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const properties = [];
const headers = data[0];

for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (!row || row.length === 0) continue;
  
  // Mapping logic
  // Headers: ['Name', 'Price', 'Location', 'Status', 'BHK', 'RERA', 'Type', 'URL', 'Region']
  const title = row[0] || 'Unknown Property';
  const price = row[1] || 'Price on Request';
  const location = row[2] || row[8] || 'Bangalore'; // Fallback to Region if Location is empty
  const bhk = row[4] ? row[4].split(' ')[0] : '2'; // Extract just the number if possible
  
  properties.push({
    id: `excel-${i}`,
    title: title,
    description: `A beautiful property located in ${location}. Status: ${row[3] || 'N/A'}, RERA: ${row[5] || 'N/A'}.`,
    price: price,
    location: location,
    bhk: bhk,
    type: 'Sale', // Categorize as Sale for Buy Homes tab
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'],
    latitude: 12.9716, // Default Bangalore coords
    longitude: 77.5946,
    created_at: new Date().toISOString()
  });
}

// Create data directory if it doesn't exist
const dir = path.dirname(outputFilePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputFilePath, JSON.stringify(properties, null, 2));
console.log(`Successfully extracted ${properties.length} properties to ${outputFilePath}`);
