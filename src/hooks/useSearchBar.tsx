// src/hooks/useSearchBar.ts

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import {
  setLoading,
  setResults,
  setError,
  clearResults,
} from "@/src/state/redux/slices/locationSlice";
import { useDebounce } from "@/src/hooks/useDebounce";
import { BarikoiPlace, Location } from "@/src/types/index";

export function useSearchBar() {
  const dispatch = useDispatch();
  const { query, results, isLoading, error } = useSelector(
    (state: RootState) => state.location,
  );

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 3) {
      dispatch(clearResults());
      return;
    }

    const fetchResults = async () => {
      dispatch(setLoading(true));
      try {
        const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;
        const res = await fetch(
          `https://barikoi.xyz/v1/api/search/autocomplete/${apiKey}/place?q=${encodeURIComponent(debouncedQuery)}`,
        );
        const data = await res.json();

        if (data?.places) {
          const mapped: Location[] = data.places.map((p: BarikoiPlace) => ({
            id: p.id,
            address: p.address,
            area: p.area ?? "",
            city: p.city ?? "",
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude),
          }));
          dispatch(setResults(mapped));
        } else {
          dispatch(setResults([]));
        }
      } catch (err) {
        dispatch(setError("Failed to fetch results"));
        console.error(err);
      }
    };

    fetchResults();
  }, [debouncedQuery, dispatch]);

  return { query, results, isLoading, error, dispatch };
}
