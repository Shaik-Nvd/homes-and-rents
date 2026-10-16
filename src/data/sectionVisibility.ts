export interface SectionVisibilityMap {
  overview?: boolean;
  constructionStatus?: boolean;
  startingPrice?: boolean;
  downloadBrochure?: boolean;
  unitPricing?: boolean;
  floorPlans?: boolean;
  topFacilities?: boolean;
  about?: boolean;
  neighborhoodMap?: boolean;
  keyLandmarks?: boolean;
  whyConsider?: boolean;
}

export const SECTION_DEFINITIONS = [
  { id: 'whyConsider', label: 'Why Consider (Builder & Highlights)', desc: 'Why consider developer highlights, selling points & developer badge' },
  { id: 'overview', label: 'Overview', desc: 'Project area, unit sizes, launch date, avg sq.ft price' },
  { id: 'startingPrice', label: 'Starting Price', desc: 'Starting price headline, amount and badges (e.g. ₹2.54 - 3.88 Cr)' },
  { id: 'downloadBrochure', label: 'Download Brochure Button', desc: 'Download Brochure action button on cards & detail pages' },
  { id: 'constructionStatus', label: 'Construction Status', desc: 'Under Construction / Ready to Move card' },
  { id: 'unitPricing', label: 'Unit Floor Plans & Pricing', desc: 'BHK pricing breakdown & estimated cost list' },
  { id: 'floorPlans', label: 'Floor Plan & Pricing', desc: 'Architectural blueprint preview & WhatsApp plan delivery' },
  { id: 'topFacilities', label: 'Top Facilities (Amenities)', desc: 'Gym, pool, security, clubhouse, 35+ amenities' },
  { id: 'about', label: 'About Project', desc: 'Detailed builder narrative & property description' },
  { id: 'neighborhoodMap', label: 'Explore Neighborhood', desc: 'Map view & directions' },
  { id: 'keyLandmarks', label: 'Key Landmarks', desc: 'Nearby metro, stations, hospitals, schools & distances' },
] as const;

export const DEFAULT_SECTION_VISIBILITY: SectionVisibilityMap = {
  whyConsider: true,
  overview: true,
  constructionStatus: true,
  startingPrice: true,
  downloadBrochure: true,
  unitPricing: true,
  floorPlans: true,
  topFacilities: true,
  about: true,
  neighborhoodMap: true,
  keyLandmarks: true,
};

export const DEFAULT_WHY_CONSIDER_POINTS = [
  "Easily find Zen with yoga spaces and vast green covers.",
  "Vastu compliant spacious homes with modern amenities.",
  "Excellent connectivity to major IT hubs and transit.",
  "High-end co-working spaces within the resident community.",
  "360-degree ventilation for abundant natural light and air.",
  "24/7 security with 100% power backup available."
];

export interface WhyConsiderConfig {
  title?: string;
  points: string[];
}

export const getWhyConsiderData = (projectId: string = 'global'): WhyConsiderConfig => {
  try {
    const specificKey = `admin_why_consider_${projectId}`;
    const specificSaved = localStorage.getItem(specificKey);
    if (specificSaved) return JSON.parse(specificSaved);

    const globalSaved = localStorage.getItem('admin_why_consider_global');
    if (globalSaved) return JSON.parse(globalSaved);

    return {
      title: '',
      points: DEFAULT_WHY_CONSIDER_POINTS
    };
  } catch {
    return {
      title: '',
      points: DEFAULT_WHY_CONSIDER_POINTS
    };
  }
};

export const setWhyConsiderData = (projectId: string, config: WhyConsiderConfig) => {
  try {
    const key = `admin_why_consider_${projectId}`;
    localStorage.setItem(key, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving why consider data:', err);
  }
};

export const getSectionVisibility = (projectId: string = 'global'): SectionVisibilityMap => {
  try {
    const specificKey = `admin_section_visibility_${projectId}`;
    const specificSaved = localStorage.getItem(specificKey);
    if (specificSaved) return JSON.parse(specificSaved);

    const globalSaved = localStorage.getItem('admin_section_visibility_global');
    if (globalSaved) return JSON.parse(globalSaved);

    return DEFAULT_SECTION_VISIBILITY;
  } catch {
    return DEFAULT_SECTION_VISIBILITY;
  }
};

export const setSectionVisibility = (projectId: string, visibility: SectionVisibilityMap) => {
  try {
    const key = `admin_section_visibility_${projectId}`;
    localStorage.setItem(key, JSON.stringify(visibility));
  } catch (err) {
    console.error('Error saving section visibility:', err);
  }
};

