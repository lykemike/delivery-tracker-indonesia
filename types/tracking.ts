// types/tracking.ts
export type IconName =
  | "Package"
  | "Truck"
  | "MapPin"
  | "Clock"
  | "HandPlatter"
  | "Eye"
  | "Search"
  | "Mail"
  | "Phone"
  | "Calculator"
  | "Badge";

export interface TrackingHistoryItem {
  status: string;
  location: string;
  date: string;
  icon: IconName;
}

export interface TrackingData {
  awb: string;
  courier: string;
  service: string;
  estimatedDelivery: string;
  destination: string;
  status: string;
  history: TrackingHistoryItem[];
}

export interface TrackingHistoryItem {
  date: string;
  location: string;
  status: string;
}

export interface TrackingData {
  courier: string;
  status: string;
  history: TrackingHistoryItem[];
}

export interface TrackingDatabase {
  [awb: string]: TrackingData;
}

export interface Courier {
  id: string;
  name: string;
  code: string;
  awbPattern: string;
  color: string;
  phone: string;
  email: string;
  src: string;
  fullimg: string;
  link: string;
}
