"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import {
  setActiveCategory,
  setPOIResults,
  setPOILoading,
  POICategory,
} from "@/src/state/redux/slices/locationSlice";
import { POIPlace } from "@/src/types/index";
const CATEGORIES: { label: string; value: POICategory; emoji: string }[] = [
  { label: "Restaurants", value: "restaurant", emoji: "🍽️" },
  { label: "Hotels", value: "hotel", emoji: "🏨" },
  { label: "Things to do", value: "tourism", emoji: "🎯" },
  { label: "Museums", value: "museum", emoji: "🏛️" },
  { label: "Transit", value: "transit", emoji: "🚌" },
  { label: "Pharmacies", value: "pharmacy", emoji: "💊" },
  { label: "ATMs", value: "atm", emoji: "🏧" },
];

export default function CategoryBar() {
  const dispatch = useDispatch();
  const { activeCategory, mapCenter, poiLoading } = useSelector(
    (state: RootState) => state.location,
  );

  const handleCategory = async (value: POICategory) => {
    if (activeCategory === value) {
      dispatch(setActiveCategory(null));
      return;
    }

    dispatch(setActiveCategory(value));
    dispatch(setPOILoading(true));

    try {
      const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;
      const { latitude, longitude } = mapCenter;

      const res = await fetch(
        `https://barikoi.xyz/v1/api/search/nearby/${apiKey}/place?longitude=${longitude}&latitude=${latitude}&distance=500&type=${value}&limit=20`,
      );
      const data = await res.json();

      if (data?.places) {
        const mapped: POIPlace[] = data.places.map(
          (p: {
            id: number;
            name?: string;
            address: string;
            latitude: string;
            longitude: string;
            ucode?: string;
          }) => ({
            id: p.id,
            name: p.name ?? p.address,
            address: p.address,
            latitude: parseFloat(p.latitude),
            longitude: parseFloat(p.longitude),
            ucode: p.ucode,
          }),
        );
        dispatch(setPOIResults(mapped));
      } else {
        dispatch(setPOIResults([]));
      }
    } catch {
      dispatch(setPOILoading(false));
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleCategory(cat.value)}
          disabled={poiLoading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all
            ${
              activeCategory === cat.value
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
            }
            ${poiLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
          {poiLoading && activeCategory === cat.value && (
            <svg
              className="w-3 h-3 animate-spin ml-1"
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
        </button>
      ))}
    </div>
  );
}
