import * as React from "react";
import { Clock, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator"; // not used
import courierData from "@/data/couriers.json";
import Image from "next/image";
// --- Types ---------------------------------------------------------------
interface CalculatedRate {
  courier: string; // e.g. "JNE" (code or name)
  service: string;
  name: string;
  totalCost: number;
  eta: { id: string; en: string };
  isBestPrice: boolean;
}

interface ShippingResultsProps {
  calculatedRates: CalculatedRate[];
}

type CourierMeta = {
  id: string;
  name: string;
  code: string;
  awbPattern?: string;
  color?: string;
  phone?: string;
  email?: string;
  img?: string; // e.g. "jne.png"
};

// --- Utils ---------------------------------------------------------------
const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Build a fast lookup map once
const COURIER_MAP: Record<string, CourierMeta> = Array.isArray(courierData)
  ? (courierData as CourierMeta[]).reduce((acc, c) => {
      acc[c.code?.toUpperCase()] = c;
      acc[c.name?.toUpperCase()] = c;
      return acc;
    }, {} as Record<string, CourierMeta>)
  : {};

function getCourierMeta(key: string): CourierMeta | undefined {
  return COURIER_MAP[key?.toUpperCase()];
}

// --- Root: Shipping Results ---------------------------------------------
const ShippingResults: React.FC<ShippingResultsProps> = ({
  calculatedRates,
}) => {
  if (!calculatedRates || calculatedRates.length === 0) return null;

  // Group by courier
  const grouped = calculatedRates.reduce((acc, rate) => {
    (acc[rate.courier] ||= []).push(rate);
    return acc;
  }, {} as Record<string, CalculatedRate[]>);

  const courierCount = Object.keys(grouped).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Shipping Quotes{" "}
          <span className="text-gray-500 font-normal">
            ({calculatedRates.length} options · {courierCount} courier
            {courierCount > 1 ? "s" : ""})
          </span>
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([courier, rates]) => (
          <CourierCard key={courier} courierKey={courier} rates={rates} />
        ))}
      </div>

      <DisclaimerNote />
    </div>
  );
};

// --- Courier Card --------------------------------------------------------
const CourierCard: React.FC<{
  courierKey: string;
  rates: CalculatedRate[];
}> = ({ courierKey, rates }) => {
  // Optional: sort by price asc, best price first
  const sorted = [...rates].sort((a, b) => {
    if (a.isBestPrice && !b.isBestPrice) return -1;
    if (!a.isBestPrice && b.isBestPrice) return 1;
    return a.totalCost - b.totalCost;
  });

  const meta = getCourierMeta(courierKey);
  const displayName = meta?.name ?? courierKey;
  const logoSrc = meta?.img ? `/${meta.img}` : undefined; // put logos in public/images/couriers/

  return (
    <Card className="h-full overflow-hidden flex flex-col shadow-sm border border-gray-100">
      <CardHeader className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 py-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gray-100 grid place-items-center overflow-hidden">
            {logoSrc ? (
              // If using Next.js <Image>, replace with:
              // <Image src={logoSrc} alt={displayName} width={24} height={24} className="object-contain" />
              <Image
                src={logoSrc} // string | StaticImport
                alt={displayName}
                width={24} // required unless using `fill`
                height={24}
                className="h-6 w-6 object-contain"
                sizes="24px" // fixed size; helps CLS/LCP
                priority={false} // set true only if it's above-the-fold & critical
              />
            ) : (
              <span className="text-indigo-700 font-semibold">
                {displayName.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-gray-900">
              {displayName}
            </CardTitle>
            <p className="text-xs text-gray-500">
              {sorted.length} {sorted.length === 1 ? "service" : "services"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        {sorted.length === 0 ? (
          <div className="px-5 py-10 text-sm text-gray-500 flex flex-col items-center gap-2">
            <Package className="h-5 w-5" />
            <span>No services available.</span>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-gray-100">
            {sorted.map((rate, idx) => (
              <RateItem
                key={`${rate.courier}-${rate.service}-${idx}`}
                rate={rate}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// --- Rate Item -----------------------------------------------------------
const RateItem: React.FC<{ rate: CalculatedRate }> = ({ rate }) => {
  const isBest = rate.isBestPrice;
  return (
    <li
      role="listitem"
      className={cn(
        "group relative px-5 py-4 transition-colors",
        "hover:bg-gray-50 focus-within:bg-gray-50",
        isBest && "bg-green-50/70"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* Service name */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {rate.name}
            </h3>
            {isBest && (
              <Badge className="bg-green-600 hover:bg-green-600 text-white/95 rounded-full px-2.5 py-0.5 text-[10px] tracking-wide">
                ⭐ Best Price
              </Badge>
            )}
          </div>

          {/* Meta row */}
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span className="leading-none">{rate.eta.en}</span>
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <div
            className={cn(
              "text-base font-bold leading-none",
              isBest ? "text-green-700" : "text-indigo-700"
            )}
          >
            {formatIDR(rate.totalCost)}
          </div>
          <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            incl. all fees
          </div>
        </div>
      </div>
    </li>
  );
};

// --- Disclaimer ----------------------------------------------------------
const DisclaimerNote: React.FC = () => (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <p className="text-sm text-yellow-800 leading-relaxed">
      <strong>Note:</strong> These are estimated quotes based on standard rates.
      Final pricing may vary based on actual dimensions, additional services,
      and current promotions.
    </p>
  </div>
);

export default ShippingResults;
