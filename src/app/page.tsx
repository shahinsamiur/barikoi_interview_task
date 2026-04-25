"use client";

import { ContainerWraper } from "@/src/utils";
import SearchBar from "@/src/components/SearchBar";
import MapView from "@/src/components/MapView";
import LocationCard from "@/src/components/LocationCard";

export default function Page() {
  return (
    <ContainerWraper>
      <div className="min-h-screen flex flex-col gap-4 py-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Location Finder</h1>
          <p className="text-sm text-gray-500 mt-1">
            Search any place in Bangladesh and view it on the map
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Selected Location Info Card */}
        <LocationCard />

        {/* Map */}
        <div className="w-full h-125 rounded-xl overflow-hidden">
          <MapView />
        </div>
      </div>
    </ContainerWraper>
  );
}
