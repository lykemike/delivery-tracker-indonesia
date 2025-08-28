"use client";

import React from "react";
import type { LanguageSwitcherProps, Language } from "@/types/language";

export default function LanguageSwitcher({
  selectedLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const languages: { code: Language; label: string }[] = [
    { code: "EN", label: "EN" },
    // { code: "ID", label: "ID" },
  ];

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-50 rounded-lg p-1">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
            selectedLanguage === code
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:text-blue-600 hover:bg-white"
          }`}
          aria-label={`Switch to ${label}`}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
