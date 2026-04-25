"use client";

import SearchBar from "@/src/components/SearchBar";
import MapView from "@/src/components/MapView";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col  w-screen ">
      <SearchBar />
      <div className="w-full h-screen rounded-xl overflow-hidden">
        <MapView />
      </div>
    </div>
  );
}
