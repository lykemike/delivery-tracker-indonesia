"use client";

import React, { useState } from "react";
import { Calculator, Package, ShipIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CitySelect, { City } from "@/components/CitySelect";
import ShippingResults from "@/components/ShippingResults";
import SHIPPING_DATA from "@/data/shippingRates.json";
import CITIES_DATA from "@/data/cities.json";

interface CalculatedRate {
  courier: string;
  service: string;
  name: string;
  totalCost: number;
  eta: {
    id: string;
    en: string;
  };
  isBestPrice: boolean;
}

const RateCalculatorTab = () => {
  const [originCityId, setOriginCityId] = useState<string>("");
  const [destinationCityId, setDestinationCityId] = useState<string>("");
  const [weight, setWeight] = useState<string>("1");
  const [calculatedRates, setCalculatedRates] = useState<CalculatedRate[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Helper functions
  const getCityById = (cityId: string): City | undefined => {
    return CITIES_DATA.find((city) => city.id === cityId);
  };

  const getProvinceMultiplier = (provinceName: string): number => {
    return (
      SHIPPING_DATA.provinceMultipliers.find((p) => p.name === provinceName)
        ?.multiplier || 1.0
    );
  };

  const calculateRates = async (): Promise<void> => {
    if (!originCityId || !destinationCityId || !weight) return;

    const originCity = getCityById(originCityId);
    const destinationCity = getCityById(destinationCityId);

    if (!originCity || !destinationCity) return;

    setIsCalculating(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const weightNum = parseFloat(weight);
      const rates: CalculatedRate[] = [];
      const destMultiplier = getProvinceMultiplier(destinationCity.province);

      // Calculate rates for all couriers and services
      Object.entries(SHIPPING_DATA.couriers).forEach(
        ([courierName, services]) => {
          services.forEach((service) => {
            const baseCost = service.baseRate + weightNum * service.perKg;
            const totalCost = Math.round(baseCost * destMultiplier);

            rates.push({
              courier: courierName,
              service: service.service,
              name: service.name,
              totalCost,
              eta: service.eta,
              isBestPrice: false,
            });
          });
        }
      );

      // Sort by price and mark the best price
      rates.sort((a, b) => a.totalCost - b.totalCost);
      if (rates.length > 0) {
        rates[0].isBestPrice = true;
      }

      setCalculatedRates(rates);
    } catch (error) {
      console.error("Error calculating rates:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const canCalculate =
    originCityId && destinationCityId && weight && parseFloat(weight) > 0;

  return (
    <div className="space-y-6">
      {/* Calculator Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShipIcon className="h-5 w-5" />
            Calculate Shipping Rate
          </CardTitle>
          <CardDescription>Instantly compare courier rates</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Rate Calculator Form - Custom grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Origin City - Takes 2 columns on lg screens */}
            <div className="space-y-2 md:col-span-1 lg:col-span-2">
              <Label htmlFor="origin">Origin City</Label>
              <CitySelect
                value={originCityId}
                onValueChange={setOriginCityId}
                placeholder="Select origin city"
                disabled={isCalculating}
              />
            </div>

            {/* Destination City - Takes 2 columns on lg screens */}
            <div className="space-y-2 md:col-span-1 lg:col-span-2">
              <Label htmlFor="destination">Destination City</Label>
              <CitySelect
                value={destinationCityId}
                onValueChange={setDestinationCityId}
                placeholder="Select destination city"
                disabled={isCalculating}
              />
            </div>

            {/* Weight Input - Takes 1 column on lg screens */}
            <div className="space-y-2 md:col-span-1 lg:col-span-1">
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight"
                  className="pl-10"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="0.1"
                  step="0.1"
                  disabled={isCalculating}
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <Button
            className="w-full"
            disabled={!canCalculate || isCalculating}
            onClick={calculateRates}
          >
            {isCalculating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Shipping Rates
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section - Now using separate component */}
      <ShippingResults calculatedRates={calculatedRates} />
    </div>
  );
};

export default RateCalculatorTab;
