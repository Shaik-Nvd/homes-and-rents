export interface PriceConfig {
  label: string;
  price: string;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  priceConfigs: PriceConfig[];
  nearby: string[];
  builder: string;
  status: string;
  imageSrc: string;
  imageCount: string;
  tag: string;
  badges: string[];
  description?: string;
  
  // Detail page specifics
  galleryImages?: string[];
  aboutText?: string;
}

export const projects: ProjectData[] = [
  {
    id: "gr-samskruthi",
    title: "GR Samskruthi",
    subtitle: "2, 3 BHK Apartment in Sarjapura Attibele Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹75.24 L" },
      { label: "3 BHK Apartment", price: "₹93.09 - 98.69 L" }
    ],
    nearby: ["SH 35", "Sri Sai Hospitals, Attibele", "Jnana Jyoti Public School", "SRT Mall", "Anthivadi Stadium"],
    builder: "GR Constructions",
    status: "Under Construction · Completion in Nov, 2025",
    imageSrc: "/gr-samskruthi.jpg",
    imageCount: "",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    galleryImages: [
      '/GR%20Samskruthi/gr-samskruthi.jpg',
      '/GR%20Samskruthi/Gemini_Generated_Image_netgznnetgznnetg.png',
      '/GR%20Samskruthi/Gemini_Generated_Image_xtui3sxtui3sxtui.png',
      '/GR%20Samskruthi/Gemini_Generated_Image_yxk4kkyxk4kkyxk4.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025156.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025208.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025217.png'
    ],
    aboutText: "GR Samskruthi is a premium residential project located on Sarjapura Attibele Road, Bangalore. It is designed to offer a luxurious and serene lifestyle, combining modern architecture with vast open green spaces. Spread across a sprawling 2-acre landscape, the project features meticulously designed 2 and 3 BHK apartments that ensure optimal space utilization, natural light, and ventilation."
  },
  {
    id: "sumadhura-edition",
    title: "Sumadhura Edition",
    subtitle: "3, 4 BHK Apartment in Nallurhalli, Whitefield",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.54 - 3.88 Cr" },
      { label: "4 BHK Apartment", price: "₹3.37 - 3.89 Cr" }
    ],
    nearby: ["Manipal Hospital Varthur Road", "Brookefield Mall", "CMR Institute of Technology", "National Highway 44", "Seetharam Palya Metro Station"],
    builder: "Sumadhura Group",
    status: "New Launch · Completion in Dec, 2029",
    imageSrc: "/Sumadhura_Edition.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Check out 3,4 BHK apartments in Nallurhalli, now available for...",
    galleryImages: ['/Sumadhura_Edition.jpg'],
    aboutText: "Sumadhura Edition brings ultra-luxury 3 and 4 BHK residences to the heart of Whitefield. Designed for modern connoisseurs, it blends exquisite design with state-of-the-art amenities to provide an unmatched lifestyle."
  },
  {
    id: "roach-cicada",
    title: "Roach Cicada",
    subtitle: "3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.86 - 3.17 Cr" },
      { label: "4 BHK Apartment", price: "₹3.6 - 3.9 Cr" }
    ],
    nearby: ["Glentree Academy School", "Amrita Vishwa Vidyapeetam", "PNR felicity mall", "Narayana Hospital", "Kempegowda International Airport"],
    builder: "Roach Lifescapes",
    status: "New Launch · Completion in Dec, 2029",
    imageSrc: "/Roach_Cicada.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 3,4 BHK apartments in Sarjapur Road are available for...",
    galleryImages: ['/Roach_Cicada.jpg'],
    aboutText: "Roach Cicada is an exclusive residential community on Sarjapur Road offering thoughtfully designed 3 and 4 BHK apartments. The project features a wide array of lifestyle amenities nestled within lush green surroundings."
  },
  {
    id: "keya-the-urban-forest",
    title: "Keya The Urban Forest",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.7 Cr" },
      { label: "3 BHK Apartment", price: "₹2.14 - 2.39 Cr" },
      { label: "4 BHK Apartment", price: "₹3 - 3.3 Cr" }
    ],
    nearby: ["BRS Global School", "Amrita Vishwa Vidyapeetam", "BRS Global School", "Centro", "Kempegowda International"],
    builder: "Keya Homes",
    status: "Under Construction · Completion in Dec, 2027",
    imageSrc: "/Keya_The_Urban_Forest.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Here are beautifully built 2,3,4 BHK apartments in Sarjapur Road, available for sale at Keya The Urban Forest. This society is RERA approved and PRM/KA/RERA/1251/310/PR/200525/007759 is the RERA number. Prices of apartments in this project, vary between Rs. 1.7 - 3.3 Cr. Apartments in Keya The Urban Forest have SUPER area ranging between 1,351 - 2,610 sqft",
    galleryImages: ['/Keya_The_Urban_Forest.jpg'],
    aboutText: "Keya The Urban Forest offers an eco-friendly living experience on Sarjapur Road. This meticulously planned project integrates nature with premium living, offering extensive green covers and sustainable features alongside 2, 3, and 4 BHK apartments."
  },
  {
    id: "vaishnavi-at-one-krishna-brindavan",
    title: "Vaishnavi AT One Krishna Brindavan",
    subtitle: "3, 4 BHK Apartment in Banashankari Stage 2, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹3.5 - 3.54 Cr" },
      { label: "4 BHK Apartment", price: "₹5 Cr" }
    ],
    nearby: ["ORCHIDS The International School", "Dayananda Sagar University", "Manipal Hospitals Jayanagar", "Forum South Bengaluru", "Kempegowda International Airport"],
    builder: "Vaishnavi Group Bangalore",
    status: "New Launch · Completion in Jun, 2030",
    imageSrc: "/Vaishnavi_AT_One_Krishna_Brindavan.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Beautiful 3,4 BHK apartments in Banashankari Stage 2, are now available in Vaishnavi AT One Krishna Brindavan housing project. Apartments in this complex are available in price range of Rs. 3.5 - 5 Cr. Vaishnavi AT One Krishna Brindavan 's RERA registration number is PRM/KA/RERA/1251/310/PR/081025/008140. Apartments in Vaishnavi AT One Krishna Brindavan have SUPER area ranging between 2,050 - 2,566 sqft",
    galleryImages: ['/Vaishnavi_AT_One_Krishna_Brindavan.jpg'],
    aboutText: "Vaishnavi AT One Krishna Brindavan is an upcoming landmark in Banashankari Stage 2. It offers expansive 3 and 4 BHK apartments with impeccable finishing, robust infrastructure, and seamless connectivity to prime city nodes."
  },
  {
    id: "the-berries-for-birds",
    title: "The Berries For Birds",
    subtitle: "3, 4 BHK Villa in Whitefield, Bangalore",
    priceConfigs: [
      { label: "3 BHK Villa", price: "₹2.25 Cr" },
      { label: "4 BHK Villa", price: "₹2.33 - 4.28 Cr" }
    ],
    nearby: ["DPS Whitefield", "Rudrappa Healthcare", "Winmore academy Whitefield", "Arya Hub Mall", "Kempegowda International Airport"],
    builder: "Sanjeevini Group",
    status: "New Launch · Completion in Jul, 2028",
    imageSrc: "/The_Berries_For_Birds.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious and elegant 3,4 BHK Villa are for sale in The Berries For Birds, Whitefield. Villas size in The Berries For Birds varies from 1,900 - 4,500 sqft. Swimming Pool, Gymnasium and Club House are some of the major amenities offered here. Villas in The Berries For Birds are New Launch",
    galleryImages: ['/The_Berries_For_Birds.jpg'],
    aboutText: "The Berries For Birds introduces luxurious 3 and 4 BHK villas in Whitefield. Designed with a focus on elegance and comfort, the villas feature private spaces, premium amenities like a clubhouse and swimming pool, and an ideal location."
  },
  {
    id: "trifecta-veranza",
    title: "Trifecta Veranza",
    subtitle: "3, 4 BHK Apartment in East Bangalore, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.48 - 1.63 Cr" },
      { label: "4 BHK Apartment", price: "₹2.29 Cr" }
    ],
    nearby: ["The International School", "National Highway 948A", "Wipro SEZ", "Greenwood International School", "Azim Premji University"],
    builder: "Trifecta Projects",
    status: "New Launch · Completion in Dec, 2029",
    imageSrc: "/Trifecta_Veranza.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3,4 BHK apartments in East Bangalore, available for sale at Trifecta Veranza. Trifecta Veranza 's RERA registration number is PRM/KA/RERA/1251/308/PR/210126/008418. Apartments in this complex are available in price range of Rs. 1.48 - 2.29 Cr. Trifecta Veranza apartments are available in multiples sizes.",
    galleryImages: ['/Trifecta_Veranza.jpg'],
    aboutText: "Trifecta Veranza offers an elevated lifestyle in East Bangalore with its thoughtfully crafted 3 and 4 BHK apartments. The project brings modern living and convenience together, featuring comprehensive lifestyle amenities."
  },
  {
    id: "global-edifice-the-clan",
    title: "Global Edifice The Clan",
    subtitle: "2, 3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹83.79 L - 1 Cr" },
      { label: "3 BHK Apartment", price: "₹1.11 - 1.35 Cr" }
    ],
    nearby: ["Aikhyatha Public School", "Town Hospital Sarjapura", "Azim Premji University", "Clover Greens Golf Course", "Karmelaram Train Station"],
    builder: "Global Edifice",
    status: "Under Construction · Completion in Dec, 2027",
    imageSrc: "/Global_Edifice_The_Clan.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Global Edifice The Clan, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Sarjapur Road. This society offers apartments in the price range of Rs. 83.79 L - 1.35 Cr. Apartments in Global Edifice The Clan have SUPER area ranging between 1,289 - 1,827 sqft. This society is RERA approved and PRM/KA/RERA/1251/308/PR/091025/008153 is the RERA number",
    galleryImages: ['/Global_Edifice_The_Clan.jpg'],
    aboutText: "Global Edifice The Clan is an esteemed housing society in Bangalore East, featuring classic and modern 2 and 3 BHK apartments. Enjoy robust community living with state-of-the-art facilities in a fast-growing neighborhood."
  },
  {
    id: "amrutha-lake-vista",
    title: "Amrutha Lake Vista",
    subtitle: "3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.65 - 2.21 Cr" }
    ],
    nearby: ["Whitefield Station", "Kempegowda Intl Airport", "ITPB", "Forum Shantiniketan Mall", "Manipal Hospital"],
    builder: "Amrutha Shelters",
    status: "New Launch · Completion in Dec, 2028",
    imageSrc: "/Amrutha_Lake_Vista.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Check out 3 BHK apartments in Whitefield, now available for sale at Amrutha Lake Vista. Here units have different sizes, mostly in range of 1,520 - 2,030 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/310/PR/210625/007861 is the RERA number. Apartments in this complex are available in price range of Rs. 1.65 - 2.21 Cr",
    galleryImages: ['/Amrutha_Lake_Vista.jpg'],
    aboutText: "Amrutha Lake Vista offers serene, lake-facing 3 BHK apartments in Whitefield. Experience tranquility away from the bustling city while staying connected to major tech parks, malls, and transit hubs."
  },
  {
    id: "assetz-meru-and-meadow",
    title: "Assetz Meru and Meadow",
    subtitle: "2, 3 BHK Apartment in Devanahalli, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹93 L" },
      { label: "3 BHK Apartment", price: "₹1.08 - 1.25 Cr" }
    ],
    nearby: ["Shanti Niketan Public School", "D-Mart", "Akash Hospital", "Kempegowda International Airport", "Devanahalli Business Park"],
    builder: "Assetz Property Group",
    status: "Under Construction · Completion in Mar, 2026",
    imageSrc: "/Assetz_Meru_and_Meadow.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Located on the fast-developing Devanahalli Main Road, Assetz Meru and Meadow is an excellent residential community thoughtfully designed to suit your fast-paced lifestyle. This RERA certified project offers 2 & 3 BHK Vaastu compliant homes, surrounded by natural greens and state of the art amenities...",
    galleryImages: ['/Assetz_Meru_and_Meadow.jpg'],
    aboutText: "Located on the fast-developing Devanahalli Main Road, Assetz Meru and Meadow is an excellent residential community thoughtfully designed to suit your fast-paced lifestyle. This RERA certified project offers 2 & 3 BHK Vaastu compliant homes, surrounded by natural greens and state of the art amenities."
  },
  {
    id: "mythri-sity",
    title: "Mythri Sity",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.07 - 1.16 Cr" },
      { label: "3 BHK Apartment", price: "₹1.13 - 1.87 Cr" },
      { label: "4 BHK Apartment", price: "₹2.3 Cr" }
    ],
    nearby: ["Primus Public School", "Sparsh Hospital", "Bangalore Technical Institute", "Bengaluru Airport", "NH 44"],
    builder: "Mythri Builders",
    status: "New Launch · Completion in Aug, 2029",
    imageSrc: "/Mythri_Sity.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Mythri Sity society now offers elegantly built 2,3,4 BHK apartments in Sarjapur Road. Apartments in this complex are available in price range of Rs. 1.07 - 2.3 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/300525/007802 registration number. Mythri Sity apartments are available in multiples sizes, ranging from 1,178 - 2,531 sqft SUPER area",
    galleryImages: ['/Mythri_Sity.jpg'],
    aboutText: "Mythri Sity society now offers elegantly built 2,3,4 BHK apartments in Sarjapur Road. Apartments in this complex are available in price range of Rs. 1.07 - 2.3 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/300525/007802 registration number. Mythri Sity apartments are available in multiples sizes, ranging from 1,178 - 2,531 sqft SUPER area"
  }
];
