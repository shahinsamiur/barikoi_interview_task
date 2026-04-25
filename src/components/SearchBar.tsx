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
      className="absolute w-full max-w-md z-50 pt-4 px-4 left-[5%]"
      ref={dropdownRef}
    >
      <div className="flex items-center bg-background border border-border rounded-3xl shadow-md px-4 py-3 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search Barikoi Maps"
          className="flex-1 outline-none text-sm text-text placeholder-muted bg-transparent"
        />
        <IoMdSearch className="size-6 text-muted shrink-0" />
        {isLoading && (
          <div className="w-4 h-4 animate-spin border-2 border-muted border-t-transparent rounded-full" />
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500 px-1">{error}</p>}

      {results.length > 0 && (
        <ul className="relative z-50 mt-1 w-full bg-background border border-border rounded-xl shadow-lg max-h-140 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.id}
              onClick={() => dispatch(setSelectedLocation(place))}
              className="flex items-start gap-3 px-4 py-3 hover:bg-muted/15 cursor-pointer transition-colors border-b border-border last:border-0"
            >
              <CiLocationOn className="size-7 mt-0.5 text-muted shrink-0" />
              <div>
                <p className="text-sm font-medium text-text">{place.address}</p>
                <p className="text-xs text-text/80">
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
