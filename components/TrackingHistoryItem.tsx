// components/ui/TrackingHistoryItem.tsx
import React from "react";
import StatusIcon from "@/components/StatusIcon";

interface TrackingHistoryItemProps {
  status: string;
  location: string;
  date: string;
  isLatest?: boolean;
}

const TrackingHistoryItem: React.FC<TrackingHistoryItemProps> = ({
  status,
  location,
  date,
  isLatest = false,
}) => {
  const isDelivered = status.toLowerCase().includes("delivered");

  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDelivered
              ? "bg-green-100 animate-pulse"
              : isLatest
              ? "bg-blue-100"
              : "bg-gray-100"
          }`}
        >
          <StatusIcon
            status={status}
            className={
              isDelivered
                ? "text-green-600"
                : isLatest
                ? "text-blue-600"
                : "text-gray-600"
            }
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isDelivered
              ? "text-green-900"
              : isLatest
              ? "text-blue-900"
              : "text-gray-900"
          }`}
        >
          {isDelivered ? `✅ ${status}` : status}
        </p>
        <p
          className={`text-sm ${isLatest ? "text-blue-600" : "text-gray-500"}`}
        >
          {location}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(date).toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default TrackingHistoryItem;
