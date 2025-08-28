"use client";

import { useState, useCallback } from "react";
import type { Language, LanguageContextType } from "@/types/language";

export const useLanguage = (
  initialLanguage: Language = "EN"
): LanguageContextType => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>(initialLanguage);

  const handleLanguageChange = useCallback((lang: Language): void => {
    setSelectedLanguage(lang);

    // Here you would typically implement your language switching logic
    // For example: localStorage, API calls, context updates, etc.
    console.log(`Language switched to: ${lang}`);

    // Optional: Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  }, []);

  return {
    selectedLanguage,
    handleLanguageChange,
  };
};
