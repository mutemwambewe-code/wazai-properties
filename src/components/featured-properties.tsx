
'use client';

import { useState, useEffect } from "react";
import type { Property } from "@/lib/types";
import { getPropertiesFromStorage } from "@/lib/data";
import { PropertyCard } from "./property-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(getPropertiesFromStorage());
  }, []);

  const featuredResidential = properties.filter(p => p.type === 'Residential').slice(0, 3);
  const featuredCommercial = properties.filter(p => p.type === 'Commercial').slice(0, 3);
  const featuredLand = properties.filter(p => p.type === 'Land').slice(0, 3);
  const featuredMines = properties.filter(p => p.type === 'Mine').slice(0, 3);

  return (
    <section id="featured" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Properties</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in Zambia.
          </p>
        </div>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="land">Land</TabsTrigger>
            <TabsTrigger value="mine">Mines</TabsTrigger>
          </TabsList>
          <TabsContent value="residential">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResidential.length > 0 ? featuredResidential.map(property => (
                <PropertyCard key={property.id} property={property} />
              )) : <p className="col-span-3 text-center text-muted-foreground">No featured residential properties.</p>}
            </div>
          </TabsContent>
          <TabsContent value="commercial">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCommercial.length > 0 ? featuredCommercial.map(property => (
                <PropertyCard key={property.id} property={property} />
              )) : <p className="col-span-3 text-center text-muted-foreground">No featured commercial properties.</p>}
            </div>
          </TabsContent>
           <TabsContent value="land">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLand.length > 0 ? featuredLand.map(property => (
                <PropertyCard key={property.id} property={property} />
              )) : <p className="col-span-3 text-center text-muted-foreground">No featured land properties.</p>}
            </div>
          </TabsContent>
           <TabsContent value="mine">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMines.length > 0 ? featuredMines.map(property => (
                <PropertyCard key={property.id} property={property} />
              )) : <p className="col-span-3 text-center text-muted-foreground">No featured mines.</p>}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/listings">
                    View All Properties <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
