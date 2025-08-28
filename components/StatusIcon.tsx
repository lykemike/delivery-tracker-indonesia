// components/ui/StatusIcon.tsx
import React from "react";
import { Package, Truck, MapPin, Clock, LucideIcon } from "lucide-react";

interface StatusIconProps {
  status: string;
  className?: string;
  size?: number;
}

const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  className = "",
  size = 5,
}) => {
  // Function to get appropriate icon for status
  const getStatusIcon = (status: string): LucideIcon => {
    const statusLower = status.toLowerCase();

    if (
      statusLower.includes("received") ||
      statusLower.includes("created") ||
      statusLower.includes("pickup")
    ) {
      return Package;
    }
    if (statusLower.includes("departed") || statusLower.includes("transit")) {
      return Truck;
    }
    if (statusLower.includes("arrived") || statusLower.includes("hub")) {
      return MapPin;
    }
    if (statusLower.includes("delivered")) {
      return Package;
    }
    if (statusLower.includes("out for delivery")) {
      return Truck;
    }

    return Clock;
  };

  const IconComponent = getStatusIcon(status);

  return <IconComponent className={`h-${size} w-${size} ${className}`} />;
};

export default StatusIcon;
