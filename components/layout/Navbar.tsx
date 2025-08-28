"use client";

import React from "react";
import { Package } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import type { NavbarProps } from "@/types/language";

export default function Navbar({
  selectedLanguage,
  onLanguageChange,
}: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2">
            <Package
              className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600"
              aria-hidden="true"
            />
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-900">
              TrackID
            </h1>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </nav>
  );
}
