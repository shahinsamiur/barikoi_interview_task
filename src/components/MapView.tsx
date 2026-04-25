"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/state/redux/store";
import { useEffect, useRef } from "react";
import Map, { Marker, NavigationControl, MapRef } from "react-bkoi-gl";
import "react-bkoi-gl/styles";

const DEFAULT_CENTER = { longitude: 90.3938, latitude: 23.8223 };
const DEFAULT_ZOOM = 14;

export default function MapView() {
  const selected = useSelector(
    (state: RootState) => state.location.selectedLocation,
  );
  const mapRef = useRef<MapRef>(null);

  const center = selected
    ? { longitude: selected.longitude, latitude: selected.latitude }
    : DEFAULT_CENTER;

  useEffect(() => {
    if (selected && mapRef.current) {
      mapRef.current.flyTo({
        center: [selected.longitude, selected.latitude],
        zoom: 15,
        duration: 1200,
      });
    }
  }, [selected]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-md">
      <Map
        ref={mapRef}
        mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${process.env.NEXT_PUBLIC_BARIKOI_API_KEY}`}
        initialViewState={{
          longitude: center.longitude,
          latitude: center.latitude,
          zoom: DEFAULT_ZOOM,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="bottom-right" />

        {selected && (
          <Marker
            longitude={selected.longitude}
            latitude={selected.latitude}
            anchor="top-left"
          >
            <div className="flex flex-col items-center">
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg shadow mb-1 max-w-37.5 truncate">
                {selected.address}
              </div>
              <svg
                className="w-6 h-6 text-blue-600 drop-shadow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}
