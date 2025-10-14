
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
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
            <h1 className="text-3xl font-headline font-bold mb-4">All Properties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                    </SelectContent>
                </Select>
                {/* Search button could trigger filtering, but here it's live-updating */}
                <Button className="h-12 w-full" disabled>
                  <Search className="mr-2 h-4 w-4"/> Search
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
