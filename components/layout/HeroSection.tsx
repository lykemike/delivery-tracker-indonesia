import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({
  title,
  subtitle,
  imageSrc = "/grab.jpg",
  imageAlt = "Delivery Hero Banner",
}: HeroSectionProps) {
  return (
    <section className="relative bg-green-600 py-24 sm:py-32 md:py-48 lg:py-64 flex items-center justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />

      {/* Optional: Add overlay content */}
      {(title || subtitle) && (
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          {title && (
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl sm:text-2xl md:text-3xl font-medium drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />
    </section>
  );
}
