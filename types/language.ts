export type Language = "EN" | "ID";

export interface LanguageContextType {
  selectedLanguage: Language;
  handleLanguageChange: (lang: Language) => void;
}

export interface LanguageSwitcherProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export interface NavbarProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}
