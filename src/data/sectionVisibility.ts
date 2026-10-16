export interface SectionVisibilityMap {
  overview?: boolean;
  constructionStatus?: boolean;
  startingPrice?: boolean;
  unitPricing?: boolean;
  floorPlans?: boolean;
  topFacilities?: boolean;
  about?: boolean;
  neighborhoodMap?: boolean;
  keyLandmarks?: boolean;
}

export const SECTION_DEFINITIONS = [
  { id: 'overview', label: 'Overview', desc: 'Project area, unit sizes, launch date, avg sq.ft price' },
  { id: 'constructionStatus', label: 'Construction Status', desc: 'Under Construction / Ready to Move card' },
  { id: 'startingPrice', label: 'Starting Price', desc: 'Starting budget price card & brochure download' },
  { id: 'unitPricing', label: 'Unit Floor Plans & Pricing', desc: 'BHK pricing breakdown & estimated cost list' },
  { id: 'floorPlans', label: 'Floor Plan & Pricing', desc: 'Architectural blueprint preview & WhatsApp plan delivery' },
  { id: 'topFacilities', label: 'Top Facilities (Amenities)', desc: 'Gym, pool, security, clubhouse, 35+ amenities' },
  { id: 'about', label: 'About Project', desc: 'Detailed builder narrative & property description' },
  { id: 'neighborhoodMap', label: 'Explore Neighborhood', desc: 'Map view & directions' },
  { id: 'keyLandmarks', label: 'Key Landmarks', desc: 'Nearby metro, stations, hospitals, schools & distances' },
] as const;

export const DEFAULT_SECTION_VISIBILITY: SectionVisibilityMap = {
  overview: true,
  constructionStatus: true,
  startingPrice: true,
  unitPricing: true,
  floorPlans: true,
  topFacilities: true,
  about: true,
  neighborhoodMap: true,
  keyLandmarks: true,
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
