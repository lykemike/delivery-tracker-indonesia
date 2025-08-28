// components/ui/StatusBadge.tsx
import React from "react";

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
  size = "md",
}) => {
  // Function to get status badge color and size
  const getStatusBadgeStyle = (status: string, size: string) => {
    const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-6 h-6",
    };

    const baseClasses = `${
      sizeClasses[size as keyof typeof sizeClasses]
    } rounded-full shadow-lg relative`;

    switch (status.toLowerCase()) {
      case "delivered":
        return `${baseClasses} bg-green-500 shadow-green-500/50`;
      case "in transit":
        return `${baseClasses} bg-blue-500 shadow-blue-500/30`;
      case "on delivery":
        return `${baseClasses} bg-blue-600 shadow-blue-600/40`;
      case "pending pickup":
        return `${baseClasses} bg-yellow-500 shadow-yellow-500/40`;
      case "returned":
        return `${baseClasses} bg-red-500 shadow-red-500/40`;
      case "processing":
        return `${baseClasses} bg-purple-500 shadow-purple-500/30`;
      default:
        return `${baseClasses} bg-gray-500 shadow-gray-500/30`;
    }
  };

  // Function to render ping animation based on status
  const renderPingAnimation = (status: string) => {
    const statusLower = status.toLowerCase();

    // Base ping animation styles
    const createPingLayer = (
      bgColor: string,
      opacity: string,
      delay = "0s",
      scale = "1.4",
      key: string
    ) => (
      <div
        key={key}
        className={`absolute inset-0 ${bgColor} rounded-full animate-ping opacity-${opacity}`}
        style={{
          animationDuration: "2s",
          animationDelay: delay,
          animationIterationCount: "infinite",
          transform: `scale(${scale})`,
        }}
      />
    );

    const pingConfigs = {
      delivered: [
        createPingLayer("bg-green-400", "75", "0s", "1.5", "delivered-ping-1"),
        createPingLayer("bg-green-300", "50", "0.3s", "2", "delivered-ping-2"),
      ],
      "in transit": [
        createPingLayer("bg-blue-400", "60", "0s", "1.5", "transit-ping-1"),
        createPingLayer("bg-blue-300", "40", "0.4s", "2", "transit-ping-2"),
      ],
      "on delivery": [
        createPingLayer("bg-blue-500", "70", "0s", "1.4", "delivery-ping-1"),
        createPingLayer("bg-blue-300", "50", "0.3s", "1.8", "delivery-ping-2"),
      ],
      "pending pickup": [
        createPingLayer("bg-yellow-400", "60", "0s", "1.5", "pickup-ping-1"),
        createPingLayer("bg-yellow-300", "40", "0.5s", "2", "pickup-ping-2"),
      ],
      returned: [
        createPingLayer("bg-red-400", "65", "0s", "1.5", "returned-ping-1"),
        createPingLayer("bg-red-300", "45", "0.4s", "2", "returned-ping-2"),
      ],
      processing: [
        createPingLayer(
          "bg-purple-400",
          "60",
          "0s",
          "1.4",
          "processing-ping-1"
        ),
        createPingLayer(
          "bg-purple-300",
          "40",
          "0.3s",
          "1.8",
          "processing-ping-2"
        ),
      ],
    };

    return (
      <div className="absolute inset-0">
        {pingConfigs[statusLower as keyof typeof pingConfigs] || []}
      </div>
    );
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={getStatusBadgeStyle(status, size)}>
        {/* Inner dot for better visibility */}
        <div className="absolute inset-1 bg-white/20 rounded-full"></div>
      </div>
      {renderPingAnimation(status)}
    </div>
  );
};

export default StatusBadge;
