import pandas as pd
import re
import json
import math

df = pd.read_excel('C:\\Users\\Mubeen_Taj\\Downloads\\Homes and Rents\\99acres_Bangalore_NewLaunch_PropertyDetails.xlsx')

with open('src/data/projects.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

existing_titles = set(re.findall(r'title:\s*\"([^\"]+)\"', ts_content))
new_projects_ts = []

def is_nan(val):
    if isinstance(val, float) and math.isnan(val):
        return True
    if str(val).strip() == 'nan':
        return True
    return False

for _, row in df.iterrows():
    title = str(row.get('Project Name', '')).strip()
    if title in existing_titles or not title or is_nan(title):
        continue
        
    id_val = title.lower().replace(' ', '-').replace(',', '').replace('.', '')
    subtitle = str(row.get('Configurations', '')).strip()
    builder = str(row.get('Builder Name', '')).strip()
    status = str(row.get('Possession Status', '')).strip()
    
    floor_plans_str = row.get('Floor Plans & Pricing', '')
    price_configs = []
    if not is_nan(floor_plans_str):
        lines = str(floor_plans_str).split('\n')
        for line in lines:
            m = re.match(r'(.+?):\s*.*?\((.+?)\)', line)
            if m:
                label = f"{m.group(1).strip()} Apartment"
                price = f"₹{m.group(2).strip()}"
                price_configs.append({'label': label, 'price': price})
    
    nearby_str = row.get('Location Advantages', '')
    nearby = []
    if not is_nan(nearby_str):
        nearby_lines = str(nearby_str).split('\n')
        for line in nearby_lines:
            loc = re.sub(r'\(.*?\)', '', line).strip()
            if loc:
                nearby.append(loc)
                
    tags_str = str(row.get('Tags', ''))
    badges = []
    if str(row.get('RERA', '')) == 'RERA':
        badges.append('RERA')
    if 'No Brokerage' in tags_str:
        badges.append('ZERO BROKERAGE')
    if '3D Floor Plans' in tags_str:
        badges.append('3D')
    badges.append('SEEN')
    
    about_text = row.get('About Project', '')
    if is_nan(about_text):
        about_text = ''
    else:
        about_text = str(about_text).strip()
    
    description = about_text[:150] + '...' if len(about_text) > 150 else about_text
    
    image_src = f"/{title.replace(' ', '_')}.jpg"
    
    proj_str = f"""  {{
    id: "{id_val}",
    title: "{title}",
    subtitle: "{subtitle}",
    priceConfigs: {json.dumps(price_configs)},
    nearby: {json.dumps(nearby)},
    builder: "{builder}",
    status: "{status.replace(' (', ' · ').replace(')', '')}",
    imageSrc: "{image_src}",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: {json.dumps(badges)},
    description: {json.dumps(description)},
    galleryImages: ['{image_src}'],
    aboutText: {json.dumps(about_text)}
  }}"""
    new_projects_ts.append(proj_str)

if new_projects_ts:
    new_items_str = ',\n' + ',\n'.join(new_projects_ts)
    idx = ts_content.rfind('];')
    if idx != -1:
        updated_ts = ts_content[:idx].rstrip() + new_items_str + '\n];\n'
        with open('src/data/projects.ts', 'w', encoding='utf-8') as f:
            f.write(updated_ts)
        print(f"Added {len(new_projects_ts)} new projects.")
    else:
        print("Could not find end of array in projects.ts")
else:
    print("No new projects to add.")
