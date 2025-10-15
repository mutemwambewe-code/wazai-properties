
'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PropertySearchForm } from "@/components/property-search-form";
import { useState, useEffect } from "react";
import { getSiteContentFromStorage, defaultSiteContent } from "@/lib/data";
import type { SiteContent } from "@/lib/types";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner');
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    setContent(getSiteContentFromStorage());
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">
          {content.heroHeadline}
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow">
          {content.heroSubheadline}
        </p>
        <div className="max-w-4xl mx-auto">
          <PropertySearchForm />
        </div>
      </div>
    </section>
  );
}
