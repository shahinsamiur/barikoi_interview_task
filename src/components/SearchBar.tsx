"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import {
  setQuery,
  setResults,
  setSelectedLocation,
  setLoading,
  setError,
  clearResults,
} from "@/src/state/redux/slices/locationSlice";
import type { Location } from "@/src/state/redux/slices/locationSlice";
import { useDebounce } from "@/src/hooks/useDebounce";
export default function SearchBar() {
  const dispatch = useDispatch();
  const { query, results, isLoading, error } = useSelector(
    (state: RootState) => state.location,
  );

  const debouncedQuery = useDebounce(query, 400);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          const mapped: Location[] = data.places.map((p: any) => ({
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
      } catch (err: unknown) {
        dispatch(setError("Failed to fetch results"));
        console.log(err);
      }
    };

    fetchResults();
  }, [debouncedQuery, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        dispatch(clearResults());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="relative w-full max-w-xl" ref={dropdownRef}>
      {/* Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-md px-4 py-3 gap-2">
        <svg
          className="w-5 h-5 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search for a location..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
      </div>

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-500 px-1">{error}</p>}

      {/* Dropdown Results */}
      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.id}
              onClick={() => dispatch(setSelectedLocation(place))}
              className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <svg
                className="w-4 h-4 mt-0.5 text-blue-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {place.address}
                </p>
                <p className="text-xs text-gray-500">
                  {place.area}
                  {place.city ? `, ${place.city}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
