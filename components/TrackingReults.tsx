import {
  Clock,
  HandPlatter,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TrackingHistoryItem from "./TrackingHistoryItem";

interface TrackingHistoryItem {
  date: string;
  location: string;
  status: string;
}

interface TrackingData {
  service: string;
  courier: string;
  status: string;
  history: TrackingHistoryItem[];
}

interface Courier {
  id: string;
  name: string;
  code: string;
  awbPattern: string;
  color: string;
  phone: string;
  email: string;
}

export const TrackingResultsCard = ({
  result,
}: {
  result: {
    data: TrackingData;
    courier: Courier | null;
    awb: string;
  };
}) => {
  const { data, courier, awb } = result;
  const statusText = data.status ?? "";
  const statusLower = statusText.toLowerCase();
  const latest = data.history?.at(-1);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Tracking Results</span>
          <div className="flex items-center gap-2">
            <StatusBadge status={statusText} size="md" />
            <span className="text-sm md:text-base font-semibold text-gray-700">
              {statusText}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Top Info Grid */}
        <InfoGrid
          items={[
            {
              icon: <Package className="h-5 w-5 text-blue-600" />,
              label: "Airwaybill Number",
              value: awb,
            },
            {
              icon: <Truck className="h-5 w-5 text-green-600" />,
              label: "Courier",
              value: courier?.name || data.courier,
            },
            {
              icon: <HandPlatter className="h-5 w-5 text-orange-600" />,
              label: "Service",
              value: data.service,
            },
            {
              icon: <Clock className="h-5 w-5 text-orange-600" />,
              label: "Current Status",
              value: statusText,
            },
          ]}
        />

        {/* Latest Update / Delivered Banner */}
        {latest && (
          <LatestUpdate
            delivered={statusLower === "delivered"}
            location={latest.location}
            status={latest.status}
          />
        )}

        {/* History */}
        <section aria-labelledby="history-heading">
          <h3 id="history-heading" className="font-semibold mb-4">
            Tracking History
          </h3>
          <div className="space-y-4">
            {[...(data.history || [])]
              .slice()
              .reverse()
              .map((item, idx) => (
                <TrackingHistoryItem
                  key={`${item.date}-${idx}`}
                  status={item.status}
                  location={item.location}
                  date={item.date}
                  isLatest={idx === 0}
                />
              ))}
          </div>
        </section>

        {/* Contact */}
        <ContactBlock courier={courier} />
      </CardContent>
    </Card>
  );
};

/* ============== */
/* Helper Blocks  */
/* ============== */

const InfoGrid = ({
  items,
}: {
  items: { icon: React.ReactNode; label: string; value?: string }[];
}) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    {items.map(({ icon, label, value }, i) => (
      <div key={i} className="flex items-center gap-3">
        {icon}
        <div className="min-w-0">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-gray-600 truncate">{value || "-"}</p>
        </div>
      </div>
    ))}
  </div>
);

const LatestUpdate = ({
  delivered,
  location,
  status,
}: {
  delivered: boolean;
  location: string;
  status: string;
}) => {
  const tone = delivered
    ? {
        wrap: "bg-green-50 border-green-200",
        icon: "text-green-600",
        title: "text-green-900",
        sub: "text-green-700",
        meta: "text-green-600",
        titleText: "🎉 Package Delivered!",
      }
    : {
        wrap: "bg-blue-50 border-blue-200",
        icon: "text-blue-600",
        title: "text-blue-900",
        sub: "text-blue-700",
        meta: "text-blue-600",
        titleText: "Latest Update",
      };

  return (
    <div className={`p-4 rounded-lg border ${tone.wrap}`}>
      <div className="flex items-start gap-3">
        <MapPin className={`h-6 w-6 ${tone.icon} mt-0.5`} />
        <div className="min-w-0">
          <p className={`font-semibold ${tone.title}`}>{tone.titleText}</p>
          <p className={`${tone.sub}`}>{location}</p>
          <p className={`text-sm ${tone.meta}`}>{status}</p>
        </div>
      </div>
    </div>
  );
};

const ContactBlock = ({
  courier,
}: {
  courier: { name: string; phone?: string; email?: string } | null;
}) => (
  <div className="rounded-lg bg-gray-50 p-4">
    <h3 className="font-semibold mb-2">Need Help?</h3>
    {courier ? (
      <>
        <p className="mb-3 text-sm text-gray-600">
          Contact {courier.name} customer service:
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {courier.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{courier.phone}</span>
            </div>
          )}
          {courier.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{courier.email}</span>
            </div>
          )}
        </div>
      </>
    ) : (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="h-4 w-4" />
        <span>Contact your courier for assistance</span>
      </div>
    )}
  </div>
);
