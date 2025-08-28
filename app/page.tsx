"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import { useLanguage } from "@/hooks/useLanguage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, TruckElectric } from "lucide-react";
import Footer from "@/components/layout/Footer";
import TrackingTab from "@/components/TrackingTab";
import RateCalculatorTab from "@/components/RateCalculatorTab";
import HomeMarquee from "@/components/HomeMarquee";
import tracking_data from "@/data/tracking.json";
import TrackingAwbListCard from "@/components/TrackingAwbListCard";

export default function Home() {
  const { selectedLanguage, handleLanguageChange } = useLanguage("EN");

  const handleCopy = (success: boolean) => {
    if (success) console.log("Text copied successfully!");
    else console.log("Failed to copy text");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <main className="flex-1">
        <HeroSection
          title="Track Your Delivery"
          subtitle="Fast, Reliable, Secure Delivery Service"
        />

        <section className="p-6 max-w-5xl mx-auto">
          <Tabs defaultValue="track" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="track" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Track Delivery
              </TabsTrigger>
              <TabsTrigger value="rate" className="flex items-center gap-2">
                <TruckElectric className="h-4 w-4" />
                Rate Calculator
              </TabsTrigger>
            </TabsList>
            <TabsContent value="track">
              <TrackingAwbListCard
                title="Dummy Data"
                trackingData={tracking_data as Record<string, unknown>}
                onCopy={handleCopy}
                className="mb-4"
              />
              <TrackingTab />
            </TabsContent>

            {/* RATE TAB */}
            <TabsContent value="rate">
              <RateCalculatorTab />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <HomeMarquee />
      <Footer />
    </div>
  );
}
