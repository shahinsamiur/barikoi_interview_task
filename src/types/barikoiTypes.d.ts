export interface BarikoiPlace {
  id: number;
  address: string;
  area?: string;
  city?: string;
  latitude: string;
  longitude: string;
}

export interface Location {
  id: number;
  address: string;
  area: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface LocationState {
  query: string;
  activeCategory: POICategory;
  poiResults: POIPlace[];
  poiLoading: boolean;
  mapCenter: { latitude: number; longitude: number };
  poiResults: POIPlace[];
  results: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
}
export interface POIPlace {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  ucode?: string;
}
