"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";

export default function LocationCard() {
  const selected = useSelector(
    (state: RootState) => state.location.selectedLocation,
  );

  if (!selected) return null;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 px-5 py-4 w-full max-w-xl">
      <div className="flex items-center gap-2 mb-2">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
        </svg>
        <h2 className="text-sm font-semibold text-gray-800 truncate">
          {selected.address}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div>
          <span className="font-medium text-gray-600">Area: </span>
          {selected.area || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-600">City: </span>
          {selected.city || "—"}
        </div>
        <div>
          <span className="font-medium text-gray-600">Lat: </span>
          {selected.latitude}
        </div>
        <div>
          <span className="font-medium text-gray-600">Lng: </span>
          {selected.longitude}
        </div>
      </div>
    </div>
  );
}
