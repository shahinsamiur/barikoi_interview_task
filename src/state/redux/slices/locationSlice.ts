import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationState, Location, POIPlace } from "@/src/types/index";
const initialState: LocationState = {
  query: "",
  activeCategory: null,
  results: [],
  poiResults: [],
  poiLoading: false,
  mapCenter: { latitude: 23.8223, longitude: 90.3938 },
  selectedLocation: null,
  isLoading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<POICategory>) {
      state.activeCategory = action.payload;
      state.poiResults = [];
    },
    setPOIResults(state, action: PayloadAction<POIPlace[]>) {
      state.poiResults = action.payload;
      state.poiLoading = false;
    },
    setPOILoading(state, action: PayloadAction<boolean>) {
      state.poiLoading = action.payload;
    },
    setMapCenter(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) {
      state.mapCenter = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setResults(state, action: PayloadAction<Location[]>) {
      state.results = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedLocation(state, action: PayloadAction<Location>) {
      state.selectedLocation = action.payload;
      state.results = [];
      state.query = action.payload.address;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearResults(state) {
      state.results = [];
    },
  },
});
export type POICategory =
  | "restaurant"
  | "hotel"
  | "tourism"
  | "museum"
  | "transit"
  | "pharmacy"
  | "atm"
  | null;
export const {
  setQuery,
  setResults,
  setSelectedLocation,
  setLoading,
  setError,
  clearResults,
  setActiveCategory,
  setPOIResults,
  setPOILoading,
  setMapCenter,
} = locationSlice.actions;
export default locationSlice.reducer;
