"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "@/components/CopyButton";
import { Database } from "lucide-react";

type TrackingDb = Record<string, unknown>;

interface Props {
  title?: string;
  trackingData: TrackingDb | null | undefined;
  onCopy?: (success: boolean) => void;
  className?: string;
}

const TrackingAwbListCard: React.FC<Props> = ({
  title = "Dummy data",
  trackingData,
  onCopy,
  className,
}) => {
  const total = Object.keys(trackingData || {}).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="h-4 w-4" />
            {title}
          </CardTitle>
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
            {total} items
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {!trackingData || total === 0 ? (
          <div className="flex items-center justify-center rounded-lg border bg-muted/30 p-8 text-sm text-muted-foreground">
            No tracking data available.
          </div>
        ) : (
          <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Object.keys(trackingData)
              .sort()
              .map((awb) => (
                <div key={awb} className="group relative">
                  <pre
                    className="rounded-lg border bg-amber-50 p-3 text-xs md:text-[13px] leading-relaxed overflow-x-auto font-mono"
                    title={awb}
                  >
                    {awb}
                  </pre>

                  <div className="absolute top-2 right-2 opacity-100 transition-opacity">
                    <CopyButton
                      text={awb}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-md border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50"
                      onCopy={onCopy}
                      aria-label={`Copy ${awb}`}
                    />
                  </div>
                </div>
              ))}
          </section>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackingAwbListCard;
