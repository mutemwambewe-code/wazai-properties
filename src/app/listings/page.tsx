
'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getPropertiesFromStorage } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { Property } from "@/lib/types";


export default function ListingsPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');

  useEffect(() => {
    const properties = getPropertiesFromStorage();
    setAllProperties(properties);
    setFilteredProperties(properties);
  }, []);

  useEffect(() => {
    let result = allProperties;

    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType !== 'all') {
      result = result.filter(p => p.type.toLowerCase() === propertyType);
    }
    
    setFilteredProperties(result);

  }, [searchTerm, propertyType, allProperties]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md text-center">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Find Your Dream Property or Investment</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Whether you&apos;re looking for a new home or your next big investment, your journey starts here. Use the filters below to begin.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end max-w-4xl mx-auto">
                <Input 
                  placeholder="Search listings..." 
                  className="lg:col-span-2 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="mine">Mine</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="h-12 w-full">
                  <Search className="mr-2 h-4 w-4"/> Search
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.length > 0 ? filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          )) : (
            <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-semibold">No Properties Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search filters to find what you&apos;re looking for.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
