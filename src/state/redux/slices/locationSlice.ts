import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
  id: number;
  address: string;
  area: string;
  city: string;
  latitude: number;
  longitude: number;
}

interface LocationState {
  query: string;
  results: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  query: "",
  results: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
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

export const {
  setQuery,
  setResults,
  setSelectedLocation,
  setLoading,
  setError,
  clearResults,
} = locationSlice.actions;

export default locationSlice.reducer;
