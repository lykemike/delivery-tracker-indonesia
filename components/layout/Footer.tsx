import { Heart, Sun } from "lucide-react";
import React from "react";

type FooterLink = { href: string; label: string };

const legalLinks: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function Footer({
  brand = "TrackID",
  madeBy = "Bang Mekk",
}: {
  brand?: string;
  madeBy?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="mt-auto bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-sm leading-relaxed text-gray-400">
          Fast, reliable, and secure delivery service trusted by thousands of
          customers worldwide. Your packages, our priority.
        </p>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-300 flex items-center gap-1">
            Designed & built by <span className="font-medium">Bang Mekk</span>
            <Sun className="h-4 w-4 text-yellow-500 animate-[pulse_3s_ease-in-out_infinite]" />
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              {legalLinks.map((link) => (
                <li key={link.href}>{link.label}</li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
