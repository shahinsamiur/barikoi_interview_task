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
  results: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
}
