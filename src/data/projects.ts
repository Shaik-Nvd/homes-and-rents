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
  videoLinks?: string[];
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
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025217.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025231.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025243.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025251.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025300.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025311.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025319.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025328.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025337.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025344.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025352.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025359.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025407.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025456.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025511.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025533.png',
      '/GR%20Samskruthi/Screenshot%202026-07-26%20025547.png'
    ],
    videoLinks: [
      'https://youtu.be/OS1lqgmIAl0?si=KJX_ekcy3ucrY0_c',
      'https://youtu.be/IJHuNi0mOrA?si=uat265QUiaXzYy_x'
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
  },
  {
    id: "mythri-street",
    title: "Mythri Street",
    subtitle: "Property in Sarjapur Road, Bangalore",
    priceConfigs: [],
    nearby: ["Sarjapur Road", "Peripheral Ring Road", "Carmelaram Railway Station", "Punarjani Ayurvedic Hospital", "GSS Sports Arena"],
    builder: "Mythri Builders",
    status: "Under Construction · Completion in Dec, 2029",
    imageSrc: "/Mythri_Street.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Mythri Street is an upcoming premium property strategically located on Sarjapur Road by Mythri Builders. Offering excellent connectivity to Peripheral Ring Road and Carmelaram Railway Station, the project is designed for modern urban living.",
    galleryImages: ['/Mythri_Street.jpg'],
    aboutText: "Mythri Street is an upcoming premium property strategically located on Sarjapur Road by Mythri Builders. Offering excellent connectivity to Peripheral Ring Road and Carmelaram Railway Station, the project is designed for modern urban living."
  },
  {
    id: "nambiar-district-25",
    title: "Nambiar District 25",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.7 - 2.71 Cr" },
      { label: "3 BHK Apartment", price: "₹2.03 - 2.85 Cr" },
      { label: "4 BHK Apartment", price: "₹3.37 - 4.18 Cr" }
    ],
    nearby: ["Kshema Hospital", "Smrti Academy", "Wipro SEZ", "Huskur Road Metro Station", "State Highway 35"],
    builder: "Nambiar Builders",
    status: "New Launch · Completion in Jan, 2030",
    imageSrc: "/Nambiar_District_25.jpg",
    imageCount: "1/18",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 2,3,4 BHK apartments in Sarjapur Road, available for sale at Nambiar District 25. This society offers apartments in the price range of Rs. 1.7 - 4.18 Cr. Nambiar District 25 apartments are available in multiples sizes, ranging from 1,245 - 2,996 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/308/PR/100125/007377 is the RERA number",
    galleryImages: ['/Nambiar_District_25.jpg'],
    aboutText: "Here are beautifully built 2,3,4 BHK apartments in Sarjapur Road, available for sale at Nambiar District 25. This society offers apartments in the price range of Rs. 1.7 - 4.18 Cr. Nambiar District 25 apartments are available in multiples sizes, ranging from 1,245 - 2,996 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/308/PR/100125/007377 is the RERA number"
  },
  {
    id: "northern-lights",
    title: "Northern Lights by Puravankara KVN",
    subtitle: "2, 3, 4 BHK Apartment in Bagalur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.4 - 1.47 Cr" },
      { label: "3 BHK Apartment", price: "₹1.85 - 2.16 Cr" },
      { label: "4 BHK Apartment", price: "₹4.42 - 4.54 Cr" }
    ],
    nearby: ["The School of Raya", "Reva University", "Delhi Public School", "New Bangalore Hospital", "Manipal Hospitals"],
    builder: "Puravankara",
    status: "New Launch · Completion from Dec, 2029 onwards",
    imageSrc: "/Northern_Lights_by_Puravankara_KVN.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 2,3,4 BHK apartments in Bagalur, available for sale at Northern Lights by Puravankara KVN. Apartments in Northern Lights by Puravankara KVN have SUPER area ranging between 1,275 - 4,131 sqft. Prices of apartments in this project, vary between Rs. 1.4 - 4.54 Cr. This society is RERA approved and PRM/KA/RERA/1251/309/PR/120326/008525 is the RERA number",
    galleryImages: ['/Northern_Lights_by_Puravankara_KVN.jpg'],
    aboutText: "Here are beautifully built 2,3,4 BHK apartments in Bagalur, available for sale at Northern Lights by Puravankara KVN. Apartments in Northern Lights by Puravankara KVN have SUPER area ranging between 1,275 - 4,131 sqft. Prices of apartments in this project, vary between Rs. 1.4 - 4.54 Cr. This society is RERA approved and PRM/KA/RERA/1251/309/PR/120326/008525 is the RERA number"
  },
  {
    id: "sumadhura-solea",
    title: "Sumadhura Solea",
    subtitle: "3, 4 BHK Apartment in Thanisandra, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.08 - 2.38 Cr" },
      { label: "4 BHK Apartment", price: "₹2.7 - 2.87 Cr" }
    ],
    nearby: ["North Hills International School", "HKBK College of Engineering", "Manipal Hospital Hebbal", "Elements Mall", "Kempegowda International Airport"],
    builder: "Sumadhura Group",
    status: "New Launch · Completion in Jun, 2029",
    imageSrc: "/Sumadhura_Solea.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Sumadhura Solea society now offers elegantly built 3,4 BHK apartments in Thanisandra. Apartments in Sumadhura Solea have SUPER area ranging between 1,560 - 2,155 sqft. Sumadhura Solea is a RERA- registered society and PRM/KA/RERA/1251/446/PR/100326/008517 is the RERA registration number. This society offers apartments in the price range of Rs. 2.08 - 2.87 Cr",
    galleryImages: ['/Sumadhura_Solea.jpg'],
    aboutText: "Sumadhura Solea society now offers elegantly built 3,4 BHK apartments in Thanisandra. Apartments in Sumadhura Solea have SUPER area ranging between 1,560 - 2,155 sqft. Sumadhura Solea is a RERA- registered society and PRM/KA/RERA/1251/446/PR/100326/008517 is the RERA registration number. This society offers apartments in the price range of Rs. 2.08 - 2.87 Cr"
  },
  {
    id: "eeshanya-aaroha",
    title: "Eeshanya Aaroha",
    subtitle: "2, 3 BHK Apartment in Soukya Road, Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹81.24 L" },
      { label: "3 BHK Apartment", price: "₹1.04 - 1.28 Cr" }
    ],
    nearby: ["Bangalore International Academy", "National Highway 648", "MVJ College of Engineering", "Whitefield Railway Station", "Kadugodi Metro Station"],
    builder: "Eeshanya Infra LLP",
    status: "Under Construction · Completion in Jun, 2027",
    imageSrc: "/Eeshanya_Aaroha.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Soukya Road are available for sale.Check out latest property options at Eeshanya Aaroha housing society. Here units have different sizes, mostly in range of 1,055 - 1,660 sqft SUPER area. Apartments in this complex are available in price range of Rs. 81.24 L - 1.28 Cr. This society is RERA approved and PRM/KA/RERA/1250/304/PR/150925/008093 is the RERA number",
    galleryImages: ['/Eeshanya_Aaroha.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Soukya Road are available for sale.Check out latest property options at Eeshanya Aaroha housing society. Here units have different sizes, mostly in range of 1,055 - 1,660 sqft SUPER area. Apartments in this complex are available in price range of Rs. 81.24 L - 1.28 Cr. This society is RERA approved and PRM/KA/RERA/1250/304/PR/150925/008093 is the RERA number"
  },
  {
    id: "house-of-sapiens",
    title: "House of Sapiens",
    subtitle: "2, 3 BHK Apartment in Hoskote, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹95.5 L - 1.16 Cr" },
      { label: "3 BHK Apartment", price: "₹1.36 - 1.88 Cr" }
    ],
    nearby: ["Capstone High School", "Silicon City Hospital", "Sri Channabyre Gowda Stadium", "National Highway 75", "Orion Uptown Mall"],
    builder: "Ma Sarada Constructions Bangalore",
    status: "New Launch · Completion in Jan, 2031",
    imageSrc: "/House_of_Sapiens.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3 BHK apartments in Hoskote, are now available in House of Sapiens housing project. House of Sapiens has apartments in multiple configurations, in range of 1,120 - 2,210 sqft. This society offers apartments in the price range of Rs. 95.5 L - 1.88 Cr. This society is RERA approved and PRM/KA/RERA/1250/304/PR/310126/008441 is the RERA number",
    galleryImages: ['/House_of_Sapiens.jpg'],
    aboutText: "Beautiful 2,3 BHK apartments in Hoskote, are now available in House of Sapiens housing project. House of Sapiens has apartments in multiple configurations, in range of 1,120 - 2,210 sqft. This society offers apartments in the price range of Rs. 95.5 L - 1.88 Cr. This society is RERA approved and PRM/KA/RERA/1250/304/PR/310126/008441 is the RERA number"
  },
  {
    id: "assetz-zen-and-sato",
    title: "Assetz Zen and Sato",
    subtitle: "3, 4 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.7 - 2.76 Cr" },
      { label: "4 BHK Apartment", price: "₹3.7 Cr" }
    ],
    nearby: ["REVA University", "Delhi Public School Bangalore North", "National Highway 44", "Sparsh Hospital Yelahanka", "The Galleria Mall"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in May, 2030",
    imageSrc: "/Assetz_Zen_and_Sato.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 3,4 BHK apartments in Yelahanka, now available for sale at Assetz Zen and Sato. Assetz Zen and Sato apartments are available in multiples sizes, ranging from 2,159 - 2,955 sqft SUPER area. Assetz Zen and Sato 's RERA registration number is PRM/KA/RERA/1251/472/PR/080525/007728. Apartment prices in this housing society vary in the range of Rs. 2.7 - 3.7 Cr",
    galleryImages: ['/Assetz_Zen_and_Sato.jpg'],
    aboutText: "Check out 3,4 BHK apartments in Yelahanka, now available for sale at Assetz Zen and Sato. Assetz Zen and Sato apartments are available in multiples sizes, ranging from 2,159 - 2,955 sqft SUPER area. Assetz Zen and Sato 's RERA registration number is PRM/KA/RERA/1251/472/PR/080525/007728. Apartment prices in this housing society vary in the range of Rs. 2.7 - 3.7 Cr"
  },
  {
    id: "aparna-wonderwoods",
    title: "Aparna Wonderwoods",
    subtitle: "2, 3 BHK Apartment in Mallasandra, Near Kanakpura Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.25 - 1.41 Cr" },
      { label: "3 BHK Apartment", price: "₹1.52 - 2.03 Cr" }
    ],
    nearby: ["National Highway 48", "Sri Kumaran Public School", "Thalaghattapura Metro Station", "Forum South Mall", "Ashmitha Multispeciality Hospital"],
    builder: "Aparna Constructions",
    status: "New Launch · Completion in Feb, 2031",
    imageSrc: "/Aparna_Wonderwoods.jpg",
    imageCount: "1/11",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2,3 BHK apartments in Mallasandra, available for sale in Aparna Wonderwoods. Apartments in this complex are available in price range of Rs. 1.25 - 2.03 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/080626/008706 registration number. Aparna Wonderwoods has apartments in multiple configurations, in range of 1,292 - 2,092 sqft",
    galleryImages: ['/Aparna_Wonderwoods.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3 BHK apartments in Mallasandra, available for sale in Aparna Wonderwoods. Apartments in this complex are available in price range of Rs. 1.25 - 2.03 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/080626/008706 registration number. Aparna Wonderwoods has apartments in multiple configurations, in range of 1,292 - 2,092 sqft"
  },
  {
    id: "vrushabadri-winter-park",
    title: "Vrushabadri Winter Park",
    subtitle: "2, 3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹88.9 - 92.4 L" },
      { label: "3 BHK Apartment", price: "₹1 - 1.23 Cr" }
    ],
    nearby: ["State Highway 35", "The Foundation School", "Forum Value Mall", "Azim Premji University", "RGA Techpark"],
    builder: "Vrushabadri Developers",
    status: "New Launch · Completion in Dec, 2028",
    imageSrc: "/Vrushabadri_Winter_Park.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3 BHK apartments in Sarjapur Road, are now available in Vrushabadri Winter Park housing project. Vrushabadri Winter Park apartments are available in multiples sizes, ranging from 1,270 - 1,755 sqft SUPER area. Prices of apartments in this project, vary between Rs. 88.9 L - 1.23 Cr. Vrushabadri Winter Park is a RERA- registered society and PRM/KA/RERA/1251/308/PR/070526/008631 is the RERA registration number",
    galleryImages: ['/Vrushabadri_Winter_Park.jpg'],
    aboutText: "Beautiful 2,3 BHK apartments in Sarjapur Road, are now available in Vrushabadri Winter Park housing project. Vrushabadri Winter Park apartments are available in multiples sizes, ranging from 1,270 - 1,755 sqft SUPER area. Prices of apartments in this project, vary between Rs. 88.9 L - 1.23 Cr. Vrushabadri Winter Park is a RERA- registered society and PRM/KA/RERA/1251/308/PR/070526/008631 is the RERA registration number"
  },
  {
    id: "sj-park-ville",
    title: "SJ Park Ville",
    subtitle: "4 BHK Villa in Whitefield, Bangalore",
    priceConfigs: [
      { label: "4 BHK Villa", price: "₹2.99 - 3.24 Cr" }
    ],
    nearby: ["Pratham International School", "Euro School", "Sigma Tech Park", "ITPL", "Tesco"],
    builder: "SJ Constructions",
    status: "New Launch · Completion in Dec, 2029",
    imageSrc: "/SJ_Park_Ville.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "SJ Park Ville brings 4 BHK Villa in Whitefield, one of the preferred locations in the city. Sizes of Villas vary in 2,955 - 2,985 sqft. Villas in SJ Park Ville are offered in the price range of Rs. 2.99 - 3.24 Cr. Villas in SJ Park Ville are New Launch",
    galleryImages: ['/SJ_Park_Ville.jpg'],
    aboutText: "SJ Park Ville brings 4 BHK Villa in Whitefield, one of the preferred locations in the city. Sizes of Villas vary in 2,955 - 2,985 sqft. Villas in SJ Park Ville are offered in the price range of Rs. 2.99 - 3.24 Cr. Villas in SJ Park Ville are New Launch"
  },
  {
    id: "concorde-eleve",
    title: "Concorde Eleve",
    subtitle: "3, 4 BHK Apartment in KR Puram, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.22 - 2.25 Cr" },
      { label: "4 BHK Apartment", price: "₹2.94 - 2.96 Cr" }
    ],
    nearby: ["James English School", "Geetha Hospital", "Garden City Uni", "Krishnarajapuram", "Kempegowda Airport"],
    builder: "Concorde",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Concorde_Eleve.jpg",
    imageCount: "1/11",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 3,4 BHK apartments in KR Puram are available for sale.Check out latest property options at Concorde Eleve housing society. Here units have different sizes, mostly in range of 1,934 - 2,570 sqft SUPER area. Prices of apartments in this project, vary between Rs. 2.22 - 2.96 Cr. This society is RERA approved and PRM/KA/RERA/1251/446/PR/210325/007608 is the RERA number",
    galleryImages: ['/Concorde_Eleve.jpg'],
    aboutText: "Spacious 3,4 BHK apartments in KR Puram are available for sale.Check out latest property options at Concorde Eleve housing society. Here units have different sizes, mostly in range of 1,934 - 2,570 sqft SUPER area. Prices of apartments in this project, vary between Rs. 2.22 - 2.96 Cr. This society is RERA approved and PRM/KA/RERA/1251/446/PR/210325/007608 is the RERA number"
  },
  {
    id: "classique-willowbell",
    title: "Classique Willowbell",
    subtitle: "2, 3, 4 BHK Apartment in Hennur Road, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.14 - 1.23 Cr"}, {"label": "3 BHK Apartment", "price": "₹1.48 - 1.79 Cr"}, {"label": "4 BHK Apartment", "price": "₹2.28 - 2.57 Cr"}],
    nearby: ["Riverstone International School", "United International Business School", "Kempegowda International Airport", "New Life Speciality Hospital", "Bhartiya Mall Of Bengaluru"],
    builder: "Allegro Mahabaleshwara Ventures LLP",
    status: "Under Construction · Completion in May, 2029",
    imageSrc: "/Classique_Willowbell.jpg",
    imageCount: "5/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3,4 BHK apartments in Hennur Road are available for sale.Check out latest property options at Classique Willowbell housing society. Apartments in this complex are available in price range of Rs. 1.14 - 2.57 Cr. Here units have different sizes, mostly in range of 1,214 - 2,745 sqft SUPER area. Classique Willowbell 's RERA registration number is PRM/KA/RERA/1251/446/PR/220526/008672",
    galleryImages: ['/Classique_Willowbell.jpg'],
    aboutText: "Spacious 2,3,4 BHK apartments in Hennur Road are available for sale.Check out latest property options at Classique Willowbell housing society. Apartments in this complex are available in price range of Rs. 1.14 - 2.57 Cr. Here units have different sizes, mostly in range of 1,214 - 2,745 sqft SUPER area. Classique Willowbell 's RERA registration number is PRM/KA/RERA/1251/446/PR/220526/008672"
  },
  {
    id: "havena-by-ksr",
    title: "Havena by KSR",
    subtitle: "2, 3 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹89.59 - 89.94 L"}, {"label": "3 BHK Apartment", "price": "₹96.59 L - 1.15 Cr"}],
    nearby: ["National Highway 44", "Life Care Multispecialty Hospital", "M. S. Engineering College", "Stonehill International School", "Prestige Tech Cloud"],
    builder: "KSR Builders and Developers",
    status: "New Launch · Completion in Dec, 2028",
    imageSrc: "/Havena_by_KSR.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 2,3 BHK apartments in Yelahanka, available for sale at Havena by KSR. This society is RERA approved and PRM/KA/RERA/1251/309/PR/230626/008747 is the RERA number. This society offers apartments in the price range of Rs. 89.59 L - 1.15 Cr. Here units have different sizes, mostly in range of 1,280 - 1,640 sqft SUPER area",
    galleryImages: ['/Havena_by_KSR.jpg'],
    aboutText: "Here are beautifully built 2,3 BHK apartments in Yelahanka, available for sale at Havena by KSR. This society is RERA approved and PRM/KA/RERA/1251/309/PR/230626/008747 is the RERA number. This society offers apartments in the price range of Rs. 89.59 L - 1.15 Cr. Here units have different sizes, mostly in range of 1,280 - 1,640 sqft SUPER area"
  },
  {
    id: "sumadhura-panorama",
    title: "Sumadhura Panorama",
    subtitle: "Land in Devanahalli, Bangalore",
    priceConfigs: [{"label": "Land", "price": "₹95.99 L - 2.4 Cr"}],
    nearby: ["National Highway 44", "Akash Super Speciality Hospital", "Akash International School", "Chanakya University", "Forum North Mall Bengaluru"],
    builder: "Sumadhura Group",
    status: "Under Construction · Completion in Dec, 2027",
    imageSrc: "/Sumadhura_Panorama.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Land in Devanahalli are now available for sale in Sumadhura Panorama. Land will be available for possession from Dec, 2027. Land prices in projectName vary in the range of Rs. 95.99 L - 2.4 Cr. Sizes of these property options are in the bracket of 1,200 - 3,001 sqft",
    galleryImages: ['/Sumadhura_Panorama.jpg'],
    aboutText: "Land in Devanahalli are now available for sale in Sumadhura Panorama. Land will be available for possession from Dec, 2027. Land prices in projectName vary in the range of Rs. 95.99 L - 2.4 Cr. Sizes of these property options are in the bracket of 1,200 - 3,001 sqft"
  },
  {
    id: "assetz-sora-and-saki",
    title: "Assetz Sora and Saki",
    subtitle: "2, 3, 4 BHK Apartment in Bagalur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.84 Cr" },
      { label: "3 BHK Apartment", price: "₹1.94 - 2.14 Cr" },
      { label: "4 BHK Apartment", price: "₹2.05 - 2.5 Cr" }
    ],
    nearby: ["BK Halli Highway", "CMR University", "Kempegowda International Airport", "Bhartiya Mall Of Bengaluru", "Taj Hotel Bangalore"],
    builder: "Assetz Property Group",
    status: "Under Construction · Completion from Sep, 2028 onwards",
    imageSrc: "/Assetz_Sora_and_Saki.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 2,3,4 BHK apartments in Bagalur, now available in Assetz Sora and Saki. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/060324/006692 registration number. Apartment prices in this housing society vary in the range of Rs. 1.84 - 2.5 Cr. Here units have different sizes, mostly in range of 1,537 - 2,168 sqft SUPER area",
    galleryImages: ['/Assetz_Sora_and_Saki.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3,4 BHK apartments in Bagalur, now available in Assetz Sora and Saki. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/060324/006692 registration number. Apartment prices in this housing society vary in the range of Rs. 1.84 - 2.5 Cr. Here units have different sizes, mostly in range of 1,537 - 2,168 sqft SUPER area"
  },
  {
    id: "tvs-emerald-altura",
    title: "TVS Emerald Altura",
    subtitle: "2, 3 BHK Apartment in Hennur Road, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.58 - 1.8 Cr"}, {"label": "3 BHK Apartment", "price": "₹2.23 - 3.12 Cr"}],
    nearby: ["Bagalur Cross Metro Station", "Yelahanka Railway Station", "Kempegowda International Airport", "Reva University", "Delhi Public School"],
    builder: "TVS Emerald",
    status: "New Launch · Completion in Mar, 2033",
    imageSrc: "/TVS_Emerald_Altura.jpg",
    imageCount: "1/11",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Hennur Road are available for sale.Check out latest property options at TVS Emerald Altura housing society. Apartments in this complex are available in price range of Rs. 1.58 - 3.12 Cr. Apartments in TVS Emerald Altura have SUPER area ranging between 1,103 - 2,133 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/040426/008572 registration number",
    galleryImages: ['/TVS_Emerald_Altura.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Hennur Road are available for sale.Check out latest property options at TVS Emerald Altura housing society. Apartments in this complex are available in price range of Rs. 1.58 - 3.12 Cr. Apartments in TVS Emerald Altura have SUPER area ranging between 1,103 - 2,133 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/040426/008572 registration number"
  },
  {
    id: "sattva-city",
    title: "Sattva City",
    subtitle: "2, 3, 4 BHK Apartment in Chikkajala, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.61 - 1.94 Cr"}, {"label": "3 BHK Apartment", "price": "₹2.22 - 2.75 Cr"}, {"label": "4 BHK Apartment", "price": "₹3.63 Cr"}],
    nearby: ["National Highway 44", "LVS Mall", "Doddajala Railway Station", "NRV Hospital", "Sri Venkateshwara College of Engineering"],
    builder: "Sattva Group",
    status: "New Launch · Completion in Feb, 2032",
    imageSrc: "/Sattva_City.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3,4 BHK apartments in Chikkajala are available for sale.Check out latest property options at Sattva City housing society. Sattva City has apartments in multiple configurations, in range of 1,316 - 2,960 sqft. Apartments in this complex are available in price range of Rs. 1.61 - 3.63 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/472/PR/270226/008494 registration number",
    galleryImages: ['/Sattva_City.jpg'],
    aboutText: "Spacious 2,3,4 BHK apartments in Chikkajala are available for sale.Check out latest property options at Sattva City housing society. Sattva City has apartments in multiple configurations, in range of 1,316 - 2,960 sqft. Apartments in this complex are available in price range of Rs. 1.61 - 3.63 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/472/PR/270226/008494 registration number"
  },
  {
    id: "godrej-aveline",
    title: "Godrej Aveline",
    subtitle: "2, 3, 4 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹2.29 - 2.89 Cr"}, {"label": "3 BHK Apartment", "price": "₹2.79 - 3.68 Cr"}, {"label": "4 BHK Apartment", "price": "₹4.36 - 4.46 Cr"}],
    nearby: ["Ryan International School", "REVA University", "Manipal Hospital Yelahanka", "The Galleria Mall", "Kempegowda International Airport"],
    builder: "Godrej Properties",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Godrej_Aveline.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 2,3,4 BHK apartments in Yelahanka available for sale in Godrej Aveline. This society offers apartments in the price range of Rs. 2.29 - 4.46 Cr. Godrej Aveline apartments are available in multiples sizes, ranging from 1,288 - 2,507 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/309/PR/020326/008501 is the RERA number",
    galleryImages: ['/Godrej_Aveline.jpg'],
    aboutText: "Finest 2,3,4 BHK apartments in Yelahanka available for sale in Godrej Aveline. This society offers apartments in the price range of Rs. 2.29 - 4.46 Cr. Godrej Aveline apartments are available in multiples sizes, ranging from 1,288 - 2,507 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/309/PR/020326/008501 is the RERA number"
  },
  {
    id: "bhartiya-garden-enclave",
    title: "Bhartiya Garden Enclave",
    subtitle: "1, 2, 3, 4 BHK Apartment in Thanisandra Main Road, Bangalore North",
    priceConfigs: [{"label": "1 BHK Apartment", "price": "₹82.91 L"}, {"label": "2 BHK Apartment", "price": "₹1.23 - 1.68 Cr"}, {"label": "3 BHK Apartment", "price": "₹2.12 - 2.62 Cr"}, {"label": "4 BHK Apartment", "price": "₹2.64 - 3.08 Cr"}],
    nearby: ["Delhi Public School", "KNS Institute of Technology", "Bhartiya Mall Of Bengaluru", "Prolife Multispeciality Hospital", "Kempegowda International Airport"],
    builder: "Bhartiya Urban",
    status: "New Launch · Completion from Mar, 2031 onwards",
    imageSrc: "/Bhartiya_Garden_Enclave.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Choose your dream home from the wide variety of 1,2,3,4 BHK apartments in Thanisandra Main Road, available for sale in Bhartiya Garden Enclave. Apartments in this complex are available in price range of Rs. 82.91 L - 3.08 Cr. Bhartiya Garden Enclave 's RERA registration number is PRM/KA/RERA/1251/309/PR/070526/008628. Bhartiya Garden Enclave apartments are available in multiples sizes, ranging from 786 - 2,506 sqft SUPER area",
    galleryImages: ['/Bhartiya_Garden_Enclave.jpg'],
    aboutText: "Choose your dream home from the wide variety of 1,2,3,4 BHK apartments in Thanisandra Main Road, available for sale in Bhartiya Garden Enclave. Apartments in this complex are available in price range of Rs. 82.91 L - 3.08 Cr. Bhartiya Garden Enclave 's RERA registration number is PRM/KA/RERA/1251/309/PR/070526/008628. Bhartiya Garden Enclave apartments are available in multiples sizes, ranging from 786 - 2,506 sqft SUPER area"
  },
  {
    id: "assetz-miru-and-miyo",
    title: "Assetz Miru and Miyo",
    subtitle: "3 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [{"label": "3 BHK Apartment", "price": "₹2.04 - 2.27 Cr"}],
    nearby: ["National Public School", "Sparsh Hospital Yelahanka", "RMZ Galleria Mall", "One8 Sports Arena", "National Highway 44"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Assetz_Miru_and_Miyo.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3 BHK apartments in Yelahanka, available for sale at Assetz Miru and Miyo. Prices of apartments in this project, vary between Rs. 2.04 - 2.27 Cr. This society is RERA approved and PRM/KA/RERA/1251/472/PR/050526/008621 is the RERA number. Apartments in Assetz Miru and Miyo have SUPER area ranging between 1,774 - 1,970 sqft",
    galleryImages: ['/Assetz_Miru_and_Miyo.jpg'],
    aboutText: "Here are beautifully built 3 BHK apartments in Yelahanka, available for sale at Assetz Miru and Miyo. Prices of apartments in this project, vary between Rs. 2.04 - 2.27 Cr. This society is RERA approved and PRM/KA/RERA/1251/472/PR/050526/008621 is the RERA number. Apartments in Assetz Miru and Miyo have SUPER area ranging between 1,774 - 1,970 sqft"
  },
  {
    id: "nandi-lake-view",
    title: "Nandi Lake View",
    subtitle: "Land in Nandi Hills, Chikkaballapur, Bangalore",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b959 L"}],
    nearby: [],
    builder: "Vision Value Properties",
    status: "Ready To Move · Since Mar, 2026",
    imageSrc: "/Nandi_Lake_View.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "SEEN"],
    description: "This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price rang...",
    galleryImages: ['/Nandi_Lake_View.jpg'],
    aboutText: "This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. Plot sizes here are roughly in range of 1,800 sqft. Land prices here are in tune of Rs. 59 L"
  },
  {
    id: "brigade-orchards-laurel-and-maple",
    title: "Brigade Orchards Laurel and Maple",
    subtitle: "1, 2, 3 BHK Apartment in Devanahalli, Bangalore",
    priceConfigs: [{"label": "1 BHK Apartment", "price": "\u20b958.09 - 90.08 L"}, {"label": "2 BHK Apartment", "price": "\u20b993.58 L - 1.1 Cr"}, {"label": "3 BHK Apartment", "price": "\u20b91.26 - 1.36 Cr"}],
    nearby: ["The Arcade at Brigade Orchards Mall", "Ramaiah Hospital", "Brigade Orchards Sports Arena", "The School For Global Minds", "National Highway 648"],
    builder: "Brigade Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Brigade_Orchards_Laurel_and_Maple.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Spacious 1,2,3 BHK apartments in Devanahalli are available for sale.Check out latest property options at Brigade Orchards Laurel and Maple housing soc...",
    galleryImages: ['/Brigade_Orchards_Laurel_and_Maple.jpg'],
    aboutText: "Spacious 1,2,3 BHK apartments in Devanahalli are available for sale.Check out latest property options at Brigade Orchards Laurel and Maple housing society. Apartments in Brigade Orchards Laurel and Maple have CARPET area ranging between 449 - 1,051 sqft. The housing society is RERA-registered with PRM/KA/RERA/1250/303/PR/040326/008505 registration number. Apartment prices in this housing society vary in the range of Rs. 58.09 L - 1.36 Cr"
  },
  {
    id: "poulomi-florique",
    title: "Poulomi Florique",
    subtitle: "2, 3 BHK Apartment in Kannur, Thanisandra Main Road",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "\u20b91.68 Cr"}, {"label": "3 BHK Apartment", "price": "\u20b91.89 - 2.91 Cr"}],
    nearby: ["The Leela", "Chaman Bhartiya School", "Bhartiya Centre Complex", "REVA University", "Elements Mall"],
    builder: "Poulomi Estates",
    status: "New Launch · Completion in Dec, 2032",
    imageSrc: "/Poulomi_Florique.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Poulomi Florique, one of the known housing societes in Bangalore North, brings classic yet modern 2,3 BHK apartments in Kannur. Apartments in this com...",
    galleryImages: ['/Poulomi_Florique.jpg'],
    aboutText: "Poulomi Florique, one of the known housing societes in Bangalore North, brings classic yet modern 2,3 BHK apartments in Kannur. Apartments in this complex are available in price range of Rs. 1.68 - 2.91 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/180326/008539 registration number. Apartments in Poulomi Florique have SUPER area ranging between 1,585 - 2,740 sqft"
  },
  {
    id: "concorde-sienna",
    title: "Concorde Sienna",
    subtitle: "2, 3 BHK Apartment in Hennur Road, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "\u20b91.26 Cr"}, {"label": "3 BHK Apartment", "price": "\u20b91.96 Cr"}],
    nearby: ["BM International School", "CMR University", "Bhartiya Mall of Bangalore", "The Leela Hotel", "National Highway 44"],
    builder: "Concorde",
    status: "New Launch · Completion in Jul, 2031",
    imageSrc: "/Concorde_Sienna.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Check out 2,3 BHK apartments in Hennur Road, now available for sale at Concorde Sienna. Concorde Sienna 's RERA registration number is PRM/KA/RERA/125...",
    galleryImages: ['/Concorde_Sienna.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Hennur Road, now available for sale at Concorde Sienna. Concorde Sienna 's RERA registration number is PRM/KA/RERA/1251/446/PR/220626/008740. This society offers apartments in the price range of Rs. 1.26 - 1.96 Cr. Here units have different sizes, mostly in range of 1,200 - 1,870 sqft SUPER area"
  },
  {
    id: "assetz-city-of-palms",
    title: "Assetz City of Palms",
    subtitle: "Land in IVC Road, Devanahalli",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b91.01 - 4.57 Cr"}],
    nearby: ["National Highway 648", "Vihaan Public School", "M. S. Engineering College", "Club Cabana Amusement Park", "Manipal Hospital Doddaballapur"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Feb, 2029",
    imageSrc: "/Assetz_City_of_Palms.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Now invest in Land in IVC Road, coming up at an affordable price in Assetz City of Palms. Park, Open Space and Well-Maintained Internal Roads are some...",
    galleryImages: ['/Assetz_City_of_Palms.jpg'],
    aboutText: "Now invest in Land in IVC Road, coming up at an affordable price in Assetz City of Palms. Park, Open Space and Well-Maintained Internal Roads are some of the top amenities available in this project. Plot sizes here are roughly in range of 1,117 - 5,074 sqft. Land will be offered for possession from Feb, 2029"
  },
  {
    id: "hariyana-riviera-glade",
    title: "Hariyana Riviera Glade",
    subtitle: "4 BHK Villa in Yelahanka, Bangalore",
    priceConfigs: [{"label": "4 BHK Apartment", "price": "\u20b96.39 - 7.23 Cr"}],
    nearby: ["Atmecs Technologies", "Manyata Tech Park", "Devanahalli Business Park", "Reva University", "CMR University"],
    builder: "Hariyana Group",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Hariyana_Riviera_Glade.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Hariyana Riviera Glade brings 4 BHK Villa in Yelahanka, one of the preferred locations in the city. These Villas are sized between 3,190 - 3,550 sqft....",
    galleryImages: ['/Hariyana_Riviera_Glade.jpg'],
    aboutText: "Hariyana Riviera Glade brings 4 BHK Villa in Yelahanka, one of the preferred locations in the city. These Villas are sized between 3,190 - 3,550 sqft. Prices of Villas in Hariyana Riviera Glade hover between Rs. 6.39 - 7.23 Cr. Swimming Pool, Gymnasium and Club House are some of the popular amenities offered here"
  },
  {
    id: "whispering-greens-by-earthern-projects",
    title: "Whispering Greens by Earthern Projects",
    subtitle: "Land in Rajankunte, Doddaballapur Road",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b972 L - 1.44 Cr"}],
    nearby: ["Presidency University", "Orchids the International School", "Chiguru Multispeciality Hospital", "Manipal Hospital Doddaballapur"],
    builder: "Earthern Projects",
    status: "New Launch · Completion in Jun, 2028",
    imageSrc: "/Whispering_Greens_by_Earthern_Projects.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Whispering Greens by Earthern Projects offers plots in Rajankunte , Bangalore North, for sale. Swimming Pool, Gymnasium and Club House are some of the...",
    galleryImages: ['/Whispering_Greens_by_Earthern_Projects.jpg'],
    aboutText: "Whispering Greens by Earthern Projects offers plots in Rajankunte , Bangalore North, for sale. Swimming Pool, Gymnasium and Club House are some of the top amenities available in this project. Land here are New Launch. Land size in Whispering Greens by Earthern Projects is in the range of 1,200 - 2,400 sqft"
  },
  {
    id: "windsor-hillside",
    title: "Windsor Hillside",
    subtitle: "Land in Doddaballapur Road, Bangalore",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b968.4 - 82.08 L"}],
    nearby: ["GITAM  University", "Bhagat Singh Stadium", "Mulberry Shades Hotel", "Dodballapur Railway Station", "National Highway 648"],
    builder: "Aashirya Land Developers",
    status: "Ready To Move · Since Jul, 2026",
    imageSrc: "/Windsor_Hillside.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Windsor Hillside offers plots in Doddaballapur Road , Bangalore North, for sale. Land prices in projectName vary in the range of Rs. 68.4 - 82.08 L. H...",
    galleryImages: ['/Windsor_Hillside.jpg'],
    aboutText: "Windsor Hillside offers plots in Doddaballapur Road , Bangalore North, for sale. Land prices in projectName vary in the range of Rs. 68.4 - 82.08 L. Homebuyers can enjoy amenities such as Children's Play Area, Landscape Garden and Park in this project. Sizes of these property options are in the bracket of 1,500 - 1,800 sqft"
  },
  {
    id: "prestige-gardenia-estate",
    title: "Prestige Gardenia Estate",
    subtitle: "Land in Devanahalli, Bangalore",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b91.35 - 3.6 Cr"}],
    nearby: ["Satellite Town Ring Road Highway", "Devanahalli Railway Station", "JW Marriott Prestige Golfshire Hotel", "Harrow Intl School", "Amity University"],
    builder: "Prestige Group",
    status: "New Launch · Completion in Apr, 2027",
    imageSrc: "/Prestige_Gardenia_Estate.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Now invest in Land in Devanahalli, coming up at an affordable price in Prestige Gardenia Estate. Residents will get some of the top amenities in this ...",
    galleryImages: ['/Prestige_Gardenia_Estate.jpg'],
    aboutText: "Now invest in Land in Devanahalli, coming up at an affordable price in Prestige Gardenia Estate. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Club House. The dimensions of Land in Prestige Gardenia Estate are in range of 1,499 - 3,999 sqft. Land prices in this project are around Rs. 1.35 - 3.6 Cr"
  },
  {
    id: "century-kindle",
    title: "Century Kindle",
    subtitle: "2, 3, 4 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "\u20b91.09 - 1.21 Cr"}, {"label": "3 BHK Apartment", "price": "\u20b91.41 - 1.7 Cr"}, {"label": "4 BHK Apartment", "price": "\u20b92.37 - 2.83 Cr"}],
    nearby: ["Narayana eTechno School", "Nagarjuna Pre University College", "The Galleria Mall", "Omega Multispeciality Hospital", "Kempegowda International Airport"],
    builder: "Century Real Estate Holdings",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Century_Kindle.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Yelahanka, available for sale in Century Kindle. The housing society is RERA-r...",
    galleryImages: ['/Century_Kindle.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Yelahanka, available for sale in Century Kindle. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/200326/008542 registration number. This society offers apartments in the price range of Rs. 1.09 - 2.83 Cr. Apartments in Century Kindle have CARPET area ranging between 723 - 1,873 sqft"
  },
  {
    id: "vaishnavi-life",
    title: "Vaishnavi Life",
    subtitle: "Land in Bettenahalli, Near Yelahanka, Bangalore",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b91.03 - 3.88 Cr"}],
    nearby: ["To The Tee Golf Academy", "Vidyashilp University", "Windflower Prakruthi Resort & Spa", "Stonehill International School", "Padukone Dravid Centre for Sports"],
    builder: "Vaishnavi Group Bangalore",
    status: "Under Construction · Completion from Mar, 2025 onwards",
    imageSrc: "/Vaishnavi_Life.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Vaishnavi Life offers plots in Bettenahalli , Bangalore North, for sale. Sizes of these property options are in the bracket of 1,150 - 4,306 sqft. Lan...",
    galleryImages: ['/Vaishnavi_Life.jpg'],
    aboutText: "Vaishnavi Life offers plots in Bettenahalli , Bangalore North, for sale. Sizes of these property options are in the bracket of 1,150 - 4,306 sqft. Land prices in projectName vary in the range of Rs. 1.03 - 3.88 Cr. Swimming Pool, Gymnasium and Club House are some of the top amenities available in this project"
  },
  {
    id: "birla-trimaya-phase-4",
    title: "Birla Trimaya Phase 4",
    subtitle: "2, 3, 4 BHK Apartment in Devanahalli, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "\u20b91.57 - 1.61 Cr"}, {"label": "3 BHK Apartment", "price": "\u20b92.08 - 2.8 Cr"}, {"label": "4 BHK Apartment", "price": "\u20b94.12 - 6 Cr"}],
    nearby: ["National Highway 44", "Kempegowda International Airport", "Kesar International School", "Prestige Tech Cloud", "Forum Mall"],
    builder: "Birla Estates",
    status: "New Launch · Completion in Aug, 2030",
    imageSrc: "/Birla_Trimaya_Phase_4.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Check out 2,3,4 BHK apartments in Devanahalli, now available for sale at Birla Trimaya Phase 4. Here units have different sizes, mostly in range of 78...",
    galleryImages: ['/Birla_Trimaya_Phase_4.jpg'],
    aboutText: "Check out 2,3,4 BHK apartments in Devanahalli, now available for sale at Birla Trimaya Phase 4. Here units have different sizes, mostly in range of 789 - 3,023 sqft CARPET area. Birla Trimaya Phase 4 's RERA registration number is PRM/KA/RERA/1250/303/PR/300125/007458. Apartment prices in this housing society vary in the range of Rs. 1.57 - 6 Cr"
  },
  {
    id: "nischitha-jai-dhama",
    title: "Nischitha Jai Dhama",
    subtitle: "Land in Madure, Bangalore",
    priceConfigs: [{"label": "None Apartment", "price": "\u20b943.66 L - 1.33 Cr"}],
    nearby: ["Ayurvedic Hospital", "Rai Technology University", "Shreyas Yoga Retreat Hotel", "Bhairanayakanahalli Train Station", "MEI International School"],
    builder: "Nischitha Properties",
    status: "Under Construction · Completion in Jun, 2026",
    imageSrc: "/Nischitha_Jai_Dhama.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "SEEN"],
    description: "Looking for Land in Madure? Explore great investment options in Nischitha Jai Dhama. Land in Nischitha Jai Dhama are priced approximately at Rs. 43.66...",
    galleryImages: ['/Nischitha_Jai_Dhama.jpg'],
    aboutText: "Looking for Land in Madure? Explore great investment options in Nischitha Jai Dhama. Land in Nischitha Jai Dhama are priced approximately at Rs. 43.66 L - 1.33 Cr. Land will be offered for possession from Jun, 2026. This project has some top amenities, which include Children's Play Area, Landscape Garden and Jogging Track among others"
  },
  {
    id: "united-suvarna-homes",
    title: "United Suvarna Homes",
    subtitle: "3 BHK Apartment in Soukya Road, Whitefield, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.15 - 1.36 Cr" }
    ],
    nearby: ["CMR National Public School", "CMR University", "Zion Hospitals", "Kempegowda Int Airport", "Banaswadi Rlwy stn"],
    builder: "United Suvarna Homes",
    status: "Under Construction · Completion in Oct, 2028",
    imageSrc: "/United_Suvarna_Homes.jpg",
    imageCount: "2/12",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Choose your dream home from the wide variety of 3 BHK apartments in Soukya Road, available for sale in United Suvarna Homes. Prices of apartments in this project, vary between Rs. 1.15 - 1.36 Cr. United Suvarna Homes is a RERA- registered society and PRM/KA/RERA/1250/304/PR/161025/008176 is the RERA registration number. United Suvarna Homes apartments are available in multiples sizes, ranging from 1,645 - 1,948 sqft SUPER area",
    galleryImages: ['/United_Suvarna_Homes.jpg'],
    aboutText: "Choose your dream home from the wide variety of 3 BHK apartments in Soukya Road, available for sale in United Suvarna Homes. Prices of apartments in this project, vary between Rs. 1.15 - 1.36 Cr. United Suvarna Homes is a RERA- registered society and PRM/KA/RERA/1250/304/PR/161025/008176 is the RERA registration number. United Suvarna Homes apartments are available in multiples sizes, ranging from 1,645 - 1,948 sqft SUPER area"
  },
  {
    id: "anahata",
    title: "Anahata",
    subtitle: "2, 3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹96.6 L - 1.02 Cr" },
      { label: "3 BHK Apartment", price: "₹1.23 - 1.44 Cr" }
    ],
    nearby: ["Bangalore International Academy", "Sri Narayana Hospital", "MVJ College of Engineering", "Hoodi Halt Station", "Kempegowda International Airport"],
    builder: "Ishtika Vibranium",
    status: "New Launch · Completion in Mar, 2029",
    imageSrc: "/Anahata.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Whitefield, now available for sale at Anahata. Prices of apartments in this project, vary between Rs. 96.6 L - 1.44 Cr. Anahata is a RERA- registered society and PRM/KA/RERA/1250/304/PR/290425/007702 is the RERA registration number. Anahata apartments are available in multiples sizes, ranging from 1,178 - 1,750 sqft SUPER area",
    galleryImages: ['/Anahata.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Whitefield, now available for sale at Anahata. Prices of apartments in this project, vary between Rs. 96.6 L - 1.44 Cr. Anahata is a RERA- registered society and PRM/KA/RERA/1250/304/PR/290425/007702 is the RERA registration number. Anahata apartments are available in multiples sizes, ranging from 1,178 - 1,750 sqft SUPER area"
  },
  {
    id: "inspira-winds-of-life",
    title: "Inspira Winds of Life",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.47 - 2.14 Cr" }
    ],
    nearby: ["Azim Premji University", "Town Hospital Sarjapura", "Clover Greens Golf Course", "The International School Bangalore", "Karmelaram Station"],
    builder: "Inspira Builders Bangalore",
    status: "Under Construction · Completion in Nov, 2028",
    imageSrc: "/Inspira_Winds_of_Life.jpg",
    imageCount: "1/10",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 3 BHK apartments in Sarjapur Road, available for sale in Inspira Winds of Life. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/170625/007842 registration number. Apartments in this complex are available in price range of Rs. 1.47 - 2.14 Cr. Apartments in Inspira Winds of Life have SUPER area ranging between 1,753 - 2,552 sqft",
    galleryImages: ['/Inspira_Winds_of_Life.jpg'],
    aboutText: "Choose your dream home from the wide variety of 3 BHK apartments in Sarjapur Road, available for sale in Inspira Winds of Life. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/170625/007842 registration number. Apartments in this complex are available in price range of Rs. 1.47 - 2.14 Cr. Apartments in Inspira Winds of Life have SUPER area ranging between 1,753 - 2,552 sqft"
  },
  {
    id: "assetz-melodies-of-life-apartments",
    title: "Assetz Melodies of Life Apartments",
    subtitle: "3 BHK Apartment in Hosa Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.38 - 2.41 Cr" }
    ],
    nearby: ["Notre Dame Academy", "PES University Electronic City", "Manipal Hospital Sarjapur Road", "PNR Felicity Mall", "Kempegowda International Airport"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Nov, 2030",
    imageSrc: "/Assetz_Melodies_of_Life_Apartments.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 3 BHK apartments in Hosa Road, now available in Assetz Melodies of Life Apartments. Assetz Melodies of Life Apartments has apartments in multiple configurations, in range of 1,827 - 1,853 sqft. This society offers apartments in the price range of Rs. 2.38 - 2.41 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/061225/008321 registration number",
    galleryImages: ['/Assetz_Melodies_of_Life_Apartments.jpg'],
    aboutText: "Looking for your dream home? Explore 3 BHK apartments in Hosa Road, now available in Assetz Melodies of Life Apartments. Assetz Melodies of Life Apartments has apartments in multiple configurations, in range of 1,827 - 1,853 sqft. This society offers apartments in the price range of Rs. 2.38 - 2.41 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/061225/008321 registration number"
  },
  {
    id: "binary-etania",
    title: "Binary Etania",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.2 - 1.21 Cr" }
    ],
    nearby: ["Azim Premji University", "National Highway 648", "Spandana Super Speciality Hospital", "Forum The Prestige City", "Clover Greens Golf Course"],
    builder: "Binary Ventures",
    status: "New Launch · Completion in Aug, 2027",
    imageSrc: "/Binary_Etania.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Binary Etania society now offers elegantly built 3 BHK apartments in Sarjapur Road. Binary Etania is a RERA- registered society and PRM/KA/RERA/1251/308/PR/060825/007982 is the RERA registration number. Apartments in Binary Etania have SUPER area ranging between 1,639 - 1,652 sqft. Prices of apartments in this project, vary between Rs. 1.2 - 1.21 Cr",
    galleryImages: ['/Binary_Etania.jpg'],
    aboutText: "Binary Etania society now offers elegantly built 3 BHK apartments in Sarjapur Road. Binary Etania is a RERA- registered society and PRM/KA/RERA/1251/308/PR/060825/007982 is the RERA registration number. Apartments in Binary Etania have SUPER area ranging between 1,639 - 1,652 sqft. Prices of apartments in this project, vary between Rs. 1.2 - 1.21 Cr"
  },
  {
    id: "dwarakamai-zenith-heights",
    title: "Dwarakamai Zenith Heights",
    subtitle: "2, 3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.37 - 1.41 Cr" },
      { label: "3 BHK Apartment", price: "₹1.69 - 1.88 Cr" }
    ],
    nearby: ["MVJ College of Engineering", "Oakwood Residence Hotel", "Nexus Whitefield Mall", "Hopefarm Channasandra Metro Station", "National Highway 648"],
    builder: "Dwarakamai Builders",
    status: "New Launch · Completion in Dec, 2028",
    imageSrc: "/Dwarakamai_Zenith_Heights.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Looking for your dream home? Explore 2,3 BHK apartments in Whitefield, now available in Dwarakamai Zenith Heights. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/230626/008748 registration number. Apartments in this complex are available in price range of Rs. 1.37 - 1.88 Cr. Dwarakamai Zenith Heights has apartments in multiple configurations, in range of 1,225 - 1,690 sqft",
    galleryImages: ['/Dwarakamai_Zenith_Heights.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3 BHK apartments in Whitefield, now available in Dwarakamai Zenith Heights. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/230626/008748 registration number. Apartments in this complex are available in price range of Rs. 1.37 - 1.88 Cr. Dwarakamai Zenith Heights has apartments in multiple configurations, in range of 1,225 - 1,690 sqft"
  },
  {
    id: "melange-one",
    title: "Melange One",
    subtitle: "3, 4 BHK Apartment in Rajarajeshwari Nagar, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹3.39 - 3.41 Cr" },
      { label: "4 BHK Apartment", price: "₹4.89 - 5.08 Cr" }
    ],
    nearby: [],
    builder: "Vaishnodevi Group of Companies",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Melange_One.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 3,4 BHK apartments in Rajarajeshwari Nagar are available for sale.Check out latest property options at Melange One housing society. Apartments in Melange One have SUPER area ranging between 2,387 - 3,574 sqft. This society offers apartments in the price range of Rs. 3.39 - 5.08 Cr. Melange One is a RERA- registered society and PRM/KA/RERA/1251/310/PR/230126/008425 is the RERA registration number",
    galleryImages: ['/Melange_One.jpg'],
    aboutText: "Spacious 3,4 BHK apartments in Rajarajeshwari Nagar are available for sale.Check out latest property options at Melange One housing society. Apartments in Melange One have SUPER area ranging between 2,387 - 3,574 sqft. This society offers apartments in the price range of Rs. 3.39 - 5.08 Cr. Melange One is a RERA- registered society and PRM/KA/RERA/1251/310/PR/230126/008425 is the RERA registration number"
  },
  {
    id: "legend-lemon-tree",
    title: "Legend Lemon Tree",
    subtitle: "2, 3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.56 - 1.62 Cr" },
      { label: "3 BHK Apartment", price: "₹1.76 - 2.17 Cr" }
    ],
    nearby: ["Channasandra Metro Station"],
    builder: "Legend Properties",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Legend_Lemon_Tree.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 2,3 BHK apartments in Whitefield available for sale in Legend Lemon Tree. Prices of apartments in this project, vary between Rs. 1.56 - 2.17 Cr. Apartments in Legend Lemon Tree have SUPER area ranging between 1,415 - 1,975 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/290526/008691 is the RERA number",
    galleryImages: ['/Legend_Lemon_Tree.jpg'],
    aboutText: "Finest 2,3 BHK apartments in Whitefield available for sale in Legend Lemon Tree. Prices of apartments in this project, vary between Rs. 1.56 - 2.17 Cr. Apartments in Legend Lemon Tree have SUPER area ranging between 1,415 - 1,975 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/290526/008691 is the RERA number"
  },
  {
    id: "assetz-mizumi-reserve",
    title: "Assetz Mizumi Reserve",
    subtitle: "2, 3, 4 BHK Apartment in HSR Layout, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.91 Cr" },
      { label: "3 BHK Apartment", price: "₹2.47 - 2.82 Cr" },
      { label: "4 BHK Apartment", price: "₹3.22 Cr" }
    ],
    nearby: ["Vibgyor High School", "Manipal Hospital Sarjapur Road", "PNR Felicity Mall", "Dayananda Sagar University", "Kempegowda International Airport"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Assetz_Mizumi_Reserve.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 2,3,4 BHK apartments in HSR Layout, now available in Assetz Mizumi Reserve. This society offers apartments in the price range of Rs. 1.91 - 3.22 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/040226/008450 registration number. Here units have different sizes, mostly in range of 1,470 - 2,476 sqft SUPER area",
    galleryImages: ['/Assetz_Mizumi_Reserve.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3,4 BHK apartments in HSR Layout, now available in Assetz Mizumi Reserve. This society offers apartments in the price range of Rs. 1.91 - 3.22 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/040226/008450 registration number. Here units have different sizes, mostly in range of 1,470 - 2,476 sqft SUPER area"
  },
  {
    id: "lodha-haven",
    title: "Lodha Haven",
    subtitle: "3, 4 BHK Apartment in Hosa Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.9 Cr" },
      { label: "4 BHK Apartment", price: "₹4.69 Cr" }
    ],
    nearby: ["Cambridge International School", "PES University", "Narayana Multi-Speciality Hospital", "Outer Ring Road", "Reliance Centro Mall"],
    builder: "Lodha",
    status: "New Launch · Completion in Jun, 2030",
    imageSrc: "/Lodha_Haven.jpg",
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 3,4 BHK apartments in Hosa Road are available for sale.Check out latest property options at Lodha Haven housing society. This society offers apartments in the price range of Rs. 2.9 - 4.69 Cr. Lodha Haven apartments are available in multiples sizes, ranging from 1,352 - 2,225 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/308/PR/280525/007785 is the RERA number",
    galleryImages: ['/Lodha_Haven.jpg'],
    aboutText: "Spacious 3,4 BHK apartments in Hosa Road are available for sale.Check out latest property options at Lodha Haven housing society. This society offers apartments in the price range of Rs. 2.9 - 4.69 Cr. Lodha Haven apartments are available in multiples sizes, ranging from 1,352 - 2,225 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/308/PR/280525/007785 is the RERA number"
  },
  {
    id: "suraksha-whispering-waves",
    title: "Suraksha Whispering Waves",
    subtitle: "2, 3, 4 BHK Apartment in Begur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.27 Cr" },
      { label: "3 BHK Apartment", price: "₹1.51 - 1.74 Cr" },
      { label: "4 BHK Apartment", price: "₹1.9 Cr" }
    ],
    nearby: ["Orchids International School", "Christ University", "Ekana Multi Specialty Hospitals", "Royal Meenakshi Mall", "Beratena Agrahara Metro Station"],
    builder: "Suraksha Group",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Suraksha_Whispering_Waves.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3,4 BHK apartments in Begur, are now available in Suraksha Whispering Waves housing project. Suraksha Whispering Waves has apartments in multiple configurations, in range of 1,348 - 2,016 sqft. Apartment prices in this housing society vary in the range of Rs. 1.27 - 1.9 Cr. This society is RERA approved and PRM/KA/RERA/1251/310/PR/270326/008555 is the RERA number",
    galleryImages: ['/Suraksha_Whispering_Waves.jpg'],
    aboutText: "Beautiful 2,3,4 BHK apartments in Begur, are now available in Suraksha Whispering Waves housing project. Suraksha Whispering Waves has apartments in multiple configurations, in range of 1,348 - 2,016 sqft. Apartment prices in this housing society vary in the range of Rs. 1.27 - 1.9 Cr. This society is RERA approved and PRM/KA/RERA/1251/310/PR/270326/008555 is the RERA number"
  },
  {
    id: "natura-earth-villas",
    title: "Natura Earth Villas",
    subtitle: "3, 4 BHK Villa in Sarjapura Attibele Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Villa", price: "₹1.97 - 2 Cr" },
      { label: "4 BHK Villa", price: "₹2.25 - 2.26 Cr" }
    ],
    nearby: ["National Highway 948A", "Gurukula Public School", "Happys Hotel Bangalore", "Azim Premji University", "Town Hospital Sarjapura"],
    builder: "Natura Avenue Projects",
    status: "New Launch · Completion in Dec, 2026",
    imageSrc: "/Natura_Earth_Villas.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "3D"],
    description: "Spacious and elegant 3,4 BHK Villa are for sale in Natura Earth Villas, Sarjapura Attibele Road. Villas in Natura Earth Villas are offered in the price range of Rs. 1.97 - 2.26 Cr. These Villas are sized between 2,186 - 2,507 sqft. Villas in Natura Earth Villas are New Launch",
    galleryImages: ['/Natura_Earth_Villas.jpg'],
    aboutText: "Spacious and elegant 3,4 BHK Villa are for sale in Natura Earth Villas, Sarjapura Attibele Road. Villas in Natura Earth Villas are offered in the price range of Rs. 1.97 - 2.26 Cr. These Villas are sized between 2,186 - 2,507 sqft. Villas in Natura Earth Villas are New Launch"
  },
  {
    id: "psr-vanasree",
    title: "PSR Vanasree",
    subtitle: "2, 3 BHK Apartment in Kodathi, Near Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.06 - 1.18 Cr" },
      { label: "3 BHK Apartment", price: "₹1.29 - 1.44 Cr" }
    ],
    nearby: ["Primus Public School", "Belenus Champion Hospital", "Bangalore Group of Institutions", "Carmelaram Station", "Kempegowda International Airport"],
    builder: "PSR Builders",
    status: "Ready To Move · Since Mar, 2026",
    imageSrc: "/PSR_Vanasree.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 2,3 BHK apartments in Kodathi, now available in PSR Vanasree. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/220923/006280 registration number. Apartments in PSR Vanasree have SUPER area ranging between 1,155 - 1,570 sqft. Prices of apartments in this project, vary between Rs. 1.06 - 1.44 Cr",
    galleryImages: ['/PSR_Vanasree.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3 BHK apartments in Kodathi, now available in PSR Vanasree. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/220923/006280 registration number. Apartments in PSR Vanasree have SUPER area ranging between 1,155 - 1,570 sqft. Prices of apartments in this project, vary between Rs. 1.06 - 1.44 Cr"
  },
  {
    id: "brigade-lakecrest",
    title: "Brigade Lakecrest",
    subtitle: "2, 3 BHK Apartment in Battarahalli, Near KR Puram, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.53 - 2.08 Cr" },
      { label: "3 BHK Apartment", price: "₹1.99 - 2.89 Cr" }
    ],
    nearby: ["Sathya Sai Hospital", "Bengaluru-Tirupati Highway"],
    builder: "Brigade Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Brigade_Lakecrest.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2,3 BHK apartments in Battarahalli, available for sale in Brigade Lakecrest. Brigade Lakecrest has apartments in multiple configurations, in range of 1,315 - 2,179 sqft. Brigade Lakecrest 's RERA registration number is PRM/KA/RERA/1251/446/PR/240625/007866. Apartments in this complex are available in price range of Rs. 1.53 - 2.89 Cr",
    galleryImages: ['/Brigade_Lakecrest.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3 BHK apartments in Battarahalli, available for sale in Brigade Lakecrest. Brigade Lakecrest has apartments in multiple configurations, in range of 1,315 - 2,179 sqft. Brigade Lakecrest 's RERA registration number is PRM/KA/RERA/1251/446/PR/240625/007866. Apartments in this complex are available in price range of Rs. 1.53 - 2.89 Cr"
  },
  {
    id: "neon",
    title: "Neon",
    subtitle: "2, 3 BHK Apartment in Sarjapur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹88.15 L" },
      { label: "3 BHK Apartment", price: "₹1.1 - 1.23 Cr" }
    ],
    nearby: ["Azim Premji University", "Greens Golf Course", "The International School", "Karmelaram, Railway Station", "Nexus Whitefield Mall"],
    builder: "Modern Spaaces",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Neon.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Neon, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Sarjapur. This society offers apartments in the price range of Rs. 88.15 L - 1.23 Cr. Here units have different sizes, mostly in range of 1,230 - 1,740 sqft SUPER area. Neon is a RERA- registered society and PRM/KA/RERA/1251/308/PR/050725/007897 is the RERA registration number",
    galleryImages: ['/Neon.jpg'],
    aboutText: "Neon, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Sarjapur. This society offers apartments in the price range of Rs. 88.15 L - 1.23 Cr. Here units have different sizes, mostly in range of 1,230 - 1,740 sqft SUPER area. Neon is a RERA- registered society and PRM/KA/RERA/1251/308/PR/050725/007897 is the RERA registration number"
  },
  {
    id: "mana-skandas-the-right-life",
    title: "Mana Skandas The Right Life",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.3 - 1.44 Cr" },
      { label: "3 BHK Apartment", price: "₹1.73 - 2.03 Cr" },
      { label: "4 BHK Apartment", price: "₹2.2 - 2.34 Cr" }
    ],
    nearby: ["Inventure Academy", "St Jeromes PU and Degree College", "Swastik Hospitals", "Karmelaram Railway Station", "Brookefield Mall"],
    builder: "Neo Build Ventures",
    status: "Under Construction · Completion from Jun, 2030 onwards",
    imageSrc: "/Mana_Skandas_The_Right_Life.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "1 OFFER"],
    description: "Looking for your dream home? Explore 2,3,4 BHK apartments in Sarjapur Road, now available in Mana Skandas The Right Life. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/280324/006766 registration number. Mana Skandas The Right Life has apartments in multiple configurations, in range of 1,249 - 2,244 sqft. This society offers apartments in the price range of Rs. 1.3 - 2.34 Cr",
    galleryImages: ['/Mana_Skandas_The_Right_Life.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3,4 BHK apartments in Sarjapur Road, now available in Mana Skandas The Right Life. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/280324/006766 registration number. Mana Skandas The Right Life has apartments in multiple configurations, in range of 1,249 - 2,244 sqft. This society offers apartments in the price range of Rs. 1.3 - 2.34 Cr"
  },
  {
    id: "onyx",
    title: "Onyx",
    subtitle: "2, 3 BHK Apartment in Mugalur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.16 Cr" },
      { label: "3 BHK Apartment", price: "₹1.36 - 1.43 Cr" }
    ],
    nearby: ["Champion International School", "Azim Premji University", "Town Hospital Sarjapura", "Karmelaram Railway Station", "Kempegowda International Airport"],
    builder: "Modern Spaaces",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Onyx.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Mugalur are available for sale.Check out latest property options at Onyx housing society. This society offers apartments in the price range of Rs. 1.16 - 1.43 Cr. This society is RERA approved and PRM/KA/RERA/1251/308/PR/130825/007993 is the RERA number. Onyx has apartments in multiple configurations, in range of 1,634 - 2,030 sqft",
    galleryImages: ['/Onyx.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Mugalur are available for sale.Check out latest property options at Onyx housing society. This society offers apartments in the price range of Rs. 1.16 - 1.43 Cr. This society is RERA approved and PRM/KA/RERA/1251/308/PR/130825/007993 is the RERA number. Onyx has apartments in multiple configurations, in range of 1,634 - 2,030 sqft"
  },
  {
    id: "sapthagiri-fortune-city",
    title: "Sapthagiri Fortune City",
    subtitle: "Land in Nelamangala, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹33.6 - 42 L" }
    ],
    nearby: ["NICE Road", "Kunigal Road", "Peenya Indl. Area", "Dabaspet Indl. Area", "Proposed Metro Station"],
    builder: "Sapthagiri Promoters",
    status: "Ready To Move · Since Apr, 2026",
    imageSrc: "/Sapthagiri_Fortune_City.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "Res Land/plots Looking for Land in Nelamangala for sale in a gated society by Sapthagiri Fortune City. Sapthagiri Fortune City is Ready To Move. Homebuyers can enjoy amenities such as Children's Play Area, Landscape Garden and Senior Citizen Sitout in this project. The dimensions of Land in Sapthagiri Fortune City are in range of 1,200 - 1,500 sqft",
    galleryImages: ['/Sapthagiri_Fortune_City.jpg'],
    aboutText: "Res Land/plots Looking for Land in Nelamangala for sale in a gated society by Sapthagiri Fortune City. Sapthagiri Fortune City is Ready To Move. Homebuyers can enjoy amenities such as Children's Play Area, Landscape Garden and Senior Citizen Sitout in this project. The dimensions of Land in Sapthagiri Fortune City are in range of 1,200 - 1,500 sqft"
  },
  {
    id: "assetz-trees-and-tandem",
    title: "Assetz Trees and Tandem",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.02 - 2.35 Cr" }
    ],
    nearby: ["GIG International School", "Discovate studios Amsuement Park", "Belenus Champion Hospital", "RGA Techpark", "M5 Ecity Mall"],
    builder: "Assetz Property Group",
    status: "Under Construction · Completion from Aug, 2029 onwards",
    imageSrc: "/Assetz_Trees_and_Tandem.jpg",
    imageCount: "1/11",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 3 BHK apartments in Sarjapur Road, now available for sale at Assetz Trees and Tandem. This society offers apartments in the price range of Rs. 2.02 - 2.35 Cr. Apartments in Assetz Trees and Tandem have SUPER area ranging between 1,885 - 2,142 sqft. Assetz Trees and Tandem 's RERA registration number is PRM/KA/RERA/1251/308/PR/280325/007636",
    galleryImages: ['/Assetz_Trees_and_Tandem.jpg'],
    aboutText: "Check out 3 BHK apartments in Sarjapur Road, now available for sale at Assetz Trees and Tandem. This society offers apartments in the price range of Rs. 2.02 - 2.35 Cr. Apartments in Assetz Trees and Tandem have SUPER area ranging between 1,885 - 2,142 sqft. Assetz Trees and Tandem 's RERA registration number is PRM/KA/RERA/1251/308/PR/280325/007636"
  },
  {
    id: "sobha-one-world",
    title: "Sobha One World",
    subtitle: "1, 2, 3, 4 BHK Apartment in Hoskote, Bangalore",
    priceConfigs: [
      { label: "1 BHK Apartment", price: "₹1.1 Cr" },
      { label: "2 BHK Apartment", price: "₹1.61 - 1.8 Cr" },
      { label: "3 BHK Apartment", price: "₹2.29 - 2.84 Cr" },
      { label: "4 BHK Apartment", price: "₹3.2 - 3.73 Cr" }
    ],
    nearby: ["Vibgyor High School Kadugodi", "MVJ College of Engineering", "MVJ Hospital", "Orion Uptown Mall", "Kempegowda International Airport"],
    builder: "Sobha",
    status: "New Launch · Completion from Aug, 2032 onwards",
    imageSrc: "/Sobha_One_World.jpg",
    imageCount: "1/12",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 1,2,3,4 BHK apartments in Hoskote, now available for sale at Sobha One World. Sobha One World apartments are available in multiples sizes, ranging from 734 - 2,416 sqft SUPER area. Prices of apartments in this project, vary between Rs. 1.1 - 3.73 Cr. The housing society is RERA-registered with PRM/KA/RERA/1250/304/PR/080526/008639 registration number",
    galleryImages: ['/Sobha_One_World.jpg'],
    aboutText: "Check out 1,2,3,4 BHK apartments in Hoskote, now available for sale at Sobha One World. Sobha One World apartments are available in multiples sizes, ranging from 734 - 2,416 sqft SUPER area. Prices of apartments in this project, vary between Rs. 1.1 - 3.73 Cr. The housing society is RERA-registered with PRM/KA/RERA/1250/304/PR/080526/008639 registration number"
  },
  {
    id: "godrej-regent-park",
    title: "Godrej Regent Park",
    subtitle: "2, 3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.36 - 1.37 Cr" },
      { label: "3 BHK Apartment", price: "₹1.75 - 2.05 Cr" }
    ],
    nearby: [],
    builder: "Godrej Properties",
    status: "New Launch · Completion in Jul, 2031",
    imageSrc: "/Godrej_Regent_Park.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Sarjapur Road, now available for sale at Godrej Regent Park. Prices of apartments in this project, vary between Rs. 1.36 - 2.05 Cr. Godrej Regent Park apartments are available in multiples sizes, ranging from 1,240 - 1,868 sqft SUPER area. Godrej Regent Park is a RERA- registered society and PRM/KA/RERA/1251/308/PR/150726/008810 is the RERA registration number",
    galleryImages: ['/Godrej_Regent_Park.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Sarjapur Road, now available for sale at Godrej Regent Park. Prices of apartments in this project, vary between Rs. 1.36 - 2.05 Cr. Godrej Regent Park apartments are available in multiples sizes, ranging from 1,240 - 1,868 sqft SUPER area. Godrej Regent Park is a RERA- registered society and PRM/KA/RERA/1251/308/PR/150726/008810 is the RERA registration number"
  },
  {
    id: "myhna-vistara",
    title: "Myhna Vistara",
    subtitle: "3, 4 BHK Apartment in Gunjur, Near Varthur, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.57 - 1.98 Cr" },
      { label: "4 BHK Apartment", price: "₹2.57 - 2.67 Cr" }
    ],
    nearby: ["Krupanidhi school of management", "VIBGYOR Rise School", "Manipal Hospital Varthur Road", "Nexus Whitefield", "Carmelaram Railway Station"],
    builder: "Myhna Properties",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Myhna_Vistara.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 3,4 BHK apartments in Gunjur available for sale in Myhna Vistara. Myhna Vistara has apartments in multiple configurations, in range of 1,670 - 2,485 sqft. Myhna Vistara 's RERA registration number is PRM/KA/RERA/1251/446/PR/040226/008447. Prices of apartments in this project, vary between Rs. 1.57 - 2.67 Cr",
    galleryImages: ['/Myhna_Vistara.jpg'],
    aboutText: "Finest 3,4 BHK apartments in Gunjur available for sale in Myhna Vistara. Myhna Vistara has apartments in multiple configurations, in range of 1,670 - 2,485 sqft. Myhna Vistara 's RERA registration number is PRM/KA/RERA/1251/446/PR/040226/008447. Prices of apartments in this project, vary between Rs. 1.57 - 2.67 Cr"
  },
  {
    id: "endeavour-evara",
    title: "Endeavour Evara",
    subtitle: "2, 3 BHK Apartment in Electronics City Phase 1, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹60.52 - 67.19 L" },
      { label: "3 BHK Apartment", price: "₹71.81 - 85.66 L" }
    ],
    nearby: ["Redbridge International Academy", "Fortis Hospital", "PES University", "Kempegowda International Airport", "M5 Ecity Mall"],
    builder: "Endeavour Group",
    status: "Under Construction · Completion in Jul, 2026",
    imageSrc: "/Endeavour_Evara.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2,3 BHK apartments in Electronics City Phase 1, available for sale in Endeavour Evara. Apartment prices in this housing society vary in the range of Rs. 60.52 - 85.66 L. Endeavour Evara has apartments in multiple configurations, in range of 1,062 - 1,503 sqft. The apartments here are Under Construction",
    galleryImages: ['/Endeavour_Evara.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3 BHK apartments in Electronics City Phase 1, available for sale in Endeavour Evara. Apartment prices in this housing society vary in the range of Rs. 60.52 - 85.66 L. Endeavour Evara has apartments in multiple configurations, in range of 1,062 - 1,503 sqft. The apartments here are Under Construction"
  },
  {
    id: "sthira-by-signifa-simhadri",
    title: "STHIRA by Signifa Simhadri",
    subtitle: "2, 3 BHK Apartment in Kyalasanahalli, Bommasandra",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹66.15 - 71.73 L" },
      { label: "3 BHK Apartment", price: "₹85.87 L - 1.03 Cr" }
    ],
    nearby: ["Sri Saraswati Vidyaniketan School", "Mazumdar Shaw Medical Center Hospital", "Delta Electronics Metro Station", "National Highway 44", "Cyber Park IT Park"],
    builder: "Signifa Simhadri Projects",
    status: "New Launch · Completion in Sep, 2029",
    imageSrc: "/STHIRA_by_Signifa_Simhadri.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 2,3 BHK apartments in Kyalasanahalli, now available in STHIRA by Signifa Simhadri. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/170226/008469 registration number. STHIRA by Signifa Simhadri has apartments in multiple configurations, in range of 1,067 - 1,663 sqft. Apartment prices in this housing society vary in the range of Rs. 66.15 L - 1.03 Cr",
    galleryImages: ['/STHIRA_by_Signifa_Simhadri.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3 BHK apartments in Kyalasanahalli, now available in STHIRA by Signifa Simhadri. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/170226/008469 registration number. STHIRA by Signifa Simhadri has apartments in multiple configurations, in range of 1,067 - 1,663 sqft. Apartment prices in this housing society vary in the range of Rs. 66.15 L - 1.03 Cr"
  },
  {
    id: "pavani-mirabilia",
    title: "Pavani Mirabilia",
    subtitle: "2, 3, 4 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.42 - 1.87 Cr" },
      { label: "3 BHK Apartment", price: "₹1.7 - 2.55 Cr" },
      { label: "4 BHK Apartment", price: "₹3.05 - 3.26 Cr" }
    ],
    nearby: ["Whitefield Railway Station", "Whitefield (Kadugodi) Metro Station", "MVJ College of Engineering", "One World International School", "International Tech Park Bangalore(ITPB)"],
    builder: "Pavani Group",
    status: "Under Construction · Completion from Dec, 2026 onwards",
    imageSrc: "/Pavani_Mirabilia.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Pavani Mirabilia, one of the known housing societes in Bangalore East, brings classic yet modern 2,3,4 BHK apartments in Whitefield. Pavani Mirabilia apartments are available in multiples sizes, ranging from 1,050 - 2,400 sqft SUPER area. Pavani Mirabilia is a RERA- registered society and PRM/KA/RERA/1251/446/PR/120922/005235 is the RERA registration number. This society offers apartments in the price range of Rs. 1.42 - 3.26 Cr",
    galleryImages: ['/Pavani_Mirabilia.jpg'],
    aboutText: "Pavani Mirabilia, one of the known housing societes in Bangalore East, brings classic yet modern 2,3,4 BHK apartments in Whitefield. Pavani Mirabilia apartments are available in multiples sizes, ranging from 1,050 - 2,400 sqft SUPER area. Pavani Mirabilia is a RERA- registered society and PRM/KA/RERA/1251/446/PR/120922/005235 is the RERA registration number. This society offers apartments in the price range of Rs. 1.42 - 3.26 Cr"
  },
  {
    id: "evara",
    title: "Evara",
    subtitle: "Land in Bidadi, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹51.6 - 75.25 L" }
    ],
    nearby: ["Kumbalgodu Industrial Area", "Harohalli Industrial Area", "Sattva Global City", "NICE Road Junction", "Challaghatta Metro Station"],
    builder: "Moval Group",
    status: "New Launch · Completion in Sep, 2027",
    imageSrc: "/Evara.jpg",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Land in Bidadi are now available for sale in Evara. The dimensions of Land in Evara are in range of 1,200 - 1,750 sqft. Residents will get some of the top amenities in this project, which include Gymnasium, Children's Play Area and Landscape Garden. Land prices in projectName vary in the range of Rs. 51.6 - 75.25 L",
    galleryImages: ['/Evara.jpg'],
    aboutText: "Land in Bidadi are now available for sale in Evara. The dimensions of Land in Evara are in range of 1,200 - 1,750 sqft. Residents will get some of the top amenities in this project, which include Gymnasium, Children's Play Area and Landscape Garden. Land prices in projectName vary in the range of Rs. 51.6 - 75.25 L"
  },
  {
    id: "celebrity-crystal-lake",
    title: "Celebrity Crystal Lake",
    subtitle: "2 BHK Apartment in Electronic City, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹43.8 - 48.14 L" }
    ],
    nearby: ["Unique High School", "Mithra Hospital", "Cyber Park IT Park", "Delta Electronics Metro Station", "SNR Degree College"],
    builder: "Celebrity Group Banglore",
    status: "Ready To Move · Since Feb, 2017",
    imageSrc: "/Celebrity_Crystal_Lake.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2 BHK apartments in Electronic City, available for sale in Celebrity Crystal Lake. Celebrity Crystal Lake has apartments in multiple configurations, in range of 1,010 - 1,110 sqft. Apartments in this complex are available in price range of Rs. 43.8 - 48.14 L. Apartments are Ready To Move in this project",
    galleryImages: ['/Celebrity_Crystal_Lake.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2 BHK apartments in Electronic City, available for sale in Celebrity Crystal Lake. Celebrity Crystal Lake has apartments in multiple configurations, in range of 1,010 - 1,110 sqft. Apartments in this complex are available in price range of Rs. 43.8 - 48.14 L. Apartments are Ready To Move in this project"
  },
  {
    id: "brigade-belvedere",
    title: "Brigade Belvedere",
    subtitle: "1, 2, 3 BHK Apartment in Budigere Cross, Bangalore",
    priceConfigs: [
      { label: "1 BHK Apartment", price: "₹85.16 L" },
      { label: "2 BHK Apartment", price: "₹1.32 - 1.37 Cr" },
      { label: "3 BHK Apartment", price: "₹1.72 - 2.4 Cr" }
    ],
    nearby: ["National Public School", "Garden City University", "East Point Hospital", "Orion Uptown Mall", "Bangalore International Airport"],
    builder: "Brigade Group",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Brigade_Belvedere.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 1,2,3 BHK apartments in Budigere Cross available for sale in Brigade Belvedere. This society offers apartments in the price range of Rs. 85.16 L - 2.4 Cr. Brigade Belvedere is a RERA-registered society and PRM/KA/RERA/1251/446/PR/240326/008549 is the RERA registration number. Apartments in Brigade Belvedere have SUPER area ranging between 715 - 2,013 sqft",
    galleryImages: ['/Brigade_Belvedere.jpg'],
    aboutText: "Finest 1,2,3 BHK apartments in Budigere Cross available for sale in Brigade Belvedere. This society offers apartments in the price range of Rs. 85.16 L - 2.4 Cr. Brigade Belvedere is a RERA-registered society and PRM/KA/RERA/1251/446/PR/240326/008549 is the RERA registration number. Apartments in Brigade Belvedere have SUPER area ranging between 715 - 2,013 sqft"
  },
  {
    id: "arvind-sylva",
    title: "Arvind Sylva",
    subtitle: "3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.96 - 2.43 Cr" },
      { label: "4 BHK Apartment", price: "₹2.97 - 3.24 Cr" }
    ],
    nearby: ["Kempegowda International Airport", "The Greenwood High International School", "Azim Premji University", "Manipal Hospital Varthur Road", "Market Square Mall"],
    builder: "Arvind Smartspaces",
    status: "New Launch · Completion in Aug, 2031",
    imageSrc: "/Arvind_Sylva.jpg",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Here are beautifully built 3,4 BHK apartments in Sarjapur Road, available for sale at Arvind Sylva. This society is RERA approved and PRM/KA/RERA/1251/446/PR/090726/008800 is the RERA number. Arvind Sylva apartments are available in multiples sizes, ranging from 1,450 - 2,400 sqft SUPER area. This society offers apartments in the price range of Rs. 1.96 - 3.24 Cr",
    galleryImages: ['/Arvind_Sylva.jpg'],
    aboutText: "Here are beautifully built 3,4 BHK apartments in Sarjapur Road, available for sale at Arvind Sylva. This society is RERA approved and PRM/KA/RERA/1251/446/PR/090726/008800 is the RERA number. Arvind Sylva apartments are available in multiples sizes, ranging from 1,450 - 2,400 sqft SUPER area. This society offers apartments in the price range of Rs. 1.96 - 3.24 Cr"
  }
];
