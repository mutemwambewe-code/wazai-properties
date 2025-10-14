
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertyByIdFromStorage, savePropertiesToStorage } from '@/lib/data';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      const prop = getPropertyByIdFromStorage(id);
      if (prop) {
        setProperty(prop);
      } else {
        // Handle case where property is not found
        toast({
            variant: "destructive",
            title: "Property not found",
            description: "Could not find the requested property.",
        });
        router.push('/admin/dashboard/listings');
      }
    }
  }, [id, router, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!property) return;
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };
  
  const handleSelectChange = (name: keyof Property, value: string) => {
    if (!property) return;
    setProperty({ ...property, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const { name, value } = e.target;
    setProperty({
        ...property,
        price: {
            ...property.price,
            [name]: name === 'amount' ? Number(value) : value,
        }
    });
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const { name, value } = e.target;
     setProperty({
        ...property,
        size: {
            ...property.size,
            [name]: name === 'value' ? Number(value) : value,
        }
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;

    const storedProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    const updatedProperties = storedProperties.map((p: Property) => 
        p.id === property.id ? property : p
    );
    savePropertiesToStorage(updatedProperties);
    
    toast({
        title: "Property Updated",
        description: `Successfully saved changes for "${property.title}".`,
    });
    router.push('/admin/dashboard/listings');
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="/admin/dashboard/listings"><ArrowLeft/></Link>
            </Button>
            <div>
                <CardTitle>Edit Property</CardTitle>
                <CardDescription>Make changes to &quot;{property.title}&quot;</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={property.title} onChange={handleInputChange} />
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
                <Input id="price-amount" name="amount" type="number" value={property.price.amount} onChange={handlePriceChange} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="price-currency">Price Currency</Label>
                 <Select name="currency" value={property.price.currency} onValueChange={(value) => handleSelectChange('price', { ...property.price, currency: value as 'USD' | 'ZMW' })}>
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
            <Input id="location" name="location" value={property.location} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={property.description} onChange={handleInputChange} rows={5} />
          </div>

          <div className="flex justify-end gap-2">
             <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
             <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
