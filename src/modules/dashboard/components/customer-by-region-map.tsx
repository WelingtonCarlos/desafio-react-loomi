"use client";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  MapPin,
  Hospital,
  Plane,
  GraduationCap,
  Landmark,
  HelpCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { mapLocations } from "../data/mock-data"
import {
  useDashboardData,
  useDashboardMapData,
} from "../hooks/useDashboardData";

// Map style for dark theme (CartoDB Dark Matter)
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const getIcon = (iconName: string) => {
  const props = { className: "w-4 h-4 text-white" };
  switch (iconName) {
    case "map-pin":
      return <MapPin {...props} />;
    case "hospital":
      return <Hospital {...props} />;
    case "plane":
      return <Plane {...props} />;
    case "graduation-cap":
      return <GraduationCap {...props} />;
    case "landmark":
      return <Landmark {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};

export function CustomerByRegionMap() {
  const { data: mapData, isLoading } = useDashboardMapData();
  const INITIAL_VIEW_STATE = {
    latitude: mapData?.data?.center[1],
    longitude: mapData?.data?.center[0],
    zoom: mapData?.data?.zoom,
    bearing: 0,
    pitch: 0,
  };

  return (
    <div className="w-full h-[470px] rounded-3xl bg-linear-to-br from-[#36446b98] via-[#36446b98 ]/60 to-[#36446b98 ]/10 border border-white/5 shadow-lg">
      {/* Header Overlay */}
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white drop-shadow-md">
          Mapa de clientes por região
        </h2>
        <div className="flex gap-3 pointer-events-auto">
          <Select defaultValue="all-loc">
            <SelectTrigger className="w-[140px] bg-[#0b0f17] border-white/10 text-gray-300 h-9 rounded-full text-xs">
              <SelectValue placeholder="Todos os locais" />
            </SelectTrigger>
            <SelectContent className="bg-[#0b0f17] border-white/10 text-gray-300">
              <SelectItem value="all-loc">Todos os locais</SelectItem>
              <SelectItem value="recife">Recife</SelectItem>
              <SelectItem value="olinda">Olinda</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-types">
            <SelectTrigger className="w-[140px] bg-[#0b0f17] border-white/10 text-gray-300 h-9 rounded-full text-xs">
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent className="bg-[#0b0f17] border-white/10 text-gray-300">
              <SelectItem value="all-types">Todos os tipos</SelectItem>
              <SelectItem value="tourism">Turismo</SelectItem>
              <SelectItem value="health">Saúde</SelectItem>
              <SelectItem value="education">Educação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map */}
      
      {isLoading ? (
        <div className="h-[78%] w-[95%] mx-auto animate-pulse rounded-2xl bg-white/5" />
      ) : (
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: "auto", height: "78%", borderRadius: "16px", maxWidth: "95%", margin: "0 auto" }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />

        {mapData?.data?.locations.map((loc) => (
          <Marker key={loc.id} latitude={loc.coordinates[1]} longitude={loc.coordinates[0]}>
            <div
              className="p-2 rounded-full shadow-lg transform transition-transform hover:scale-110 cursor-pointer"
              style={{ backgroundColor: loc.color }}
              title={loc.name}
            >
              {getIcon(loc.icon)}
            </div>
          </Marker>
        ))}
      </Map>
      )}
    </div>
  );
}
