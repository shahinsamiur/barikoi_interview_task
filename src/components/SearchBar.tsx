"use client";

import { useRef, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import {
  setQuery,
  setSelectedLocation,
  clearResults,
} from "@/src/state/redux/slices/locationSlice";
import { useSearchBar } from "@/src/hooks/useSearchBar";
import "react-bkoi-gl/styles";

export default function SearchBar() {
  const { query, results, isLoading, error, dispatch } = useSearchBar();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={dropdownRef}
      className="absolute top-0 left-0 z-50 w-full px-3 pt-3 sm:px-4 md:px-6 lg:px-8"
    >
      {/* Search Input */}
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex items-center gap-2 rounded-3xl border border-border bg-background px-4 py-3 shadow-md">
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Search Barikoi Maps"
            className="flex-1 bg-transparent text-sm md:text-base text-text placeholder-muted outline-none"
          />

          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted border-t-transparent" />
          ) : (
            <IoMdSearch className="h-5 w-5 md:h-6 md:w-6 text-muted shrink-0" />
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 px-1 text-xs md:text-sm text-red-500">{error}</p>
        )}

        {/* Results Dropdown */}
        {results.length > 0 && (
          <ul className="mt-2 max-h-80 md:max-h-96 w-full overflow-y-auto rounded-xl border border-border bg-background shadow-lg">
            {results.map((place) => (
              <li
                key={place.id}
                onClick={() => dispatch(setSelectedLocation(place))}
                className="flex cursor-pointer items-start gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted/15 last:border-0"
              >
                <CiLocationOn className="mt-0.5 h-6 w-6 text-muted shrink-0" />

                <div className="min-w-0">
                  <p className="truncate text-sm md:text-base font-medium text-text">
                    {place.address}
                  </p>

                  <p className="truncate text-xs md:text-sm text-text/80">
                    {place.area}
                    {place.city ? `, ${place.city}` : ""}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
