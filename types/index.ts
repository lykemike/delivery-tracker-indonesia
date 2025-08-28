export type {
  Language,
  LanguageContextType,
  LanguageSwitcherProps,
  NavbarProps,
} from "./language";

// Add other type exports here as your project grows
export interface PageProps {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
