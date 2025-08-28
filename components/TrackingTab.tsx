"use client";

import React, { useState } from "react";
import { Loader2, Search, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TrackingHistoryItem from "@/components/TrackingHistoryItem";
import tracking_data from "@/data/tracking.json";
import courier_data from "@/data/couriers.json";
import { TrackingResultsCard } from "./TrackingReults";

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

interface TrackingDatabase {
  [awb: string]: TrackingData;
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

const TrackingTab = () => {
  const [awbNumber, setAwbNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<{
    data: TrackingData;
    courier: Courier | null;
    awb: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  // Type assertions for imported JSON data
  const trackingDatabase = tracking_data as TrackingDatabase;
  const couriers = courier_data as Courier[];

  // Function to detect courier by AWB pattern
  const detectCourier = (awb: string): Courier | null => {
    const upperAwb = awb.toUpperCase().trim();

    for (const courier of couriers) {
      try {
        const regex = new RegExp(courier.awbPattern);
        if (regex.test(upperAwb)) {
          return courier;
        }
      } catch (error) {
        console.error(`Error with pattern for ${courier.name}:`, error);
      }
    }

    return null;
  };

  // Enhanced courier detection with name matching
  const detectCourierEnhanced = (
    awb: string,
    courierName?: string
  ): Courier | null => {
    // First try pattern matching
    let detectedCourier = detectCourier(awb);

    // If no pattern match and we have courier name from data, try name matching
    if (!detectedCourier && courierName) {
      detectedCourier =
        couriers.find(
          (c) =>
            c.name.toLowerCase().includes(courierName.toLowerCase()) ||
            c.code.toLowerCase() === courierName.toLowerCase() ||
            courierName.toLowerCase().includes(c.name.toLowerCase()) ||
            courierName.toLowerCase().includes(c.code.toLowerCase())
        ) || null;
    }

    return detectedCourier;
  };

  const handleSearch = async (): Promise<void> => {
    if (!awbNumber.trim()) {
      setError("Please enter an AWB number");
      return;
    }

    setIsLoading(true);
    setError("");
    setSearchResult(null);

    try {
      // Clear previous results only when starting a new search
      setError("");
      setSearchResult(null);

      // Mock loading delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const trimmedAwb = awbNumber.trim();

      // Check if AWB exists in database
      const trackingData = trackingDatabase[trimmedAwb];

      if (trackingData) {
        // Try to detect courier
        const detectedCourier = detectCourierEnhanced(
          trimmedAwb,
          trackingData.courier
        );

        setSearchResult({
          data: trackingData,
          courier: detectedCourier,
          awb: trimmedAwb,
        });
      } else {
        // Try to detect courier even if no data found
        const detectedCourier = detectCourier(trimmedAwb);

        if (detectedCourier) {
          setError(
            `This appears to be a ${detectedCourier.name} shipment, but no tracking data is available for AWB: ${trimmedAwb}`
          );
        } else {
          setError(
            `AWB number "${trimmedAwb}" not found. Please check your AWB number and try again.`
          );
        }
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAwbNumber(value);
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Track Your Package
          </CardTitle>
          <CardDescription>
            Enter your AWB (Airway Bill) number to track your shipment
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter AWB number (e.g., JNE1234567890, JNT1112223334)"
                className="text-s placeholder:text-s"
                value={awbNumber}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            <Button
              className="px-8 hover:cursor-pointer"
              onClick={handleSearch}
              disabled={isLoading || !awbNumber.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  {awbNumber.trim() ? "Search" : "Enter AWB"}
                </>
              )}
            </Button>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">
              Detecting courier and searching for your package...
            </p>
          </CardContent>
        </Card>
      )}

      {searchResult && <TrackingResultsCard result={searchResult} />}
    </div>
  );
};

export default TrackingTab;
