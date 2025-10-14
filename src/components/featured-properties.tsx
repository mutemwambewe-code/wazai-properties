import { properties } from "@/lib/data";
import { PropertyCard } from "./property-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProperties() {
  const featuredResidential = properties.filter(p => p.type === 'Residential').slice(0, 3);
  const featuredCommercial = properties.filter(p => p.type === 'Commercial').slice(0, 3);

  return (
    <section id="featured" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Properties</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in Zambia.
          </p>
        </div>

        <Tabs defaultValue="residential" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>
          <TabsContent value="residential">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResidential.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="commercial">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCommercial.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
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
