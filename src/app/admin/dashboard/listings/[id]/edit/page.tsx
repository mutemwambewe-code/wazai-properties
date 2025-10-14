

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPropertiesFromStorage, savePropertiesToStorage, getPropertyByIdFromStorage } from '@/lib/data';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const [property, setProperty] = useState<Property | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [amenitiesInput, setAmenitiesInput] = useState('');

  const updateAndSaveProperty = useCallback((updatedProperty: Property) => {
    setProperty(updatedProperty);
    const storedProperties = getPropertiesFromStorage();
    const updatedProperties = storedProperties.map((p: Property) => 
        p.id === updatedProperty.id ? updatedProperty : p
    );
    savePropertiesToStorage(updatedProperties);
  }, []);

  useEffect(() => {
    if (typeof id === 'string') {
      const prop = getPropertyByIdFromStorage(id);
      if (prop) {
        setProperty(prop);
        setImagePreviews(prop.images.map(img => img.url));
        setAmenitiesInput(prop.amenities.join(', '));
      } else {
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
    let finalValue: string | number = value;

    if (name === 'bedrooms' || name === 'bathrooms') {
      finalValue = value === '' ? 0 : Number(value);
    }
    
    updateAndSaveProperty({ ...property, [name]: finalValue });
  };
  
  const handleSelectChange = (name: keyof Property, value: string) => {
    if (!property) return;
    updateAndSaveProperty({ ...property, [name]: value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const { name, value } = e.target;
    updateAndSaveProperty({
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
     updateAndSaveProperty({
        ...property,
        size: {
            ...property.size,
            [name]: name === 'value' ? Number(value) : value,
        }
    });
  }

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const newAmenitiesInput = e.target.value;
    setAmenitiesInput(newAmenitiesInput);
    const amenities = newAmenitiesInput.split(',').map(a => a.trim()).filter(Boolean);
    updateAndSaveProperty({ ...property, amenities });
  }

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!property) return;
    const { name, value } = e.target;
    updateAndSaveProperty({
        ...property,
        coordinates: {
            ...property.coordinates,
            [name]: Number(value),
        }
    });
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && property) {
      const files = Array.from(e.target.files);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          const newImage = {
            id: `img-${Date.now()}-${Math.random()}`,
            url: dataUrl,
            description: file.name,
            hint: 'uploaded image'
          };
          
          if (property) {
            const updatedImages = [...property.images, newImage];
            updateAndSaveProperty({ ...property, images: updatedImages });
            setImagePreviews(previews => [...previews, dataUrl]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    if (!property) return;

    const updatedImages = property.images?.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    updateAndSaveProperty({ ...property, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
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
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Mine">Mine</SelectItem>
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

          {property.type === 'Residential' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" value={property.bedrooms || ''} onChange={handleInputChange} placeholder="e.g. 4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" value={property.bathrooms || ''} onChange={handleInputChange} placeholder="e.g. 5" />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input id="amenities" value={amenitiesInput} onChange={handleAmenitiesChange} placeholder="e.g. Swimming pool, Gym, Wi-Fi" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input id="lat" name="lat" type="number" value={property.coordinates.lat} onChange={handleCoordinatesChange} placeholder="e.g. -15.4167" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input id="lng" name="lng" type="number" value={property.coordinates.lng} onChange={handleCoordinatesChange} placeholder="e.g. 28.2833" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={property.description} onChange={handleInputChange} rows={5} />
          </div>

          <div className="space-y-4">
            <Label>Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((src, index) => (
                    <div key={index} className="relative group aspect-video">
                        <Image src={src} alt={`Preview ${index + 1}`} fill className="object-cover rounded-md" />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
                        <Upload className="w-8 h-8 mb-2" />
                        <p className="mb-2 text-sm text-center">Click to upload or drag & drop</p>
                    </div>
                    <Input id="image-upload" type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
                </Label>
            </div>
            {imagePreviews.length === 0 && (
              <p className="text-sm text-muted-foreground">No images uploaded. A default placeholder will be used if you save without images.</p>
            )}
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
