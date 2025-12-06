"use client";
import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, Hospital, Plane, GraduationCap, Landmark, HelpCircle } from "lucide-react";
import { ErrorState } from "@/components/error-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useErrorToast } from "@/hooks/use-error-toast";
import { useDashboardMapData } from "../hooks/useDashboardData";
import { useTranslation } from "react-i18next";
import { MAP_STYLE } from "../constants/ui";

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
  const { data: mapData, isLoading, isError, refetch } = useDashboardMapData();
  const { t } = useTranslation("dashboard");
  const INITIAL_VIEW_STATE = {
    latitude: mapData?.data?.center[1],
    longitude: mapData?.data?.center[0],
    zoom: mapData?.data?.zoom,
    bearing: 0,
    pitch: 0,
  };

  useErrorToast(isError, {
    message: t("dashboard:errors.mapTitle", {
      defaultValue: "Não foi possível carregar o mapa.",
    }),
    description: t("dashboard:errors.mapDescription", {
      defaultValue: "Atualize a página ou tente novamente.",
    }),
    toastId: "dashboard-map-error",
  });

  if (isError) {
    return (
      <ErrorState
        title={t("dashboard:errors.mapTitle", {
          defaultValue: "Não foi possível carregar o mapa.",
        })}
        description={t("dashboard:errors.mapDescription", {
          defaultValue: "Atualize a página ou tente novamente.",
        })}
        onRetry={refetch}
        className="bg-gradient-slate border-soft h-[470px] w-full border"
      />
    );
  }

  return (
    <div className="via-[#36446b98 ]/60 to-[#36446b98 ]/10 h-[470px] w-full rounded-3xl border border-white/5 bg-linear-to-br from-[#36446b98] shadow-lg">
      {/* Header Overlay */}
      <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold text-white drop-shadow-md">{t("map.title")}</h2>
        <div className="pointer-events-auto flex gap-3">
          <Select defaultValue="all-loc">
            <SelectTrigger className="h-9 w-[140px] rounded-full border-white/10 bg-[#0b0f17] text-xs text-gray-300">
              <SelectValue placeholder={t("map.locationsPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0b0f17] text-gray-300">
              <SelectItem value="all-loc">{t("map.locations.all")}</SelectItem>
              <SelectItem value="recife">{t("map.locations.recife")}</SelectItem>
              <SelectItem value="olinda">{t("map.locations.olinda")}</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-types">
            <SelectTrigger className="h-9 w-[140px] rounded-full border-white/10 bg-[#0b0f17] text-xs text-gray-300">
              <SelectValue placeholder={t("map.typesPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0b0f17] text-gray-300">
              <SelectItem value="all-types">{t("map.types.all")}</SelectItem>
              <SelectItem value="tourism">{t("map.types.tourism")}</SelectItem>
              <SelectItem value="health">{t("map.types.health")}</SelectItem>
              <SelectItem value="education">{t("map.types.education")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map */}

      {isLoading ? (
        <div className="mx-auto h-[78%] w-[95%] animate-pulse rounded-2xl bg-white/5" />
      ) : (
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          style={{
            width: "auto",
            height: "78%",
            borderRadius: "16px",
            maxWidth: "95%",
            margin: "0 auto",
          }}
          mapStyle={MAP_STYLE}
          attributionControl={false}
        >
          <NavigationControl position="bottom-right" />

          {mapData?.data?.locations.map((loc) => (
            <Marker key={loc.id} latitude={loc.coordinates[1]} longitude={loc.coordinates[0]}>
              <div
                className="transform cursor-pointer rounded-full p-2 shadow-lg transition-transform hover:scale-110"
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
