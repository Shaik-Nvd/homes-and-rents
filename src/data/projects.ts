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
    priceConfigs: [{"label": "Land", "price": "₹59 L"}],
    nearby: [],
    builder: "Vision Value Properties",
    status: "Ready To Move · Since Mar, 2026",
    imageSrc: "/Nandi_Lake_View.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. Plot sizes here are roughly in range of 1,800 sqft. Land prices here are in tune of Rs. 59 L",
    galleryImages: ['/Nandi_Lake_View.jpg'],
    aboutText: "This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. This is your chance to invest in Land in Nandi Hills. Check out Nandi Lake View, one of the best offerings in the area that too within your price range. Plot sizes here are roughly in range of 1,800 sqft. Land prices here are in tune of Rs. 59 L"
  },
  {
    id: "brigade-orchards-laurel-and-maple",
    title: "Brigade Orchards Laurel and Maple",
    subtitle: "1, 2, 3 BHK Apartment in Devanahalli, Bangalore",
    priceConfigs: [{"label": "1 BHK Apartment", "price": "₹58.09 - 90.08 L"}, {"label": "2 BHK Apartment", "price": "₹93.58 L - 1.1 Cr"}, {"label": "3 BHK Apartment", "price": "₹1.26 - 1.36 Cr"}],
    nearby: ["The Arcade at Brigade Orchards Mall", "Ramaiah Hospital", "Brigade Orchards Sports Arena", "The School For Global Minds", "National Highway 648"],
    builder: "Brigade Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Brigade_Orchards_Laurel_and_Maple.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 1,2,3 BHK apartments in Devanahalli are available for sale.Check out latest property options at Brigade Orchards Laurel and Maple housing society. Apartments in Brigade Orchards Laurel and Maple have CARPET area ranging between 449 - 1,051 sqft. The housing society is RERA-registered with PRM/KA/RERA/1250/303/PR/040326/008505 registration number. Apartment prices in this housing society vary in the range of Rs. 58.09 L - 1.36 Cr",
    galleryImages: ['/Brigade_Orchards_Laurel_and_Maple.jpg'],
    aboutText: "Spacious 1,2,3 BHK apartments in Devanahalli are available for sale.Check out latest property options at Brigade Orchards Laurel and Maple housing society. Apartments in Brigade Orchards Laurel and Maple have CARPET area ranging between 449 - 1,051 sqft. The housing society is RERA-registered with PRM/KA/RERA/1250/303/PR/040326/008505 registration number. Apartment prices in this housing society vary in the range of Rs. 58.09 L - 1.36 Cr"
  },
  {
    id: "poulomi-florique",
    title: "Poulomi Florique",
    subtitle: "2, 3 BHK Apartment in Kannur, Thanisandra Main Road",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.68 Cr"}, {"label": "3 BHK Apartment", "price": "₹1.89 - 2.91 Cr"}],
    nearby: ["The Leela", "Chaman Bhartiya School", "Bhartiya Centre Complex", "REVA University", "Elements Mall"],
    builder: "Poulomi Estates",
    status: "New Launch · Completion in Dec, 2032",
    imageSrc: "/Poulomi_Florique.jpg",
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Poulomi Florique, one of the known housing societes in Bangalore North, brings classic yet modern 2,3 BHK apartments in Kannur. Apartments in this complex are available in price range of Rs. 1.68 - 2.91 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/180326/008539 registration number. Apartments in Poulomi Florique have SUPER area ranging between 1,585 - 2,740 sqft",
    galleryImages: ['/Poulomi_Florique.jpg'],
    aboutText: "Poulomi Florique, one of the known housing societes in Bangalore North, brings classic yet modern 2,3 BHK apartments in Kannur. Apartments in this complex are available in price range of Rs. 1.68 - 2.91 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/180326/008539 registration number. Apartments in Poulomi Florique have SUPER area ranging between 1,585 - 2,740 sqft"
  },
  {
    id: "concorde-sienna",
    title: "Concorde Sienna",
    subtitle: "2, 3 BHK Apartment in Hennur Road, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.26 Cr"}, {"label": "3 BHK Apartment", "price": "₹1.96 Cr"}],
    nearby: ["BM International School", "CMR University", "Bhartiya Mall of Bangalore", "The Leela Hotel", "National Highway 44"],
    builder: "Concorde",
    status: "New Launch · Completion in Jul, 2031",
    imageSrc: "/Concorde_Sienna.jpg",
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Check out 2,3 BHK apartments in Hennur Road, now available for sale at Concorde Sienna. Concorde Sienna 's RERA registration number is PRM/KA/RERA/1251/446/PR/220626/008740. This society offers apartments in the price range of Rs. 1.26 - 1.96 Cr. Here units have different sizes, mostly in range of 1,200 - 1,870 sqft SUPER area",
    galleryImages: ['/Concorde_Sienna.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Hennur Road, now available for sale at Concorde Sienna. Concorde Sienna 's RERA registration number is PRM/KA/RERA/1251/446/PR/220626/008740. This society offers apartments in the price range of Rs. 1.26 - 1.96 Cr. Here units have different sizes, mostly in range of 1,200 - 1,870 sqft SUPER area"
  },
  {
    id: "assetz-city-of-palms",
    title: "Assetz City of Palms",
    subtitle: "Land in IVC Road, Devanahalli",
    priceConfigs: [{"label": "Land", "price": "₹1.01 - 4.57 Cr"}],
    nearby: ["National Highway 648", "Vihaan Public School", "M. S. Engineering College", "Club Cabana Amusement Park", "Manipal Hospital Doddaballapur"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Feb, 2029",
    imageSrc: "/Assetz_City_of_Palms.jpg",
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Now invest in Land in IVC Road, coming up at an affordable price in Assetz City of Palms. Park, Open Space and Well-Maintained Internal Roads are some of the top amenities available in this project. Plot sizes here are roughly in range of 1,117 - 5,074 sqft. Land will be offered for possession from Feb, 2029",
    galleryImages: ['/Assetz_City_of_Palms.jpg'],
    aboutText: "Now invest in Land in IVC Road, coming up at an affordable price in Assetz City of Palms. Park, Open Space and Well-Maintained Internal Roads are some of the top amenities available in this project. Plot sizes here are roughly in range of 1,117 - 5,074 sqft. Land will be offered for possession from Feb, 2029"
  },
  {
    id: "hariyana-riviera-glade",
    title: "Hariyana Riviera Glade",
    subtitle: "4 BHK Villa in Yelahanka, Bangalore",
    priceConfigs: [{"label": "4 BHK Villa", "price": "₹6.39 - 7.23 Cr"}],
    nearby: ["Atmecs Technologies", "Manyata Tech Park", "Devanahalli Business Park", "Reva University", "CMR University"],
    builder: "Hariyana Group",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Hariyana_Riviera_Glade.jpg",
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Hariyana Riviera Glade brings 4 BHK Villa in Yelahanka, one of the preferred locations in the city. These Villas are sized between 3,190 - 3,550 sqft. Prices of Villas in Hariyana Riviera Glade hover between Rs. 6.39 - 7.23 Cr. Swimming Pool, Gymnasium and Club House are some of the popular amenities offered here",
    galleryImages: ['/Hariyana_Riviera_Glade.jpg'],
    aboutText: "Hariyana Riviera Glade brings 4 BHK Villa in Yelahanka, one of the preferred locations in the city. These Villas are sized between 3,190 - 3,550 sqft. Prices of Villas in Hariyana Riviera Glade hover between Rs. 6.39 - 7.23 Cr. Swimming Pool, Gymnasium and Club House are some of the popular amenities offered here"
  },
  {
    id: "whispering-greens-by-earthern-projects",
    title: "Whispering Greens by Earthern Projects",
    subtitle: "Land in Rajankunte, Doddaballapur Road",
    priceConfigs: [{"label": "Land", "price": "₹72 L - 1.44 Cr"}],
    nearby: ["Presidency University", "Orchids the International School", "Chiguru Multispeciality Hospital", "Manipal Hospital Doddaballapur"],
    builder: "Earthern Projects",
    status: "New Launch · Completion in Jun, 2028",
    imageSrc: "/Whispering_Greens_by_Earthern_Projects.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Whispering Greens by Earthern Projects offers plots in Rajankunte , Bangalore North, for sale. Swimming Pool, Gymnasium and Club House are some of the top amenities available in this project. Land here are New Launch. Land size in Whispering Greens by Earthern Projects is in the range of 1,200 - 2,400 sqft",
    galleryImages: ['/Whispering_Greens_by_Earthern_Projects.jpg'],
    aboutText: "Whispering Greens by Earthern Projects offers plots in Rajankunte , Bangalore North, for sale. Swimming Pool, Gymnasium and Club House are some of the top amenities available in this project. Land here are New Launch. Land size in Whispering Greens by Earthern Projects is in the range of 1,200 - 2,400 sqft"
  },
  {
    id: "windsor-hillside",
    title: "Windsor Hillside",
    subtitle: "Land in Doddaballapur Road, Bangalore",
    priceConfigs: [{"label": "Land", "price": "₹68.4 - 82.08 L"}],
    nearby: ["GITAM University", "Bhagat Singh Stadium", "Mulberry Shades Hotel", "Dodballapur Railway Station", "National Highway 648"],
    builder: "Aashirya Land Developers",
    status: "Ready To Move · Since Jul, 2026",
    imageSrc: "/Windsor_Hillside.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Windsor Hillside offers plots in Doddaballapur Road , Bangalore North, for sale. Land prices in projectName vary in the range of Rs. 68.4 - 82.08 L. Homebuyers can enjoy amenities such as Children's Play Area, Landscape Garden and Park in this project. Sizes of these property options are in the bracket of 1,500 - 1,800 sqft",
    galleryImages: ['/Windsor_Hillside.jpg'],
    aboutText: "Windsor Hillside offers plots in Doddaballapur Road , Bangalore North, for sale. Land prices in projectName vary in the range of Rs. 68.4 - 82.08 L. Homebuyers can enjoy amenities such as Children's Play Area, Landscape Garden and Park in this project. Sizes of these property options are in the bracket of 1,500 - 1,800 sqft"
  },
  {
    id: "prestige-gardenia-estate",
    title: "Prestige Gardenia Estate",
    subtitle: "Land in Devanahalli, Bangalore",
    priceConfigs: [{"label": "Land", "price": "₹1.35 - 3.6 Cr"}],
    nearby: ["Satellite Town Ring Road Highway", "Devanahalli Railway Station", "JW Marriott Prestige Golfshire Hotel", "Harrow Intl School", "Amity University"],
    builder: "Prestige Group",
    status: "New Launch · Completion in Apr, 2027",
    imageSrc: "/Prestige_Gardenia_Estate.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Now invest in Land in Devanahalli, coming up at an affordable price in Prestige Gardenia Estate. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Club House. The dimensions of Land in Prestige Gardenia Estate are in range of 1,499 - 3,999 sqft. Land prices in this project are around Rs. 1.35 - 3.6 Cr",
    galleryImages: ['/Prestige_Gardenia_Estate.jpg'],
    aboutText: "Now invest in Land in Devanahalli, coming up at an affordable price in Prestige Gardenia Estate. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Club House. The dimensions of Land in Prestige Gardenia Estate are in range of 1,499 - 3,999 sqft. Land prices in this project are around Rs. 1.35 - 3.6 Cr"
  },
  {
    id: "century-kindle",
    title: "Century Kindle",
    subtitle: "2, 3, 4 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [{"label": "2 BHK Apartment", "price": "₹1.09 - 1.21 Cr"}, {"label": "3 BHK Apartment", "price": "₹1.41 - 1.7 Cr"}, {"label": "4 BHK Apartment", "price": "₹2.37 - 2.83 Cr"}],
    nearby: ["Narayana eTechno School", "Nagarjuna Pre University College", "The Galleria Mall", "Omega Multispeciality Hospital", "Kempegowda International Airport"],
    builder: "Century Real Estate Holdings",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Century_Kindle.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Yelahanka, available for sale in Century Kindle. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/200326/008542 registration number. This society offers apartments in the price range of Rs. 1.09 - 2.83 Cr. Apartments in Century Kindle have CARPET area ranging between 723 - 1,873 sqft",
    galleryImages: ['/Century_Kindle.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Yelahanka, available for sale in Century Kindle. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/200326/008542 registration number. This society offers apartments in the price range of Rs. 1.09 - 2.83 Cr. Apartments in Century Kindle have CARPET area ranging between 723 - 1,873 sqft"
  },
  {
    id: "vaishnavi-life",
    title: "Vaishnavi Life",
    subtitle: "Land in Bettenahalli, Near Yelahanka, Bangalore",
    priceConfigs: [{"label": "Land", "price": "₹1.03 - 3.88 Cr"}],
    nearby: ["To The Tee Golf Academy", "Vidyashilp University", "Windflower Prakruthi Resort & Spa", "Stonehill International School", "Padukone Dravid Centre for Sports"],
    builder: "Vaishnavi Group Bangalore",
    status: "Under Construction · Completion from Mar, 2025 onwards",
    imageSrc: "/Vaishnavi_Life.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Vaishnavi Life offers plots in Bettenahalli , Bangalore North, for sale. Sizes of these property options are in the bracket of 1,150 - 4,306 sqft. Land prices in projectName vary in the range of Rs. 1.03 - 3.88 Cr. Swimming Pool, Gymnasium and Club House are some of the top amenities available in this project",
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
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3,4 BHK apartments in Devanahalli, now available for sale at Birla Trimaya Phase 4. Here units have different sizes, mostly in range of 789 - 3,023 sqft CARPET area. Birla Trimaya Phase 4 's RERA registration number is PRM/KA/RERA/1250/303/PR/300125/007458. Apartment prices in this housing society vary in the range of Rs. 1.57 - 6 Cr",
    galleryImages: ['/Birla_Trimaya_Phase_4.jpg'],
    aboutText: "Check out 2,3,4 BHK apartments in Devanahalli, now available for sale at Birla Trimaya Phase 4. Here units have different sizes, mostly in range of 789 - 3,023 sqft CARPET area. Birla Trimaya Phase 4 's RERA registration number is PRM/KA/RERA/1250/303/PR/300125/007458. Apartment prices in this housing society vary in the range of Rs. 1.57 - 6 Cr"
  },
  {
    id: "nischitha-jai-dhama",
    title: "Nischitha Jai Dhama",
    subtitle: "Land in Madure, Bangalore",
    priceConfigs: [{"label": "Land", "price": "₹43.66 L - 1.33 Cr"}],
    nearby: ["Ayurvedic Hospital", "Rai Technology University", "Shreyas Yoga Retreat Hotel", "Bhairanayakanahalli Train Station", "MEI International School"],
    builder: "Nischitha Properties",
    status: "Under Construction · Completion in Jun, 2026",
    imageSrc: "/Nischitha_Jai_Dhama.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "Looking for Land in Madure? Explore great investment options in Nischitha Jai Dhama. Land in Nischitha Jai Dhama are priced approximately at Rs. 43.66 L - 1.33 Cr. Land will be offered for possession from Jun, 2026. This project has some top amenities, which include Children's Play Area, Landscape Garden and Jogging Track among others",
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
    imageCount: "1/1",
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
    imageCount: "1/1",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Here are beautifully built 3,4 BHK apartments in Sarjapur Road, available for sale at Arvind Sylva. This society is RERA approved and PRM/KA/RERA/1251/446/PR/090726/008800 is the RERA number. Arvind Sylva apartments are available in multiples sizes, ranging from 1,450 - 2,400 sqft SUPER area. This society offers apartments in the price range of Rs. 1.96 - 3.24 Cr",
    galleryImages: ['/Arvind_Sylva.jpg'],
    aboutText: "Here are beautifully built 3,4 BHK apartments in Sarjapur Road, available for sale at Arvind Sylva. This society is RERA approved and PRM/KA/RERA/1251/446/PR/090726/008800 is the RERA number. Arvind Sylva apartments are available in multiples sizes, ranging from 1,450 - 2,400 sqft SUPER area. This society offers apartments in the price range of Rs. 1.96 - 3.24 Cr"
  },
  {
    id: "eaton-park-at-the-prestige-city",
    title: "Eaton Park at The Prestige City",
    subtitle: "3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.2 - 2.84 Cr" },
      { label: "4 BHK Apartment", price: "₹3.07 - 3.48 Cr" }
    ],
    nearby: ["Oakridge International School", "Belenus Champion Hospital", "Azim Premji University", "Forum The Prestige City", "Kempegowda International Airport"],
    builder: "Prestige Group",
    status: "New Launch · Completion in Jun, 2030",
    imageSrc: "/Eaton_Park_at_The_Prestige_City.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 3,4 BHK apartments in Sarjapur Road available for sale in Eaton Park at The Prestige City. Eaton Park at The Prestige City has apartments in multiple configurations, in range of 1,732 - 2,786 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/180326/008537 registration number. This society offers apartments in the price range of Rs. 2.2 - 3.48 Cr",
    galleryImages: ['/Eaton_Park_at_The_Prestige_City.jpg'],
    aboutText: "Finest 3,4 BHK apartments in Sarjapur Road available for sale in Eaton Park at The Prestige City. Eaton Park at The Prestige City has apartments in multiple configurations, in range of 1,732 - 2,786 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/180326/008537 registration number. This society offers apartments in the price range of Rs. 2.2 - 3.48 Cr"
  },
  {
    id: "adish-aradhra",
    title: "Adish Aradhra",
    subtitle: "2 BHK Apartment in Chandapura, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹72.26 - 83.9 L" }
    ],
    nearby: ["Green Dot International School", "Mazumdar Shaw Medical Center", "Alliance University", "Hosur Railway Station", "Kempegowda International Airport"],
    builder: "Adish Properties",
    status: "Ready To Move · Since May, 2026",
    imageSrc: "/Adish_Aradhra.jpg",
    imageCount: "1/15",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2 BHK apartments in Chandapura, now available for sale at Adish Aradhra. Adish Aradhra apartments are available in multiples sizes, ranging from 1,292 - 1,514 sqft SUPER area. Adish Aradhra 's RERA registration number is PRM/KA/RERA/1251/308/PR/130622/004973. Apartments in this complex are available in price range of Rs. 72.26 - 83.9 L",
    galleryImages: ['/Adish_Aradhra.jpg'],
    aboutText: "Check out 2 BHK apartments in Chandapura, now available for sale at Adish Aradhra. Adish Aradhra apartments are available in multiples sizes, ranging from 1,292 - 1,514 sqft SUPER area. Adish Aradhra 's RERA registration number is PRM/KA/RERA/1251/308/PR/130622/004973. Apartments in this complex are available in price range of Rs. 72.26 - 83.9 L"
  },
  {
    id: "mahindra-blossom",
    title: "Mahindra Blossom",
    subtitle: "2, 3, 4 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.88 - 2.03 Cr" },
      { label: "3 BHK Apartment", price: "₹2.66 - 3.26 Cr" },
      { label: "4 BHK Apartment", price: "₹3.68 Cr" }
    ],
    nearby: ["National Public School", "MVJ College of Engineering", "Manipal Hospital Whitefield", "Park Square Mall", "Kempegowda International Airport"],
    builder: "Mahindra Lifespaces",
    status: "New Launch · Completion in Oct, 2030",
    imageSrc: "/Mahindra_Blossom.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3,4 BHK apartments in Whitefield, are now available in Mahindra Blossom. This society offers apartments in the price range of Rs. 1.88 - 3.68 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/120922/005236 registration number",
    galleryImages: ['/Mahindra_Blossom.jpg'],
    aboutText: "Beautiful 2,3,4 BHK apartments in Whitefield, are now available in Mahindra Blossom. This society offers apartments in the price range of Rs. 1.88 - 3.68 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/120922/005236 registration number"
  },
  {
    id: "nbr-soul-of-the-seasons",
    title: "NBR Soul of the Seasons",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.64 - 2.07 Cr" }
    ],
    nearby: ["Greenwood International School", "New Horizon College of Engineering", "Manipal Hospital Sarjapur Road", "Nexus Whitefield", "Kempegowda International Airport"],
    builder: "NBR Group Bangalore",
    status: "New Launch · Completion in Nov, 2029",
    imageSrc: "/NBR_Soul_of_the_Seasons.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3 BHK apartments in Sarjapur Road, available for sale at NBR Soul of the Seasons. Apartments in this complex are available in price range of Rs. 1.64 - 2.07 Cr. NBR Soul of the Seasons has apartments in multiple configurations, in range of 1,446 - 1,826 sqft. NBR Soul of the Seasons 's RERA registration number is PRM/KA/RERA/1251/310/PR/190625/007855",
    galleryImages: ['/NBR_Soul_of_the_Seasons.jpg'],
    aboutText: "Here are beautifully built 3 BHK apartments in Sarjapur Road, available for sale at NBR Soul of the Seasons. Apartments in this complex are available in price range of Rs. 1.64 - 2.07 Cr. NBR Soul of the Seasons has apartments in multiple configurations, in range of 1,446 - 1,826 sqft. NBR Soul of the Seasons 's RERA registration number is PRM/KA/RERA/1251/310/PR/190625/007855"
  },
  {
    id: "blue-horizon",
    title: "Blue Horizon",
    subtitle: "Land in Jigani, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹51.6 - 64.5 L" }
    ],
    nearby: [],
    builder: "Blue Peak Ventures",
    status: "Ready To Move · Since Mar, 2026",
    imageSrc: "/Blue_Horizon.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "Want to invest in Land in Jigani? Check out Blue Horizon, the city's best offering in this category. Sizes of these property options are in the bracket of 1,200 - 1,500 sqft. Land prices here are in tune of Rs. 51.6 - 64.5 L. Residents will get some of the top amenities in this project, which include Children's Play Area, Park and Gated Community",
    galleryImages: ['/Blue_Horizon.jpg'],
    aboutText: "Want to invest in Land in Jigani? Check out Blue Horizon, the city's best offering in this category. Sizes of these property options are in the bracket of 1,200 - 1,500 sqft. Land prices here are in tune of Rs. 51.6 - 64.5 L. Residents will get some of the top amenities in this project, which include Children's Play Area, Park and Gated Community"
  },
  {
    id: "sri-sai-dev-enclave",
    title: "Sri Sai Dev Enclave",
    subtitle: "Land in Budigere, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹78 L - 2.6 Cr" }
    ],
    nearby: ["Nalanda Group of Institutions", "Sunrise International School", "Gleason Aerospace Park", "DoubleTree by Hilton Hotel", "National Highway 648"],
    builder: "Sri Sai Dev Enclave",
    status: "Ready To Move · Since Mar, 2026",
    imageSrc: "/Sri_Sai_Dev_Enclave.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "Looking for Land in Budigere? Explore great investment options in Sri Sai Dev Enclave. Land size in Sri Sai Dev Enclave is in the range of 1,200 - 4,000 sqft. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Children's Play Area. Land prices in projectName vary in the range of Rs. 78 L - 2.6 Cr",
    galleryImages: ['/Sri_Sai_Dev_Enclave.jpg'],
    aboutText: "Looking for Land in Budigere? Explore great investment options in Sri Sai Dev Enclave. Land size in Sri Sai Dev Enclave is in the range of 1,200 - 4,000 sqft. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Children's Play Area. Land prices in projectName vary in the range of Rs. 78 L - 2.6 Cr"
  },
  {
    id: "ss-prakruthi-meadows",
    title: "SS Prakruthi Meadows",
    subtitle: "2, 3 BHK Apartment in Sarjapur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹69.94 - 85.42 L" },
      { label: "3 BHK Apartment", price: "₹92.99 L - 1.07 Cr" }
    ],
    nearby: [],
    builder: "SS Projects",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/SS_Prakruthi_Meadows.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Sarjapur are available for sale.Check out latest property options at SS Prakruthi Meadows housing society. SS Prakruthi Meadows has apartments in multiple configurations, in range of 1,098 - 1,716 sqft. Apartment prices in this housing society vary in the range of Rs. 69.94 L - 1.07 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/270526/008689 registration number",
    galleryImages: ['/SS_Prakruthi_Meadows.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Sarjapur are available for sale.Check out latest property options at SS Prakruthi Meadows housing society. SS Prakruthi Meadows has apartments in multiple configurations, in range of 1,098 - 1,716 sqft. Apartment prices in this housing society vary in the range of Rs. 69.94 L - 1.07 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/270526/008689 registration number"
  },
  {
    id: "adarsh-parkland",
    title: "Adarsh Parkland",
    subtitle: "2, 3 BHK Apartment in Panathur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.7 Cr" },
      { label: "3 BHK Apartment", price: "₹2.12 - 2.19 Cr" }
    ],
    nearby: ["Vibgyor High School", "Sakra World Hospital", "New Horizon College of Engineering", "Sir M. Visvesvaraya Terminal", "Kempegowda International Airport"],
    builder: "Adarsh Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Adarsh_Parkland.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Adarsh Parkland, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Panathur. Apartments in Adarsh Parkland have CARPET area ranging between 948 - 1,222 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/110823/006145 registration number. Apartment prices in this housing society vary in the range of Rs. 1.7 - 2.19 Cr",
    galleryImages: ['/Adarsh_Parkland.jpg'],
    aboutText: "Adarsh Parkland, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Panathur. Apartments in Adarsh Parkland have CARPET area ranging between 948 - 1,222 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/110823/006145 registration number. Apartment prices in this housing society vary in the range of Rs. 1.7 - 2.19 Cr"
  },
  {
    id: "fortune-seven-sarjapur",
    title: "Fortune Seven Sarjapur",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹99.32 L - 1.03 Cr" },
      { label: "3 BHK Apartment", price: "₹1.16 - 1.57 Cr" },
      { label: "4 BHK Apartment", price: "₹1.58 - 1.73 Cr" }
    ],
    nearby: ["National Highway 948A", "Azim Premji University", "Town Hospital", "Cambridge Public School", "Clover Greens Golf Course"],
    builder: "Fortune Primero",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Fortune_Seven_Sarjapur.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Spacious 2,3,4 BHK apartments in Sarjapur Road are available for sale.Check out latest property options at Fortune Seven Sarjapur housing society. Apartment prices in this housing society vary in the range of Rs. 99.32 L - 1.73 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/260226/008489 registration number. Here units have different sizes, mostly in range of 1,200 - 2,086 sqft SUPER area",
    galleryImages: ['/Fortune_Seven_Sarjapur.jpg'],
    aboutText: "Spacious 2,3,4 BHK apartments in Sarjapur Road are available for sale.Check out latest property options at Fortune Seven Sarjapur housing society. Apartment prices in this housing society vary in the range of Rs. 99.32 L - 1.73 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/260226/008489 registration number. Here units have different sizes, mostly in range of 1,200 - 2,086 sqft SUPER area"
  },
  {
    id: "fernvale-at-the-prestige-city",
    title: "Fernvale at The Prestige City",
    subtitle: "2, 3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.39 - 1.82 Cr" },
      { label: "3 BHK Apartment", price: "₹1.89 - 2.5 Cr" }
    ],
    nearby: ["Oakridge International School", "Swastik Hospitals", "Forum The Prestige City", "Azim Premji University", "Kempegowda International Airport"],
    builder: "Prestige Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Fernvale_at_The_Prestige_City.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Sarjapur Road, now available for sale at Fernvale at The Prestige City. Prices of apartments in this project, vary between Rs. 1.39 - 2.5 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/110326/008519 registration number. Fernvale at The Prestige City has apartments in multiple configurations, in range of 1,113 - 1,996 sqft",
    galleryImages: ['/Fernvale_at_The_Prestige_City.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Sarjapur Road, now available for sale at Fernvale at The Prestige City. Prices of apartments in this project, vary between Rs. 1.39 - 2.5 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/110326/008519 registration number. Fernvale at The Prestige City has apartments in multiple configurations, in range of 1,113 - 1,996 sqft"
  },
  {
    id: "arvind-skycrest",
    title: "Arvind Skycrest",
    subtitle: "2, 3, 4 BHK Apartment in Gottigere, Bannerghatta Road",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.24 - 1.62 Cr" },
      { label: "3 BHK Apartment", price: "₹1.7 - 1.84 Cr" },
      { label: "4 BHK Apartment", price: "₹2.08 - 2.14 Cr" }
    ],
    nearby: ["Kalena Agrahara Metro Station", "Radcliffe International School", "NICE Peripheral Ring Road", "Apollo Hospital", "IIM Bangalore"],
    builder: "Arvind Smartspaces",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Arvind_Skycrest.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Spacious 2,3,4 BHK apartments in Gottigere are available for sale.Check out latest property options at Arvind Skycrest housing society. Arvind Skycrest is a RERA- registered society and PRM/KA/RERA/1251/310/PR/230326/008543 is the RERA registration number. Arvind Skycrest apartments are available in multiples sizes, ranging from 1,131 - 1,944 sqft SUPER area. Apartments in this complex are available in price range of Rs. 1.24 - 2.14 Cr",
    galleryImages: ['/Arvind_Skycrest.jpg'],
    aboutText: "Spacious 2,3,4 BHK apartments in Gottigere are available for sale.Check out latest property options at Arvind Skycrest housing society. Arvind Skycrest is a RERA- registered society and PRM/KA/RERA/1251/310/PR/230326/008543 is the RERA registration number. Arvind Skycrest apartments are available in multiples sizes, ranging from 1,131 - 1,944 sqft SUPER area. Apartments in this complex are available in price range of Rs. 1.24 - 2.14 Cr"
  },
  {
    id: "trishul-happy-homes-trayam",
    title: "Trishul Happy Homes Trayam",
    subtitle: "2, 3 BHK Apartment in Electronic City, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹60.3 L" },
      { label: "3 BHK Apartment", price: "₹75.15 L" }
    ],
    nearby: ["Zia International School", "Motherhood Hospital", "National Highway 44", "Cyber Park", "Electronic City Metro Station"],
    builder: "Trishul Builders Bangalore",
    status: "Under Construction · Completion in Jul, 2026",
    imageSrc: "/Trishul_Happy_Homes_Trayam.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Electronic City, now available for sale at Trishul Happy Homes Trayam. Prices of apartments in this project, vary between Rs. 60.3 - 75.15 L. Here units have different sizes, mostly in range of 1,206 - 1,503 sqft SUPER area. The apartments here are Under Construction",
    galleryImages: ['/Trishul_Happy_Homes_Trayam.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Electronic City, now available for sale at Trishul Happy Homes Trayam. Prices of apartments in this project, vary between Rs. 60.3 - 75.15 L. Here units have different sizes, mostly in range of 1,206 - 1,503 sqft SUPER area. The apartments here are Under Construction"
  },
  {
    id: "assetz-muse-and-maison",
    title: "Assetz Muse and Maison",
    subtitle: "3 BHK Apartment in Gattahalli, Near Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.1 - 2.22 Cr" }
    ],
    nearby: ["Primus Public School", "PES University", "M5 Ecity Mall", "Springleaf Hospital", "Kempegowda International Airport"],
    builder: "Assetz Property Group",
    status: "New Launch · Completion in Mar, 2030",
    imageSrc: "/Assetz_Muse_and_Maison.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3 BHK apartments in Gattahalli, available for sale at Assetz Muse and Maison. Apartment prices in this housing society vary in the range of Rs. 2.1 - 2.22 Cr. Assetz Muse and Maison has apartments in multiple configurations, in range of 1,830 - 1,930 sqft. Assetz Muse and Maison is a RERA- registered society and PRM/KA/RERA/1251/310/PR/040526/008618 is the RERA registration number",
    galleryImages: ['/Assetz_Muse_and_Maison.jpg'],
    aboutText: "Here are beautifully built 3 BHK apartments in Gattahalli, available for sale at Assetz Muse and Maison. Apartment prices in this housing society vary in the range of Rs. 2.1 - 2.22 Cr. Assetz Muse and Maison has apartments in multiple configurations, in range of 1,830 - 1,930 sqft. Assetz Muse and Maison is a RERA- registered society and PRM/KA/RERA/1251/310/PR/040526/008618 is the RERA registration number"
  },
  {
    id: "purva-heritage",
    title: "Purva Heritage",
    subtitle: "2, 3 BHK Apartment in Hongasandra, Hosur Road",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.92 - 1.95 Cr" },
      { label: "3 BHK Apartment", price: "₹3.04 - 3.26 Cr" }
    ],
    nearby: ["National Highway 48", "Kudlu Gate Metro Station", "Ozone Manay Technology Park", "Dayananda Sagar University", "MS Dhoni Global School"],
    builder: "Puravankara",
    status: "New Launch · Completion in Aug, 2030",
    imageSrc: "/Purva_Heritage.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Looking for your dream home? Explore 2,3 BHK apartments in Hongasandra, now available in Purva Heritage. This society is RERA approved and PRM/KA/RERA/1251/310/PR/090726/008801 is the RERA number. This society offers apartments in the price range of Rs. 1.92 - 3.26 Cr. Purva Heritage has apartments in multiple configurations, in range of 1,315 - 2,066 sqft",
    galleryImages: ['/Purva_Heritage.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3 BHK apartments in Hongasandra, now available in Purva Heritage. This society is RERA approved and PRM/KA/RERA/1251/310/PR/090726/008801 is the RERA number. This society offers apartments in the price range of Rs. 1.92 - 3.26 Cr. Purva Heritage has apartments in multiple configurations, in range of 1,315 - 2,066 sqft"
  },
  {
    id: "grc-sapphire-spring",
    title: "GRC Sapphire Spring",
    subtitle: "2, 3 BHK Apartment in Gottigere, Bannerghatta Road",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.31 - 1.53 Cr" },
      { label: "3 BHK Apartment", price: "₹1.57 - 1.83 Cr" }
    ],
    nearby: ["Radcliffe School", "Vijayashree Hospitals", "Rammanohar Lohia College", "Konanakunte Cross metro", "Kengeri Station"],
    builder: "GRC Infra",
    status: "New Launch · Completion from Jul, 2030 onwards",
    imageSrc: "/GRC_Sapphire_Spring.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 2,3 BHK apartments in Gottigere available for sale in GRC Sapphire Spring. Apartment prices in this housing society vary in the range of Rs. 1.31 - 1.83 Cr. GRC Sapphire Spring has apartments in multiple configurations, in range of 1,195 - 1,660 sqft. This society is RERA approved and PRM/KA/RERA/1251/310/PR/030225/007479 is the RERA number",
    galleryImages: ['/GRC_Sapphire_Spring.jpg'],
    aboutText: "Finest 2,3 BHK apartments in Gottigere available for sale in GRC Sapphire Spring. Apartment prices in this housing society vary in the range of Rs. 1.31 - 1.83 Cr. GRC Sapphire Spring has apartments in multiple configurations, in range of 1,195 - 1,660 sqft. This society is RERA approved and PRM/KA/RERA/1251/310/PR/030225/007479 is the RERA number"
  },
  {
    id: "inspira-trees-of-life",
    title: "Inspira Trees of Life",
    subtitle: "3, 4 BHK Villa in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Villa", price: "₹3.5 - 4.03 Cr" },
      { label: "4 BHK Villa", price: "₹5.09 Cr" }
    ],
    nearby: ["Sri Ram Public School", "Town Hospital Sarjapura", "Azim Premji University", "Kempegowda International Airport", "M5 ECity Mall"],
    builder: "Inspira Builders Bangalore",
    status: "New Launch · Completion in Jun, 2028",
    imageSrc: "/Inspira_Trees_of_Life.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Check out 3,4 BHK Villa in Inspira Trees of Life, located in Sarjapur Road. Inspira Trees of Life is a New Launch project .These Villas possession will begin in Jun, 2028. Villas in Inspira Trees of Life will cost you in the range of Rs. 3.5 - 5.09 Cr. Villas size in Inspira Trees of Life varies from 3,300 - 4,800 sqft",
    galleryImages: ['/Inspira_Trees_of_Life.jpg'],
    aboutText: "Check out 3,4 BHK Villa in Inspira Trees of Life, located in Sarjapur Road. Inspira Trees of Life is a New Launch project .These Villas possession will begin in Jun, 2028. Villas in Inspira Trees of Life will cost you in the range of Rs. 3.5 - 5.09 Cr. Villas size in Inspira Trees of Life varies from 3,300 - 4,800 sqft"
  },
  {
    id: "nikhar-celio",
    title: "Nikhar Celio",
    subtitle: "2, 3 BHK Apartment in Gunjur, Near Varthur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.17 Cr" },
      { label: "3 BHK Apartment", price: "₹1.35 - 1.7 Cr" }
    ],
    nearby: ["Krupanidhi College of Physiotherapy", "State Highway 35", "Chrysalis High School, Varthur", "Sahasra Hospitals", "Karmelaram Railway Station"],
    builder: "Nikhar Estates LLP",
    status: "New Launch · Completion in Dec, 2030",
    imageSrc: "/Nikhar_Celio.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Gunjur are available for sale.Check out latest property options at Nikhar Celio housing society. Apartment prices in this housing society vary in the range of Rs. 1.17 - 1.7 Cr. Here units have different sizes, mostly in range of 1,235 - 1,790 sqft SUPER area. Nikhar Celio is a RERA-registered society and PRM/KA/RERA/1251/446/PR/280426/008605 is the RERA registration number",
    galleryImages: ['/Nikhar_Celio.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Gunjur are available for sale.Check out latest property options at Nikhar Celio housing society. Apartment prices in this housing society vary in the range of Rs. 1.17 - 1.7 Cr. Here units have different sizes, mostly in range of 1,235 - 1,790 sqft SUPER area. Nikhar Celio is a RERA-registered society and PRM/KA/RERA/1251/446/PR/280426/008605 is the RERA registration number"
  },
  {
    id: "forest-province-the-right-life",
    title: "Forest Province The Right Life",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.24 - 1.3 Cr" },
      { label: "3 BHK Apartment", price: "₹1.75 Cr" },
      { label: "4 BHK Apartment", price: "₹2.07 Cr" }
    ],
    nearby: ["Inventure Academy", "Swastik Hospitals", "Belandur Road Railway Station", "Forum Neighbourhood Mall", "National Highway 44"],
    builder: "Mana Projects",
    status: "New Launch · Completion in Jun, 2031",
    imageSrc: "/Forest_Province_The_Right_Life.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Sarjapur Road, available for sale in Forest Province The Right Life. Forest Province The Right Life has apartments in multiple configurations, in range of 1,120 - 1,595 sqft. Apartment prices in this housing society vary in the range of Rs. 1.24 - 2.07 Cr. Forest Province The Right Life 's RERA registration number is PRM/KA/RERA/1251/308/PR/120326/008522",
    galleryImages: ['/Forest_Province_The_Right_Life.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3,4 BHK apartments in Sarjapur Road, available for sale in Forest Province The Right Life. Forest Province The Right Life has apartments in multiple configurations, in range of 1,120 - 1,595 sqft. Apartment prices in this housing society vary in the range of Rs. 1.24 - 2.07 Cr. Forest Province The Right Life 's RERA registration number is PRM/KA/RERA/1251/308/PR/120326/008522"
  },
  {
    id: "goyal-orchid-south-park",
    title: "Goyal Orchid South Park",
    subtitle: "2, 3 BHK Apartment in Electronic City, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.51 - 1.56 Cr" },
      { label: "3 BHK Apartment", price: "₹1.84 - 2.12 Cr" }
    ],
    nearby: ["Huskur Metro Station", "M5 Ecity Mall", "Ebenezer International School", "PES University", "Mazumdar Shaw Medical Center"],
    builder: "Goyal and Co",
    status: "New Launch · Completion in Apr, 2031",
    imageSrc: "/Goyal_Orchid_South_Park.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Electronic City, now available for sale at Goyal Orchid South Park. This society offers apartments in the price range of Rs. 1.51 - 2.12 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/060526/008625 registration number. Goyal Orchid South Park apartments are available in multiples sizes, ranging from 848 - 1,177 sqft CARPET area",
    galleryImages: ['/Goyal_Orchid_South_Park.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Electronic City, now available for sale at Goyal Orchid South Park. This society offers apartments in the price range of Rs. 1.51 - 2.12 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/060526/008625 registration number. Goyal Orchid South Park apartments are available in multiples sizes, ranging from 848 - 1,177 sqft CARPET area"
  },
  {
    id: "sjr-vivo-city",
    title: "SJR Vivo City",
    subtitle: "Land in Nelamangala, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹66 - 99 L" }
    ],
    nearby: ["Bengaluru-Mumbai Hwy", "Meditide Multi-Speciality Hospital", "Dobbspet Public School", "Ambika College of Nursing", "Aditya Global Cricket Stadium"],
    builder: "SJR Prime Corporation",
    status: "New Launch · Completion in Nov, 2029",
    imageSrc: "/SJR_Vivo_City.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Res Land/plots Looking for Land in Nelamangala for sale in a gated society by SJR Vivo City. Land prices in projectName vary in the range of Rs. 66 - 99 L. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Club House. The dimensions of Land in SJR Vivo City are in range of 1,200 - 1,800 sqft",
    galleryImages: ['/SJR_Vivo_City.jpg'],
    aboutText: "Res Land/plots Looking for Land in Nelamangala for sale in a gated society by SJR Vivo City. Land prices in projectName vary in the range of Rs. 66 - 99 L. Residents will get some of the top amenities in this project, which include Swimming Pool, Gymnasium and Club House. The dimensions of Land in SJR Vivo City are in range of 1,200 - 1,800 sqft"
  },
  {
    id: "rainvas-rainbow-uno",
    title: "Rainvas Rainbow Uno",
    subtitle: "3, 4 BHK Apartment in Vasanthapura, Kanakapura Road",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.15 - 2.36 Cr" },
      { label: "4 BHK Apartment", price: "₹2.53 - 2.68 Cr" }
    ],
    nearby: ["Delhi Public School Bengaluru", "Forum Mall Bengaluru", "Dayananda Sagar University", "DHEE Multispecialty Hospitals", "Doddakallasandra Metro Station"],
    builder: "Rainvas Infraa",
    status: "Under Construction · Completion in Jun, 2031",
    imageSrc: "/Rainvas_Rainbow_Uno.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 3,4 BHK apartments in Vasanthapura available for sale in Rainvas Rainbow Uno. Rainvas Rainbow Uno has apartments in multiple configurations, in range of 1,820 - 2,270 sqft. Apartment prices in this housing society vary in the range of Rs. 2.15 - 2.68 Cr. Rainvas Rainbow Uno 's RERA registration number is PRM/KA/RERA/1251/310/PR/180326/008540",
    galleryImages: ['/Rainvas_Rainbow_Uno.jpg'],
    aboutText: "Finest 3,4 BHK apartments in Vasanthapura available for sale in Rainvas Rainbow Uno. Rainvas Rainbow Uno has apartments in multiple configurations, in range of 1,820 - 2,270 sqft. Apartment prices in this housing society vary in the range of Rs. 2.15 - 2.68 Cr. Rainvas Rainbow Uno 's RERA registration number is PRM/KA/RERA/1251/310/PR/180326/008540"
  },
  {
    id: "posch-by-royal-indraprastha-builders",
    title: "Posch By Royal Indraprastha Builders",
    subtitle: "3, 4 BHK Apartment in Gubbalala, Kanakapura Road",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹3.04 - 3.16 Cr" },
      { label: "4 BHK Apartment", price: "₹4.01 - 4.08 Cr" }
    ],
    nearby: [],
    builder: "Royal Indraprastha Builders",
    status: "New Launch · Completion in Dec, 2031",
    imageSrc: "/Posch_By_Royal_Indraprastha_Builders.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Posch By Royal Indraprastha Builders, one of the known housing societes in Bangalore South, brings classic yet modern 3,4 BHK apartments in Gubbalala. Here units have different sizes, mostly in range of 2,047 - 2,770 sqft SUPER area. Apartments in this complex are available in price range of Rs. 3.04 - 4.08 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/270426/008603 registration number",
    galleryImages: ['/Posch_By_Royal_Indraprastha_Builders.jpg'],
    aboutText: "Posch By Royal Indraprastha Builders, one of the known housing societes in Bangalore South, brings classic yet modern 3,4 BHK apartments in Gubbalala. Here units have different sizes, mostly in range of 2,047 - 2,770 sqft SUPER area. Apartments in this complex are available in price range of Rs. 3.04 - 4.08 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/270426/008603 registration number"
  },
  {
    id: "sattva-songbird",
    title: "Sattva Songbird",
    subtitle: "1, 2, 3 BHK Apartment, 4 BHK Villa, 1 RK Studio Apartment in Budigere Cross, Bangalore East",
    priceConfigs: [
      { label: "1 BHK Apartment", price: "₹94.88 L" },
      { label: "2 BHK Apartment", price: "₹1.61 - 1.76 Cr" },
      { label: "3 BHK Apartment", price: "₹2.18 - 2.28 Cr" },
      { label: "1 RK Studio Apartment", price: "₹67.34 L" }
    ],
    nearby: ["Sri Jnanagangotri International School", "Garden City University", "Vitals Hospital", "Kempegowda International Airport", "Orion Uptown Mall"],
    builder: "Sattva Group",
    status: "Under Construction · Completion in May, 2029",
    imageSrc: "/Sattva_Songbird.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "For Multiple: Sattva Songbird offers beautifully designed 1 BHK Apartment, 2 BHK Apartment and 3 BHK Apartment in Budigere Cross, Bangalore East. Property prices here start from Rs. 67.34 L. Swimming Pool, Gymnasium and Club House are some of the popular amenities offered in this project. Property options in Sattva Songbird varies between 468 - 3,543 sqft",
    galleryImages: ['/Sattva_Songbird.jpg'],
    aboutText: "For Multiple: Sattva Songbird offers beautifully designed 1 BHK Apartment, 2 BHK Apartment and 3 BHK Apartment in Budigere Cross, Bangalore East. Property prices here start from Rs. 67.34 L. Swimming Pool, Gymnasium and Club House are some of the popular amenities offered in this project. Property options in Sattva Songbird varies between 468 - 3,543 sqft"
  },
  {
    id: "kumar-platina",
    title: "Kumar Platina",
    subtitle: "2, 3 BHK Apartment in Nagasandra, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.75 Cr" },
      { label: "3 BHK Apartment", price: "₹1.98 Cr" }
    ],
    nearby: ["National Highway 48", "Arvind The Edge", "Christ University Yeshwanthpur Campus", "Prakriya Hospitals", "Widia Poornaprajna School"],
    builder: "Kumar Properties",
    status: "New Launch · Completion in Mar, 2031",
    imageSrc: "/Kumar_Platina.jpg",
    imageCount: "1/2",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "Spacious 2,3 BHK apartments in Nagasandra are available for sale.Check out latest property options at Kumar Platina housing society. This society is RERA approved and PRM/KA/RERA/1251/309/PR/080426/008577 is the RERA number. Prices of apartments in this project, vary between Rs. 1.75 - 1.98 Cr. Here units have different sizes, mostly in range of 965 - 1,099 sqft CARPET area",
    galleryImages: ['/Kumar_Platina.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Nagasandra are available for sale.Check out latest property options at Kumar Platina housing society. This society is RERA approved and PRM/KA/RERA/1251/309/PR/080426/008577 is the RERA number. Prices of apartments in this project, vary between Rs. 1.75 - 1.98 Cr. Here units have different sizes, mostly in range of 965 - 1,099 sqft CARPET area"
  },
  {
    id: "madhura-lotus",
    title: "Madhura Lotus",
    subtitle: "Land in Kanakapura Road, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹64.9 L - 1.32 Cr" }
    ],
    nearby: ["Kempegowda International Airport", "DAV Public School", "Dayananda Sagar University", "Lifeline Hospital", "Forum South Mall"],
    builder: "Madhura Ventures",
    status: "Ready To Move · Since Dec, 2024",
    imageSrc: "/Madhura_Lotus.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["ZERO BROKERAGE"],
    description: "Land in Kanakapura Road are now available for sale in Madhura Lotus. Plot sizes here are roughly in range of 1,180 - 2,400 sqft. This project has some top amenities, which include Gymnasium, Children's Play Area and Jogging Track among others. Land here are Ready To Move",
    galleryImages: ['/Madhura_Lotus.jpg'],
    aboutText: "Land in Kanakapura Road are now available for sale in Madhura Lotus. Plot sizes here are roughly in range of 1,180 - 2,400 sqft. This project has some top amenities, which include Gymnasium, Children's Play Area and Jogging Track among others. Land here are Ready To Move"
  },
  {
    id: "the-ninth-by-amberstone",
    title: "The Ninth by Amberstone",
    subtitle: "2, 3 BHK Apartment in 9th Phase JP Nagar, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹90.88 L - 1.02 Cr" },
      { label: "3 BHK Apartment", price: "₹1.15 - 1.48 Cr" }
    ],
    nearby: ["Jubilee National Public School", "Dayanandsagar University", "DHEE Multispeciality Hospital", "Royal Meenakshi Mall", "Doddakallasandra Metro Station"],
    builder: "Amberstone Properties",
    status: "New Launch · Completion in Jun, 2029",
    imageSrc: "/The_Ninth_by_Amberstone.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "SEEN"],
    description: "Beautiful 2,3 BHK apartments in 9th Phase JP Nagar, are now available in The Ninth by Amberstone housing project. Apartments in this complex are available in price range of Rs. 90.88 L - 1.48 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/100626/008718 registration number. Apartments in The Ninth by Amberstone have SUPER area ranging between 1,136 - 1,856 sqft",
    galleryImages: ['/The_Ninth_by_Amberstone.jpg'],
    aboutText: "Beautiful 2,3 BHK apartments in 9th Phase JP Nagar, are now available in The Ninth by Amberstone housing project. Apartments in this complex are available in price range of Rs. 90.88 L - 1.48 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/310/PR/100626/008718 registration number. Apartments in The Ninth by Amberstone have SUPER area ranging between 1,136 - 1,856 sqft"
  },
  {
    id: "reviva-by-ssi",
    title: "Reviva By SSI",
    subtitle: "2, 3 BHK Apartment in Chandapura, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹79.42 - 82.46 L" },
      { label: "3 BHK Apartment", price: "₹1 - 1.13 Cr" }
    ],
    nearby: ["Surana Vidyalaya", "Athreya Hospital", "National Highway 48", "Heelalige Railway station", "M5 Ecity Mall"],
    builder: "Sri Sai Infra Bangalore",
    status: "Under Construction · Completion in Dec, 2027",
    imageSrc: "/Reviva_By_SSI.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 2,3 BHK apartments in Chandapura, now available for sale at Reviva By SSI. Reviva By SSI 's RERA registration number is PRM/KA/RERA/1251/308/PR/130525/007735. Apartments in Reviva By SSI have SUPER area ranging between 1,045 - 1,490 sqft. Apartment prices in this housing society vary in the range of Rs. 79.42 L - 1.13 Cr",
    galleryImages: ['/Reviva_By_SSI.jpg'],
    aboutText: "Check out 2,3 BHK apartments in Chandapura, now available for sale at Reviva By SSI. Reviva By SSI 's RERA registration number is PRM/KA/RERA/1251/308/PR/130525/007735. Apartments in Reviva By SSI have SUPER area ranging between 1,045 - 1,490 sqft. Apartment prices in this housing society vary in the range of Rs. 79.42 L - 1.13 Cr"
  },
  {
    id: "dsr-elixir",
    title: "DSR Elixir",
    subtitle: "4, 5 BHK Villa in Whitefield, Bangalore",
    priceConfigs: [
      { label: "4 BHK Villa", price: "₹4.91 - 6.12 Cr" },
      { label: "5 BHK Villa", price: "₹3.81 - 6.65 Cr" }
    ],
    nearby: ["Great International School", "Atal Bihari Botanical Garden", "East Point Hospital", "HM Tech Park", "MVJ College of Engineering"],
    builder: "DSR Infra Projects Bangalore",
    status: "Ready To Move · Since Jun, 2026",
    imageSrc: "/DSR_Elixir.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Located in Whitefield, DSR Elixir is now offering 4,5 BHK Villa for sale. These Villas are sized between 3,375 - 5,883 sqft. DSR Elixir is already Ready To Move . Prices of Villas in DSR Elixir hover between Rs. 3.81 - 6.65 Cr",
    galleryImages: ['/DSR_Elixir.jpg'],
    aboutText: "Located in Whitefield, DSR Elixir is now offering 4,5 BHK Villa for sale. These Villas are sized between 3,375 - 5,883 sqft. DSR Elixir is already Ready To Move . Prices of Villas in DSR Elixir hover between Rs. 3.81 - 6.65 Cr"
  },
  {
    id: "rrl-palm-altezze",
    title: "RRL Palm Altezze",
    subtitle: "2, 3 BHK Apartment in Varthur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹97.86 L" },
      { label: "3 BHK Apartment", price: "₹1.15 - 1.25 Cr" }
    ],
    nearby: ["National Highway 648", "Manipal Hospital Varthur Road", "Virginia Mall", "Prestige Tech Forest", "Bellandur Road Railway Station"],
    builder: "RRL Builders and Developers",
    status: "Under Construction · Completion in Mar, 2027",
    imageSrc: "/RRL_Palm_Altezze.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2,3 BHK apartments in Varthur, available for sale in RRL Palm Altezze. Apartments in this complex are available in price range of Rs. 97.86 L - 1.25 Cr. RRL Palm Altezze is a RERA- registered society and PRM/KA/RERA/1251/308/PR/141025/008167 is the RERA registration number. Apartments in RRL Palm Altezze have SUPER area ranging between 1,265 - 1,630 sqft",
    galleryImages: ['/RRL_Palm_Altezze.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3 BHK apartments in Varthur, available for sale in RRL Palm Altezze. Apartments in this complex are available in price range of Rs. 97.86 L - 1.25 Cr. RRL Palm Altezze is a RERA- registered society and PRM/KA/RERA/1251/308/PR/141025/008167 is the RERA registration number. Apartments in RRL Palm Altezze have SUPER area ranging between 1,265 - 1,630 sqft"
  },
  {
    id: "dsr-the-address",
    title: "DSR The Address",
    subtitle: "2, 3, 4 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.34 - 1.88 Cr" },
      { label: "3 BHK Apartment", price: "₹1.69 - 3.19 Cr" },
      { label: "4 BHK Apartment", price: "₹3.03 - 3.19 Cr" }
    ],
    nearby: ["Global Indian Intl. School", "Sakra World Hospital", "Amrita Vishwa Vidyapeetam", "Carmelaram", "Hindustan Aeronautics Limited Airport"],
    builder: "DSR Infra Projects Bangalore",
    status: "Under Construction · Completion in Dec, 2027",
    imageSrc: "/DSR_The_Address.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 2,3,4 BHK apartments in Sarjapur Road, available for sale at DSR The Address. Apartments in DSR The Address have SUPER area ranging between 1,149 - 2,735 sqft. Apartments in this complex are available in price range of Rs. 1.34 - 3.19 Cr. DSR The Address is a RERA- registered society and PRM/KA/RERA/1251/308/PR/050924/006996 is the RERA registration number",
    galleryImages: ['/DSR_The_Address.jpg'],
    aboutText: "Here are beautifully built 2,3,4 BHK apartments in Sarjapur Road, available for sale at DSR The Address. Apartments in DSR The Address have SUPER area ranging between 1,149 - 2,735 sqft. Apartments in this complex are available in price range of Rs. 1.34 - 3.19 Cr. DSR The Address is a RERA- registered society and PRM/KA/RERA/1251/308/PR/050924/006996 is the RERA registration number"
  },
  {
    id: "snn-estates-felicity",
    title: "SNN Estates Felicity",
    subtitle: "1, 2, 3, 4 BHK Apartment in Thanisandra, Bangalore",
    priceConfigs: [
      { label: "1 BHK Apartment", price: "₹80.5 - 82.23 L" },
      { label: "2 BHK Apartment", price: "₹1.21 - 1.4 Cr" },
      { label: "3 BHK Apartment", price: "₹1.55 - 1.98 Cr" },
      { label: "4 BHK Apartment", price: "₹2.17 - 2.65 Cr" }
    ],
    nearby: ["VIBGYOR High School", "Manipal Hospital Hebbal", "REVA University", "Elements Mall", "Thanisandra Station"],
    builder: "SNN Estates",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/SNN_Estates_Felicity.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Finest 1,2,3,4 BHK apartments in Thanisandra available for sale in SNN Estates Felicity. This society offers apartments in the price range of Rs. 80.5 L - 2.65 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/220124/006568 registration number. Apartments in SNN Estates Felicity have SUPER area ranging between 700 - 2,300 sqft",
    galleryImages: ['/SNN_Estates_Felicity.jpg'],
    aboutText: "Finest 1,2,3,4 BHK apartments in Thanisandra available for sale in SNN Estates Felicity. This society offers apartments in the price range of Rs. 80.5 L - 2.65 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/220124/006568 registration number. Apartments in SNN Estates Felicity have SUPER area ranging between 700 - 2,300 sqft"
  },
  {
    id: "vaishno-serene",
    title: "Vaishno Serene",
    subtitle: "3 BHK Apartment in Hoodi, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.13 - 1.36 Cr" }
    ],
    nearby: ["Sristi Global School", "Belathur Main Rd", "Whitefield Railway Station", "Nexus Shantiniketan Mall", "Bhoruka Technology Park"],
    builder: "Vaishno Builders",
    status: "Ready To Move",
    imageSrc: "/Vaishno_Serene.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Check out 3 BHK apartments in Hoodi, now available for sale at Vaishno Serene. Apartments in this complex are available in price range of Rs. 1.13 - 1.36 Cr. Here units have different sizes, mostly in range of 1,421 - 1,702 sqft SUPER area. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/210524/006924 registration number",
    galleryImages: ['/Vaishno_Serene.jpg'],
    aboutText: "Check out 3 BHK apartments in Hoodi, now available for sale at Vaishno Serene. Apartments in this complex are available in price range of Rs. 1.13 - 1.36 Cr. Here units have different sizes, mostly in range of 1,421 - 1,702 sqft SUPER area. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/210524/006924 registration number"
  },
  {
    id: "winds-of-change-by-ckpc",
    title: "Winds of Change by CKPC",
    subtitle: "3, 4 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.82 - 1.99 Cr" },
      { label: "4 BHK Apartment", price: "₹2.72 - 2.76 Cr" }
    ],
    nearby: ["Vishwa Vidyapeeth Vikramashila", "Ramada Hotel by Wyndham Bengaluru", "Harohalli Lake", "Garuda Mall, Yelahanka", "Yelahanka Metro Station"],
    builder: "CKPC Residences",
    status: "Under Construction · Completion in Mar, 2029",
    imageSrc: "/Winds_of_Change_by_CKPC.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 3,4 BHK apartments in Yelahanka, available for sale in Winds of Change by CKPC. Apartments in Winds of Change by CKPC have SUPER area ranging between 1,630 - 2,368 sqft. Prices of apartments in this project, vary between Rs. 1.82 - 2.76 Cr. This society is RERA approved and PRM/KA/RERA/1251/472/PR/210525/007765 is the RERA number",
    galleryImages: ['/Winds_of_Change_by_CKPC.jpg'],
    aboutText: "Choose your dream home from the wide variety of 3,4 BHK apartments in Yelahanka, available for sale in Winds of Change by CKPC. Apartments in Winds of Change by CKPC have SUPER area ranging between 1,630 - 2,368 sqft. Prices of apartments in this project, vary between Rs. 1.82 - 2.76 Cr. This society is RERA approved and PRM/KA/RERA/1251/472/PR/210525/007765 is the RERA number"
  },
  {
    id: "concorde-antares",
    title: "Concorde Antares",
    subtitle: "2, 3 BHK Apartment in Vidyaranyapura, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.04 - 1.43 Cr" },
      { label: "3 BHK Apartment", price: "₹1.42 - 1.99 Cr" }
    ],
    nearby: ["Subhash Chandra Bose Rd", "Sambhram Academy of Management", "Aveksha Hospital", "Sri Chaitanya School", "Peenya Industry Metro Station"],
    builder: "Concorde",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/Concorde_Antares.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 2,3 BHK apartments in Vidyaranyapura, now available in Concorde Antares. Apartments in this complex are available in price range of Rs. 1.04 - 1.99 Cr. Apartments in Concorde Antares have CARPET area ranging between 717 - 1,374 sqft. Concorde Antares 's RERA registration number is PRM/KA/RERA/1251/309/PR/181223/006491",
    galleryImages: ['/Concorde_Antares.jpg'],
    aboutText: "Looking for your dream home? Explore 2,3 BHK apartments in Vidyaranyapura, now available in Concorde Antares. Apartments in this complex are available in price range of Rs. 1.04 - 1.99 Cr. Apartments in Concorde Antares have CARPET area ranging between 717 - 1,374 sqft. Concorde Antares 's RERA registration number is PRM/KA/RERA/1251/309/PR/181223/006491"
  },
  {
    id: "pride-euphora",
    title: "Pride Euphora",
    subtitle: "3, 4 BHK Apartment in KR Puram, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.9 - 2.16 Cr" },
      { label: "4 BHK Apartment", price: "₹3.75 - 3.92 Cr" }
    ],
    nearby: ["National Highway 75", "Krishnarajapuram Railway Station", "Cambridge International School", "Bhattarahalli Stadium", "Hope Hospital"],
    builder: "Pride Group",
    status: "Under Construction · Completion in Sep, 2027",
    imageSrc: "/Pride_Euphora.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Pride Euphora society now offers elegantly built 3,4 BHK apartments in KR Puram. Apartments in Pride Euphora have SUPER area ranging between 1,693 - 2,982 sqft. This society offers apartments in the price range of Rs. 1.9 - 3.92 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/080824/006965 registration number",
    galleryImages: ['/Pride_Euphora.jpg'],
    aboutText: "Pride Euphora society now offers elegantly built 3,4 BHK apartments in KR Puram. Apartments in Pride Euphora have SUPER area ranging between 1,693 - 2,982 sqft. This society offers apartments in the price range of Rs. 1.9 - 3.92 Cr. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/080824/006965 registration number"
  },
  {
    id: "meenakshi-high-life-towers",
    title: "Meenakshi High Life Towers",
    subtitle: "2, 3, 4 BHK Apartment in Hebbal, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.37 - 1.62 Cr" },
      { label: "3 BHK Apartment", price: "₹1.83 - 2.81 Cr" },
      { label: "4 BHK Apartment", price: "₹2.78 - 3.76 Cr" }
    ],
    nearby: ["Nagawara Metro Station", "Daisy Montessori School", "Cratis Hospital", "University of Agricultural Sciences", "Thanisandra Railway Station"],
    builder: "Meenakshi Infrra Projects",
    status: "Under Construction · Completion in Aug, 2027",
    imageSrc: "/Meenakshi_High_Life_Towers.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3,4 BHK apartments in Hebbal, are now available in Meenakshi High Life Towers housing project. Meenakshi High Life Towers has apartments in multiple configurations, in range of 1,096 - 3,004 sqft. This society is RERA approved and PRM/KA/RERA/1251/309/PR/200923/006268 is the RERA number. Apartments in this complex are available in price range of Rs. 1.37 - 3.76 Cr",
    galleryImages: ['/Meenakshi_High_Life_Towers.jpg'],
    aboutText: "Beautiful 2,3,4 BHK apartments in Hebbal, are now available in Meenakshi High Life Towers housing project. Meenakshi High Life Towers has apartments in multiple configurations, in range of 1,096 - 3,004 sqft. This society is RERA approved and PRM/KA/RERA/1251/309/PR/200923/006268 is the RERA number. Apartments in this complex are available in price range of Rs. 1.37 - 3.76 Cr"
  },
  {
    id: "trendsquares-akino",
    title: "Trendsquares Akino",
    subtitle: "3, 4 BHK Apartment in Marathahalli, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.73 - 1.85 Cr" },
      { label: "4 BHK Apartment", price: "₹2.04 - 2.07 Cr" }
    ],
    nearby: ["Kempegowda International Airport", "The Brigade School", "Brookefield Hospital", "Dayananda Sagar University", "Seetharam Palya"],
    builder: "Trendsquares Constructions",
    status: "Under Construction · Completion in Aug, 2029",
    imageSrc: "/Trendsquares_Akino.jpg",
    imageCount: "1/12",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3,4 BHK apartments in Marathahalli, available for sale at Trendsquares Akino. This society offers apartments in the price range of Rs. 1.73 - 2.07 Cr. Trendsquares Akino has apartments in multiple configurations, in range of 1,580 - 2,010 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/250325/007619 is the RERA number",
    galleryImages: ['/Trendsquares_Akino.jpg'],
    aboutText: "Here are beautifully built 3,4 BHK apartments in Marathahalli, available for sale at Trendsquares Akino. This society offers apartments in the price range of Rs. 1.73 - 2.07 Cr. Trendsquares Akino has apartments in multiple configurations, in range of 1,580 - 2,010 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/250325/007619 is the RERA number"
  },
  {
    id: "dsr-the-courtyard",
    title: "DSR The Courtyard",
    subtitle: "2, 3 BHK Apartment in Gunjur, Near Varthur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.12 - 1.3 Cr" },
      { label: "3 BHK Apartment", price: "₹1.55 - 1.68 Cr" }
    ],
    nearby: ["Mayflower Montessori School", "New Horizon College of Engineering", "Belenus Champion Hospital", "Market Square Mall Sarjapur Road", "KSR Bengaluru City Junction"],
    builder: "DSR Infra Projects Bangalore",
    status: "Ready To Move · Since Jul, 2026",
    imageSrc: "/DSR_The_Courtyard.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "DSR The Courtyard, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Gunjur. Here units have different sizes, mostly in range of 1,113 - 1,687 sqft SUPER area. Apartment prices in this housing society vary in the range of Rs. 1.12 - 1.68 Cr. DSR The Courtyard 's RERA registration number is PRM/KA/RERA/1251/446/PR/280324/006759",
    galleryImages: ['/DSR_The_Courtyard.jpg'],
    aboutText: "DSR The Courtyard, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Gunjur. Here units have different sizes, mostly in range of 1,113 - 1,687 sqft SUPER area. Apartment prices in this housing society vary in the range of Rs. 1.12 - 1.68 Cr. DSR The Courtyard 's RERA registration number is PRM/KA/RERA/1251/446/PR/280324/006759"
  },
  {
    id: "casalife-by-bhavisha-homes",
    title: "CasaLife by Bhavisha Homes",
    subtitle: "4 BHK Villa in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "4 BHK Villa", price: "₹2.25 - 3.28 Cr" }
    ],
    nearby: ["The International School Bangalore", "Azim Premji University", "Satya Sai Hospital", "Kempegowda International Airport", "Karmelaram Railway Station"],
    builder: "Bhavisha Properties",
    status: "Under Construction · Completion in Apr, 2026",
    imageSrc: "/CasaLife_by_Bhavisha_Homes.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "CasaLife by Bhavisha Homes brings 4 BHK Villa in Sarjapur Road, one of the preferred locations in the city. Villa size varies in the range of 2,476 - 3,604 sqft. CasaLife by Bhavisha Homes Villas are Under Construction. Villas here are available in the price range of Rs. 2.25 - 3.28 Cr",
    galleryImages: ['/CasaLife_by_Bhavisha_Homes.jpg'],
    aboutText: "CasaLife by Bhavisha Homes brings 4 BHK Villa in Sarjapur Road, one of the preferred locations in the city. Villa size varies in the range of 2,476 - 3,604 sqft. CasaLife by Bhavisha Homes Villas are Under Construction. Villas here are available in the price range of Rs. 2.25 - 3.28 Cr"
  },
  {
    id: "hinduja-el-jardin",
    title: "Hinduja El Jardin",
    subtitle: "3, 4 BHK Apartment in Thanisandra Main Road, Bangalore North",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹2.29 - 2.78 Cr" },
      { label: "4 BHK Apartment", price: "₹2.98 - 3.41 Cr" }
    ],
    nearby: ["Manayata Tech Park", "Columbia Asia Hospital", "Reva University", "Yelahanka Junction", "Phoenix Mall of Asia"],
    builder: "Hinduja Holdings",
    status: "Under Construction · Completion in Mar, 2027",
    imageSrc: "/Hinduja_El_Jardin.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Hinduja El Jardin society now offers elegantly built 3,4 BHK apartments in Thanisandra Main Road. Here units have different sizes, mostly in range of 1,793 - 2,227 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/472/PR/190222/002444 is the RERA number. Prices of apartments in this project, vary between Rs. 2.29 - 3.41 Cr",
    galleryImages: ['/Hinduja_El_Jardin.jpg'],
    aboutText: "Hinduja El Jardin society now offers elegantly built 3,4 BHK apartments in Thanisandra Main Road. Here units have different sizes, mostly in range of 1,793 - 2,227 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/472/PR/190222/002444 is the RERA number. Prices of apartments in this project, vary between Rs. 2.29 - 3.41 Cr"
  },
  {
    id: "candeur-novo-gardenia",
    title: "Candeur Novo Gardenia",
    subtitle: "2, 3 BHK Apartment in Varthur, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.2 - 1.28 Cr" },
      { label: "3 BHK Apartment", price: "₹1.48 - 1.78 Cr" }
    ],
    nearby: ["Kadugudi South Metro Station", "Varthur - Sarjapur Road", "Nexus Mall Whitefield", "Belandur Road Railway Station", "Oakridge International School"],
    builder: "Candeur Constructions",
    status: "Ready To Move · Since Jun, 2026",
    imageSrc: "/Candeur_Novo_Gardenia.jpg",
    imageCount: "1/13",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Candeur Novo Gardenia, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Varthur. Apartments in this complex are available in price range of Rs. 1.2 - 1.78 Cr. Candeur Novo Gardenia has apartments in multiple configurations, in range of 1,210 - 1,790 sqft. Candeur Novo Gardenia is a RERA- registered society and PRM/KA/RERA/1251/309/PR/070324/006697 is the RERA registration number",
    galleryImages: ['/Candeur_Novo_Gardenia.jpg'],
    aboutText: "Candeur Novo Gardenia, one of the known housing societes in Bangalore East, brings classic yet modern 2,3 BHK apartments in Varthur. Apartments in this complex are available in price range of Rs. 1.2 - 1.78 Cr. Candeur Novo Gardenia has apartments in multiple configurations, in range of 1,210 - 1,790 sqft. Candeur Novo Gardenia is a RERA- registered society and PRM/KA/RERA/1251/309/PR/070324/006697 is the RERA registration number"
  },
  {
    id: "ira-by-the-banks",
    title: "Ira By The Banks",
    subtitle: "3, 4 BHK Villa in Attibele, Bangalore",
    priceConfigs: [
      { label: "3 BHK Villa", price: "₹1.7 - 2.45 Cr" },
      { label: "4 BHK Villa", price: "₹1.98 - 2.7 Cr" }
    ],
    nearby: ["Electronic City", "Whitefield", "St. Dominic's School", "PES University", "NR Hospital"],
    builder: "Alcove Properties",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/Ira_By_The_Banks.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Book 3,4 BHK Villa for sale in Attibele by Ira By The Banks. Sizes of Villas vary in 1,822 - 2,983 sqft. Villas in Ira By The Banks are Under Construction. Prices of Villas in Ira By The Banks hover between Rs. 1.7 - 2.7 Cr",
    galleryImages: ['/Ira_By_The_Banks.jpg'],
    aboutText: "Book 3,4 BHK Villa for sale in Attibele by Ira By The Banks. Sizes of Villas vary in 1,822 - 2,983 sqft. Villas in Ira By The Banks are Under Construction. Prices of Villas in Ira By The Banks hover between Rs. 1.7 - 2.7 Cr"
  },
  {
    id: "5-elements-natures-lap",
    title: "5 Elements Natures Lap",
    subtitle: "2, 3 BHK Apartment in Bagalakunte, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.05 - 1.12 Cr" },
      { label: "3 BHK Apartment", price: "₹1.32 - 1.51 Cr" }
    ],
    nearby: ["Chikkabidarakallu Metro", "NICE Road", "Peenya Industrial Area", "Orion Mall", "Manipal Hospital"],
    builder: "5 Elements Homes",
    status: "Under Construction · Completion in Dec, 2029",
    imageSrc: "/5_Elements_Natures_Lap.jpg",
    imageCount: "1/12",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Bagalakunte are available for sale.Check out latest property options at 5 Elements Natures Lap housing society. This society is RERA approved and PRM/KA/RERA/1251/309/PR/060325/007556 is the RERA number. Apartments in 5 Elements Natures Lap have SUPER area ranging between 1,130 - 1,630 sqft. This society offers apartments in the price range of Rs. 1.05 - 1.51 Cr",
    galleryImages: ['/5_Elements_Natures_Lap.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Bagalakunte are available for sale.Check out latest property options at 5 Elements Natures Lap housing society. This society is RERA approved and PRM/KA/RERA/1251/309/PR/060325/007556 is the RERA number. Apartments in 5 Elements Natures Lap have SUPER area ranging between 1,130 - 1,630 sqft. This society offers apartments in the price range of Rs. 1.05 - 1.51 Cr"
  },
  {
    id: "concorde-mayfair",
    title: "Concorde Mayfair",
    subtitle: "3 BHK Apartment in Yelahanka, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.99 - 2.28 Cr" }
    ],
    nearby: ["Sparsh Hospital Yelahanka", "The Galleria Mall", "Yelahanka Junction", "Mallya Aditi International School", "National Highway 44"],
    builder: "Concorde",
    status: "Under Construction · Completion in Nov, 2028",
    imageSrc: "/Concorde_Mayfair.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D", "SEEN"],
    description: "Concorde Mayfair society now offers elegantly built 3 BHK apartments in Yelahanka. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/030524/006839 registration number. Prices of apartments in this project, vary between Rs. 1.99 - 2.28 Cr. Apartments in Concorde Mayfair have SUPER area ranging between 1,453 - 1,667 sqft",
    galleryImages: ['/Concorde_Mayfair.jpg'],
    aboutText: "Concorde Mayfair society now offers elegantly built 3 BHK apartments in Yelahanka. The housing society is RERA-registered with PRM/KA/RERA/1251/309/PR/030524/006839 registration number. Prices of apartments in this project, vary between Rs. 1.99 - 2.28 Cr. Apartments in Concorde Mayfair have SUPER area ranging between 1,453 - 1,667 sqft"
  },
  {
    id: "bilva-2-by-bhavisha-homes",
    title: "Bilva 2 by Bhavisha Homes",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.69 - 1.7 Cr" }
    ],
    nearby: ["Oakridge International School", "Manipal Hospital Sarjapur Road", "Azim Premji University", "Kempegowda Intl Airport", "Market Square Mall"],
    builder: "Bhavisha Properties",
    status: "Under Construction · Completion in Apr, 2027",
    imageSrc: "/Bilva_2_by_Bhavisha_Homes.jpg",
    imageCount: "1/3",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3 BHK apartments in Sarjapur Road, available for sale at Bilva 2 by Bhavisha Homes. Apartment prices in this housing society vary in the range of Rs. 1.69 - 1.7 Cr. Bilva 2 by Bhavisha Homes apartments are available in multiples sizes, ranging from 1,933 - 1,945 sqft SUPER area. Bilva 2 by Bhavisha Homes 's RERA registration number is PRM/KA/RERA/1251/308/PR/280325/007639",
    galleryImages: ['/Bilva_2_by_Bhavisha_Homes.jpg'],
    aboutText: "Here are beautifully built 3 BHK apartments in Sarjapur Road, available for sale at Bilva 2 by Bhavisha Homes. Apartment prices in this housing society vary in the range of Rs. 1.69 - 1.7 Cr. Bilva 2 by Bhavisha Homes apartments are available in multiples sizes, ranging from 1,933 - 1,945 sqft SUPER area. Bilva 2 by Bhavisha Homes 's RERA registration number is PRM/KA/RERA/1251/308/PR/280325/007639"
  },
  {
    id: "ramky-fortuna",
    title: "Ramky Fortuna",
    subtitle: "1, 2, 3, 4 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "1 BHK Apartment", price: "₹76.59 - 79 L" },
      { label: "2 BHK Apartment", price: "₹1.28 - 1.55 Cr" },
      { label: "3 BHK Apartment", price: "₹1.8 - 2.52 Cr" },
      { label: "4 BHK Apartment", price: "₹3.07 - 3.87 Cr" }
    ],
    nearby: ["Orchids The International School", "Whitefield Railway Station", "Altor Hospitals", "Garden City University", "Hoodi Metro Station"],
    builder: "Ramky Estates",
    status: "Under Construction · Completion in Mar, 2027",
    imageSrc: "/Ramky_Fortuna.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Looking for your dream home? Explore 1,2,3,4 BHK apartments in Whitefield, now available in Ramky Fortuna. Here units have different sizes, mostly in range of 605 - 3,060 sqft SUPER area. The housing society is RERA-registered with TOR/PRM/KA/RERA/1251/446/PR/250915/000308 registration number. This society offers apartments in the price range of Rs. 76.59 L - 3.87 Cr",
    galleryImages: ['/Ramky_Fortuna.jpg'],
    aboutText: "Looking for your dream home? Explore 1,2,3,4 BHK apartments in Whitefield, now available in Ramky Fortuna. Here units have different sizes, mostly in range of 605 - 3,060 sqft SUPER area. The housing society is RERA-registered with TOR/PRM/KA/RERA/1251/446/PR/250915/000308 registration number. This society offers apartments in the price range of Rs. 76.59 L - 3.87 Cr"
  },
  {
    id: "lorven-cascade-garden",
    title: "Lorven Cascade Garden",
    subtitle: "3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.85 - 2.49 Cr" }
    ],
    nearby: ["Whitefield Global School", "MVJ College of Engineering", "Arya hub mall", "Manipal Hospital", "World Business Chamber"],
    builder: "Lorven Ventures",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/Lorven_Cascade_Garden.jpg",
    imageCount: "1/13",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Lorven Cascade Garden society now offers elegantly built 3 BHK apartments in Whitefield. Lorven Cascade Garden has apartments in multiple configurations, in range of 1,325 - 1,785 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/311224/007332 registration number. Prices of apartments in this project, vary between Rs. 1.85 - 2.49 Cr",
    galleryImages: ['/Lorven_Cascade_Garden.jpg'],
    aboutText: "Lorven Cascade Garden society now offers elegantly built 3 BHK apartments in Whitefield. Lorven Cascade Garden has apartments in multiple configurations, in range of 1,325 - 1,785 sqft. The housing society is RERA-registered with PRM/KA/RERA/1251/446/PR/311224/007332 registration number. Prices of apartments in this project, vary between Rs. 1.85 - 2.49 Cr"
  },
  {
    id: "ankuraa-pristine-park",
    title: "Ankuraa Pristine Park",
    subtitle: "2, 3, 4 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.45 Cr" },
      { label: "3 BHK Apartment", price: "₹1.74 - 2.09 Cr" },
      { label: "4 BHK Apartment", price: "₹2.66 - 2.67 Cr" }
    ],
    nearby: ["Whitefield Global School", "Kadugodi Tree Park Metro", "Nexus Neighborhood Mall", "Sumadhura Capitol Towers", "GR Tech Park"],
    builder: "Ankuraa Group",
    status: "Under Construction · Completion in Dec, 2028",
    imageSrc: "/Ankuraa_Pristine_Park.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 2,3,4 BHK apartments in Whitefield, available for sale at Ankuraa Pristine Park. Apartment prices in this housing society vary in the range of Rs. 1.45 - 2.67 Cr. This society is RERA approved and PRM/KA/RERA/1251/446/PR/281025/008200 is the RERA number. Ankuraa Pristine Park has apartments in multiple configurations, in range of 1,288 - 2,439 sqft",
    galleryImages: ['/Ankuraa_Pristine_Park.jpg'],
    aboutText: "Here are beautifully built 2,3,4 BHK apartments in Whitefield, available for sale at Ankuraa Pristine Park. Apartment prices in this housing society vary in the range of Rs. 1.45 - 2.67 Cr. This society is RERA approved and PRM/KA/RERA/1251/446/PR/281025/008200 is the RERA number. Ankuraa Pristine Park has apartments in multiple configurations, in range of 1,288 - 2,439 sqft"
  },
  {
    id: "sakura-blossom",
    title: "Sakura Blossom",
    subtitle: "2, 3 BHK Apartment in Budigere Cross, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.02 - 1.09 Cr" },
      { label: "3 BHK Apartment", price: "₹1.38 Cr" }
    ],
    nearby: ["NH 75", "New Baldwin Intl School", "Kempegowda International Airport", "Brigade Uptown Mall", "East Point Hospital"],
    builder: "Sri Sai Chaitanya",
    status: "Under Construction · Completion in Jul, 2027",
    imageSrc: "/Sakura_Blossom.jpg",
    imageCount: "1/7",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Budigere Cross are available for sale.Check out latest property options at Sakura Blossom housing society. Apartments in Sakura Blossom have SUPER area ranging between 1,243 - 1,719 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/191024/007155 is the RERA number. This society offers apartments in the price range of Rs. 1.02 - 1.38 Cr",
    galleryImages: ['/Sakura_Blossom.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Budigere Cross are available for sale.Check out latest property options at Sakura Blossom housing society. Apartments in Sakura Blossom have SUPER area ranging between 1,243 - 1,719 sqft. This society is RERA approved and PRM/KA/RERA/1251/446/PR/191024/007155 is the RERA number. This society offers apartments in the price range of Rs. 1.02 - 1.38 Cr"
  },
  {
    id: "navanaami-courtyard-of-life",
    title: "Navanaami Courtyard Of Life",
    subtitle: "3 BHK Apartment in Kodathi, Near Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.44 - 1.53 Cr" }
    ],
    nearby: ["Kidztopiaa", "St Jeromes PU and Degree College", "Primus Public School", "Karmelaram Railway Station", "SH 35"],
    builder: "Navanaami Projects",
    status: "Under Construction · Completion in Jun, 2029",
    imageSrc: "/Navanaami_Courtyard_Of_Life.jpg",
    imageCount: "1/8",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Here are beautifully built 3 BHK apartments in Kodathi, available for sale at Navanaami Courtyard Of Life. Navanaami Courtyard Of Life 's RERA registration number is PRM/KA/RERA/1251/446/PR/221024/007164. Navanaami Courtyard Of Life apartments are available in multiples sizes, ranging from 1,663 - 1,759 sqft SUPER area. This society offers apartments in the price range of Rs. 1.44 - 1.53 Cr",
    galleryImages: ['/Navanaami_Courtyard_Of_Life.jpg'],
    aboutText: "Here are beautifully built 3 BHK apartments in Kodathi, available for sale at Navanaami Courtyard Of Life. Navanaami Courtyard Of Life 's RERA registration number is PRM/KA/RERA/1251/446/PR/221024/007164. Navanaami Courtyard Of Life apartments are available in multiples sizes, ranging from 1,663 - 1,759 sqft SUPER area. This society offers apartments in the price range of Rs. 1.44 - 1.53 Cr"
  },
  {
    id: "global-edifice-orlean",
    title: "Global Edifice Orlean",
    subtitle: "2, 3 BHK Apartment in Electronic City Phase 2, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹80.63 - 91.5 L" },
      { label: "3 BHK Apartment", price: "₹93.83 L - 1.19 Cr" }
    ],
    nearby: ["St. Peter's International Public School", "Kempegowda International Airport", "Narayana Institute of Cardiac Sciences", "Bangalore College of Arts and Sciecne", "Heelalige Railway Station"],
    builder: "Global Edifice Builders",
    status: "Under Construction · Completion in Dec, 2026",
    imageSrc: "/Global_Edifice_Orlean.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3 BHK apartments in Electronic City Phase 2, are now available in Global Edifice Orlean housing project. Global Edifice Orlean is a RERA- registered society and PRM/KA/RERA/1251/308/PR/071224/007275 is the RERA registration number. Global Edifice Orlean has apartments in multiple configurations, in range of 1,075 - 1,590 sqft. This society offers apartments in the price range of Rs. 80.63 L - 1.19 Cr",
    galleryImages: ['/Global_Edifice_Orlean.jpg'],
    aboutText: "Beautiful 2,3 BHK apartments in Electronic City Phase 2, are now available in Global Edifice Orlean housing project. Global Edifice Orlean is a RERA- registered society and PRM/KA/RERA/1251/308/PR/071224/007275 is the RERA registration number. Global Edifice Orlean has apartments in multiple configurations, in range of 1,075 - 1,590 sqft. This society offers apartments in the price range of Rs. 80.63 L - 1.19 Cr"
  },
  {
    id: "satyam-varad",
    title: "Satyam Varad",
    subtitle: "2, 3 BHK Apartment in Kammasandra, Electronic City",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹73.66 - 93.51 L" },
      { label: "3 BHK Apartment", price: "₹1.09 Cr" }
    ],
    nearby: ["National Highway 44", "National Public School", "M5 Ecity Mall", "Bommasandra Metro Station", "Mazumdar Shaw Medical Center"],
    builder: "Satyam Builders and Developers",
    status: "New Launch · Completion in Dec, 2027",
    imageSrc: "/Satyam_Varad.jpg",
    imageCount: "1/4",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Spacious 2,3 BHK apartments in Kammasandra are available for sale.Check out latest property options at Satyam Varad housing society. Satyam Varad is a RERA- registered society and PRM/KA/RERA/1251/310/PR/280324/006731 is the RERA registration number. Here units have different sizes, mostly in range of 980 - 1,489 sqft SUPER area. This society offers apartments in the price range of Rs. 73.66 L - 1.09 Cr",
    galleryImages: ['/Satyam_Varad.jpg'],
    aboutText: "Spacious 2,3 BHK apartments in Kammasandra are available for sale.Check out latest property options at Satyam Varad housing society. Satyam Varad is a RERA- registered society and PRM/KA/RERA/1251/310/PR/280324/006731 is the RERA registration number. Here units have different sizes, mostly in range of 980 - 1,489 sqft SUPER area. This society offers apartments in the price range of Rs. 73.66 L - 1.09 Cr"
  },
  {
    id: "svanta-by-aakruthi",
    title: "Svanta by Aakruthi",
    subtitle: "Land in Soukya Road, Whitefield, Bangalore",
    priceConfigs: [
      { label: "Land", price: "₹97.5 L - 1.07 Cr" }
    ],
    nearby: ["The Polaris International School", "Winmore Academy, Whitefield", "MVJ Medical College And Research", "Soukya International Holistic Centre", "Bengaluru-Chennai Expressway"],
    builder: "Akkruthi Livespaces LLP",
    status: "New Launch · Completion in Dec, 2028",
    imageSrc: "/Svanta_by_Aakruthi.jpg",
    imageCount: "1/6",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE"],
    description: "This is your chance to invest in Land in Soukya Road. Check out Svanta by Aakruthi, one of the best offerings in the area that too within your price range. This is your chance to invest in Land in Soukya Road. Check out Svanta by Aakruthi, one of the best offerings in the area that too within your price range. Homebuyers can enjoy amenities such as Swimming Pool, Gymnasium and Club House in this project. Land will be available for possession from Dec, 2028",
    galleryImages: ['/Svanta_by_Aakruthi.jpg'],
    aboutText: "This is your chance to invest in Land in Soukya Road. Check out Svanta by Aakruthi, one of the best offerings in the area that too within your price range. This is your chance to invest in Land in Soukya Road. Check out Svanta by Aakruthi, one of the best offerings in the area that too within your price range. Homebuyers can enjoy amenities such as Swimming Pool, Gymnasium and Club House in this project. Land will be available for possession from Dec, 2028"
  },
  {
    id: "jagadhabi-premier-1",
    title: "Jagadhabi Premier 1",
    subtitle: "2, 3 BHK Apartment in Whitefield, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹87.72 L - 1.24 Cr" },
      { label: "3 BHK Apartment", price: "₹1.2 - 1.51 Cr" }
    ],
    nearby: ["VedaVihaan The Global School", "National Highway 648", "Nexus Whitefield Mall", "Manipal Hospital", "Vivanta Hotel"],
    builder: "Jagadhabi Constructions",
    status: "Under Construction · Completion in Aug, 2027",
    imageSrc: "/Jagadhabi_Premier_1.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Choose your dream home from the wide variety of 2,3 BHK apartments in Whitefield, available for sale in Jagadhabi Premier 1 . Prices of apartments in this project, vary between Rs. 87.72 L - 1.51 Cr. Jagadhabi Premier 1 's RERA registration number is PRM/KA/RERA/1251/446/PR/301024/007191. Here units have different sizes, mostly in range of 1,020 - 1,785 sqft SUPER area",
    galleryImages: ['/Jagadhabi_Premier_1.jpg'],
    aboutText: "Choose your dream home from the wide variety of 2,3 BHK apartments in Whitefield, available for sale in Jagadhabi Premier 1 . Prices of apartments in this project, vary between Rs. 87.72 L - 1.51 Cr. Jagadhabi Premier 1 's RERA registration number is PRM/KA/RERA/1251/446/PR/301024/007191. Here units have different sizes, mostly in range of 1,020 - 1,785 sqft SUPER area"
  },
  {
    id: "vmaks-laurel",
    title: "Vmaks Laurel",
    subtitle: "2, 3 BHK Apartment in Attibele, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹83.1 - 98.93 L" },
      { label: "3 BHK Apartment", price: "₹1.13 - 1.18 Cr" }
    ],
    nearby: ["Harvest Intl School", "National Highway 44", "Clover Greens Golf Course", "Athreya Hospital", "ChinnaReddy BizPark IT Park"],
    builder: "VMAKS Builders",
    status: "Under Construction · Completion in Dec, 2026",
    imageSrc: "/Vmaks_Laurel.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Vmaks Laurel, one of the known housing societies in Bangalore South, brings classic yet modern 2,3 BHK apartments in Attibele. Apartments in Vmaks Laurel have SUPER area ranging between 1,155 - 1,656 sqft. Vmaks Laurel 's RERA registration number is PRM/KA/RERA/1251/308/PR/171016/000889. Prices of apartments in this project, vary between Rs. 83.1 L - 1.18 Cr",
    galleryImages: ['/Vmaks_Laurel.jpg'],
    aboutText: "Vmaks Laurel, one of the known housing societies in Bangalore South, brings classic yet modern 2,3 BHK apartments in Attibele. Apartments in Vmaks Laurel have SUPER area ranging between 1,155 - 1,656 sqft. Vmaks Laurel 's RERA registration number is PRM/KA/RERA/1251/308/PR/171016/000889. Prices of apartments in this project, vary between Rs. 83.1 L - 1.18 Cr"
  },
  {
    id: "ars-zurich-phase-2",
    title: "ARS Zurich Phase 2",
    subtitle: "3 BHK Apartment in Sarjapur Road, Bangalore",
    priceConfigs: [
      { label: "3 BHK Apartment", price: "₹1.2 - 1.6 Cr" }
    ],
    nearby: ["Spandana Heart & Super Sp Hospital", "Natura Walk", "NH 948A", "Oakridge International School", "St Jeromes PU and Degree College"],
    builder: "ARS Infraa",
    status: "Under Construction · Completion in Aug, 2026",
    imageSrc: "/ARS_Zurich_Phase_2.jpg",
    imageCount: "1/5",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 3 BHK apartments in Sarjapur Road, are now available in ARS Zurich Phase 2 housing project. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/050225/007482 registration number. Apartments in this complex are available in price range of Rs. 1.2 - 1.6 Cr. Here units have different sizes, mostly in range of 1,565 - 2,084 sqft SUPER area",
    galleryImages: ['/ARS_Zurich_Phase_2.jpg'],
    aboutText: "Beautiful 3 BHK apartments in Sarjapur Road, are now available in ARS Zurich Phase 2 housing project. The housing society is RERA-registered with PRM/KA/RERA/1251/308/PR/050225/007482 registration number. Apartments in this complex are available in price range of Rs. 1.2 - 1.6 Cr. Here units have different sizes, mostly in range of 1,565 - 2,084 sqft SUPER area"
  },
  {
    id: "concorde-neo",
    title: "Concorde Neo",
    subtitle: "2, 3 BHK Apartment in Thanisandra, Bangalore",
    priceConfigs: [
      { label: "2 BHK Apartment", price: "₹1.2 - 1.32 Cr" },
      { label: "3 BHK Apartment", price: "₹1.58 - 1.64 Cr" }
    ],
    nearby: ["EuroSchool North Campus - CBSE School", "Presidency PU College", "Bhartiya Mall Of Bengaluru", "Sparsh Hospital Yelahanka", "Yelahanka Junction"],
    builder: "Concorde",
    status: "Under Construction · Completion in Oct, 2028",
    imageSrc: "/Concorde_Neo.jpg",
    imageCount: "1/9",
    tag: "NEW BOOKING",
    badges: ["RERA", "ZERO BROKERAGE", "3D"],
    description: "Beautiful 2,3 BHK apartments in Thanisandra, are now available in Concorde Neo housing project. Apartments in this complex are available in price range of Rs. 1.2 - 1.64 Cr. Here units have different sizes, mostly in range of 1,125 - 1,539 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/309/PR/270924/007088 is the RERA number",
    galleryImages: ['/Concorde_Neo.jpg'],
    aboutText: "Beautiful 2,3 BHK apartments in Thanisandra, are now available in Concorde Neo housing project. Apartments in this complex are available in price range of Rs. 1.2 - 1.64 Cr. Here units have different sizes, mostly in range of 1,125 - 1,539 sqft SUPER area. This society is RERA approved and PRM/KA/RERA/1251/309/PR/270924/007088 is the RERA number"
  }
];


