"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import couriers from "../data/couriers.json";
import Image from "next/image";
import Link from "next/link";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = React.useState(src || "/placeholder.svg");
  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={120}
      height={48}
      onError={() => setImgSrc("/placeholder.svg")}
      className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
    />
  );
}

export default function HomeMarquee() {
  return (
    <Marquee autoFill className="mt-56">
      {couriers.map((item, index) => {
        const src = item.fullimg ? `/full/${item.fullimg}` : "/placeholder.svg"; // files in /public/full/
        return (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 mx-8 flex items-center justify-center h-20"
          >
            <Link href={item.website} target="_blank" rel="noopener noreferrer">
              <LogoImage src={src} alt={`${item.name} logo`} />
            </Link>
          </div>
        );
      })}
    </Marquee>
  );
}
