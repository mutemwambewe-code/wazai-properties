import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// In a real app, this would be a client component fetching and filtering data
export default function ListingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-8">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
            <h1 className="text-3xl font-headline font-bold mb-4">All Properties</h1>
            {/* A simplified search bar for the listings page */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <Input placeholder="Search listings..." className="lg:col-span-2 h-12"/>
                <Select>
                    <SelectTrigger className="h-12"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                </Select>
                <Button className="h-12 w-full"><Search className="mr-2 h-4 w-4"/> Search</Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
