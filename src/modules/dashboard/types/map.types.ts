export type MapCoordinate = [number, number];

export type MapCategory = "tourism" | "sports" | "transport" | "education" | "heritage" | string;

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: MapCoordinate;
  category: MapCategory;
  address: string;
  icon: string;
  color: string;
}

export interface MapData {
  data: {
    center: MapCoordinate;
    zoom: number;
    locations: MapLocation[];
  };
}
