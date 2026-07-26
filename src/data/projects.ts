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
  }
];
