
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { savePropertiesToStorage, getPropertiesFromStorage } from '@/lib/data';
import type { Property, PropertySizeUnit } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const HECTARES_IN_ACRE = 0.404686;
const SQM_IN_HECTARE = 10000;
const SQM_IN_ACRE = 4046.86;

export default function NewPropertyPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [property, setProperty] = useState<Partial<Property>>({
    title: '',
    type: 'Residential',
    status: 'For Sale',
    price: { amount: 0, currency: 'USD' },
    location: '',
    size: { value: 0, unit: 'sqm' },
    bedrooms: 0,
    bathrooms: 0,
    description: '',
    amenities: [],
    images: [],
  });
  
  const [sizeValue, setSizeValue] = useState(0);
  const [sizeUnit, setSizeUnit] = useState<PropertySizeUnit>('sqm');
  const [amenitiesInput, setAmenitiesInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSelectChange = (name: keyof Property, value: string) => {
    setProperty({ ...property, [name]: value });
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty({
        ...property,
        price: {
            ...property.price,
            [name]: name === 'amount' ? Number(value) : value,
        } as Property['price']
    });
  };

  const handleSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setSizeValue(value);
    updatePropertySize(value, sizeUnit);
  };
  
  const handleSizeUnitChange = (unit: PropertySizeUnit) => {
    setSizeUnit(unit);
    updatePropertySize(sizeValue, unit);
  };

  const updatePropertySize = (value: number, unit: PropertySizeUnit) => {
    setProperty({
      ...property,
      size: { value, unit },
    });
  };

  const convertSize = (value: number, from: PropertySizeUnit, to: PropertySizeUnit): number => {
    if (from === to) return value;
    
    let valueInSqm: number;
    switch(from) {
        case 'hectares': valueInSqm = value * SQM_IN_HECTARE; break;
        case 'acres': valueInSqm = value * SQM_IN_ACRE; break;
        case 'plot': // Assuming plot is an average size, e.g. 1000 sqm for simplicity. Not standardized.
        case 'sqm':
        default: valueInSqm = value;
    }

    let result: number;
    switch(to) {
        case 'hectares': result = valueInSqm / SQM_IN_HECTARE; break;
        case 'acres': result = valueInSqm / SQM_IN_ACRE; break;
        case 'plot':
        case 'sqm':
        default: result = valueInSqm;
    }
    
    // round to 4 decimal places
    return Math.round(result * 10000) / 10000;
  };
  
  const displayedSizeValue = (targetUnit: PropertySizeUnit) => {
    if (!property.size) return 0;
    return convertSize(property.size.value, property.size.unit, targetUnit);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty: Property = {
        id: `prop-${Date.now()}`,
        ...property,
        amenities: amenitiesInput.split(',').map(a => a.trim()).filter(Boolean),
        images: property.images?.length ? property.images : [{ id: 'default', url: `https://picsum.photos/seed/${Date.now()}/600/400`, description: 'Newly added property', hint: 'building exterior' }],
        agent: { name: 'Admin User', phone: '+260977123456', email: 'info@zambia.homes' },
        coordinates: { lat: -15.4167, lng: 28.2833 }
    } as Property;

    if(!newProperty.title || !newProperty.location) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out the title and location.",
        });
        return;
    }

    const storedProperties = getPropertiesFromStorage();
    const updatedProperties = [...storedProperties, newProperty];
    savePropertiesToStorage(updatedProperties);
    
    toast({
        title: "Property Added",
        description: `Successfully added "${newProperty.title}".`,
    });
    router.push('/admin/dashboard/listings');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/admin/dashboard/listings"><ArrowLeft/></Link>
            </Button>
            <div>
                <CardTitle>Add New Property</CardTitle>
                <CardDescription>Fill in the details for the new listing.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={property.title} onChange={handleInputChange} required/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" value={property.type} onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                 <Select name="status" value={property.status} onValueChange={(value) => handleSelectChange('status', value)}>
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="price-amount">Price Amount</Label>
                <Input id="price-amount" name="amount" type="number" value={property.price?.amount} onChange={handlePriceChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="price-currency">Price Currency</Label>
                 <Select name="currency" value={property.price?.currency} onValueChange={(value) => handleSelectChange('price', { ...property.price, currency: value as 'USD' | 'ZMW' })}>
                    <SelectTrigger id="price-currency"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="ZMW">ZMW</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={property.location} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" value={sizeValue} onChange={handleSizeInputChange} />
              <Select value={sizeUnit} onValueChange={handleSizeUnitChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sqm">Square Meters</SelectItem>
                  <SelectItem value="hectares">Hectares</SelectItem>
                  <SelectItem value="acres">Acres</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Conversions: {displayedSizeValue('sqm')} sqm | {displayedSizeValue('hectares')} ha | {displayedSizeValue('acres')} acres
            </p>
          </div>
          
          {property.type === 'Residential' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" value={property.bedrooms} onChange={(e) => setProperty({...property, bedrooms: Number(e.target.value)})} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" value={property.bathrooms} onChange={(e) => setProperty({...property, bathrooms: Number(e.target.value)})} />
                </div>
            </div>
          )}

          {property.type === 'Commercial' && (
            <div className="space-y-2">
                <Label htmlFor="zoning">Zoning</Label>
                <Input id="zoning" name="zoning" value={property.zoning} onChange={handleInputChange} />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input id="amenities" value={amenitiesInput} onChange={(e) => setAmenitiesInput(e.target.value)} placeholder="e.g. Swimming pool, Gym, Wi-Fi" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={property.description} onChange={handleInputChange} rows={5} />
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            <div className="border rounded-md p-4 text-center text-muted-foreground">
                <p>Image upload functionality coming soon.</p>
                <p className="text-sm">A default placeholder image will be used for now.</p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
             <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
             <Button type="submit">Add Property</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
