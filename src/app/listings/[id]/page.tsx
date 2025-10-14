
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyByIdFromStorage } from "@/lib/data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import Link from 'next/link';
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Bed, Bath, Milestone, MapPin, Building, Check, FileDown, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPlaceholder } from "@/components/map-placeholder";
import type { Property } from "@/lib/types";
import jsPDF from 'jspdf';

const formatPrice = (price: Property['price']) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
  }).format(price.amount);
};


export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
        const prop = getPropertyByIdFromStorage(params.id);
        if (prop) {
            setProperty(prop);
        } else {
            notFound();
        }
    }
  }, [params.id]);
  
  const handleDownloadBrochure = () => {
    if (!property) return;

    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text(property.title, 14, 22);

    doc.setFontSize(16);
    doc.setTextColor(100);
    doc.text(`Location: ${property.location}`, 14, 32);

    doc.setFontSize(18);
    doc.setTextColor(45, 63, 52);
    doc.text(formatPrice(property.price), 14, 42);

    doc.setFontSize(12);
    doc.setTextColor(0);
    
    const descriptionLines = doc.splitTextToSize(property.description, 180);
    doc.text(descriptionLines, 14, 60);
    
    let yPos = 60 + (descriptionLines.length * 7) + 10;

    doc.setFontSize(14);
    doc.text('Amenities:', 14, yPos);
    yPos += 7;
    doc.setFontSize(12);
    property.amenities.forEach(amenity => {
        doc.text(`- ${amenity}`, 14, yPos);
        yPos += 7;
    });

    doc.save(`${property.title.replace(/\s+/g, '_')}_Brochure.pdf`);
  };


  if (!property) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  const isCommercial = property.type === 'Commercial';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listings
            </Button>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{property.title}</h1>
            <p className="flex items-center text-muted-foreground mt-2">
              <MapPin className="w-5 h-5 mr-2" />
              {property.location}
            </p>
          </div>

          <Carousel className="w-full mb-8">
            <CarouselContent>
              {property.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image src={img.url} alt={img.description} fill className="object-cover" data-ai-hint={img.hint}/>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-headline font-semibold mb-4">Property Details</h2>
              <div className="max-w-none text-foreground/90">
                <p>{property.description}</p>
              </div>

              {isCommercial && property.investmentPotential && (
                <div className="mt-6">
                    <h3 className="text-xl font-headline font-semibold mb-2">Investment Potential</h3>
                    <p className="text-muted-foreground">{property.investmentPotential}</p>
                </div>
              )}

              <Separator className="my-8" />
              
              <h2 className="text-2xl font-headline font-semibold mb-4">Amenities</h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(amenity => (
                    <li key={amenity} className="flex items-center">
                        <Check className="w-5 h-5 mr-3 text-primary" />
                        <span>{amenity}</span>
                    </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <Badge variant={isCommercial ? "secondary" : "default"} className={isCommercial ? "bg-accent text-accent-foreground" : "bg-primary"}>
                        {property.type}
                        </Badge>
                        <Badge variant="outline" className="ml-2">{property.status}</Badge>
                    </div>
                    <span className="text-3xl font-bold text-primary">{formatPrice(property.price)}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    {isCommercial ? (
                        <>
                            <div className="flex items-center"><Milestone className="w-4 h-4 mr-2"/> Size: {property.size.value} {property.size.unit}</div>
                            {property.zoning && <div className="flex items-center"><Building className="w-4 h-4 mr-2"/> Zoning: {property.zoning}</div>}
                        </>
                    ) : (
                        <>
                           {property.bedrooms && <div className="flex items-center"><Bed className="w-4 h-4 mr-2"/> {property.bedrooms} Beds</div>}
                           {property.bathrooms && <div className="flex items-center"><Bath className="w-4 h-4 mr-2"/> {property.bathrooms} Baths</div>}
                            <div className="flex items-center"><Milestone className="w-4 h-4 mr-2"/> Size: {property.size.value} {property.size.unit}</div>
                        </>
                    )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                    <Button className="w-full h-12" asChild>
                        <a href={`https://wa.me/${property.agent.phone.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="w-5 h-5 mr-2"/> Contact Agent
                        </a>
                    </Button>
                    <Button variant="secondary" className="w-full h-12" onClick={handleDownloadBrochure}>
                        <FileDown className="w-5 h-5 mr-2" /> Download Brochure
                    </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />

          <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Location</h2>
            <MapPlaceholder />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
