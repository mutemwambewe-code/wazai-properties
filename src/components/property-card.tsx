
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Property } from "@/lib/types";
import { Bed, Bath, Milestone, MapPin, LandPlot, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

const formatPrice = (price: Property['price']) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price.amount);
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const isResidential = property.type === 'Residential';
  const isLand = property.type === 'Land';
  const isMine = property.type === 'Mine';
  const isCommercial = property.type === 'Commercial';

  const hasImages = property.images && property.images.length > 0;
  const firstImage = hasImages 
    ? property.images[0] 
    : { url: `https://picsum.photos/seed/${property.id}/600/400`, description: 'Placeholder image', hint: 'property exterior' };
  
  const getBadgeClass = () => {
    switch(property.type) {
      case 'Commercial':
        return "bg-accent text-accent-foreground";
      case 'Land':
        return "bg-green-600 text-white";
      case 'Mine':
        return "bg-gray-500 text-white";
      default: // Residential
        return "bg-primary";
    }
  }

  return (
    <Card className={cn("overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 group", className)}>
      <CardHeader className="p-0">
        <Link href={`/listings/${property.id}`} className="block relative h-56 w-full">
          <Image
            src={firstImage.url}
            alt={firstImage.description}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={firstImage.hint}
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={getBadgeClass()}>
              {property.type}
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">{property.status}</Badge>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-headline text-xl font-semibold truncate" title={property.title}>
          <Link href={`/listings/${property.id}`} className="hover:text-primary transition-colors">{property.title}</Link>
        </h3>
        <p className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {property.location}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-4 text-sm">
            {isResidential ? (
              <>
                <span className="flex items-center" title={`${property.bedrooms} Bedrooms`}>
                  <Bed className="w-4 h-4 mr-2 text-primary" />
                  {property.bedrooms}
                </span>
                <span className="flex items-center" title={`${property.bathrooms} Bathrooms`}>
                  <Bath className="w-4 h-4 mr-2 text-primary" />
                  {property.bathrooms}
                </span>
              </>
            ) : isLand ? (
              <span className="flex items-center" title={`${property.size.value} ${property.size.unit}`}>
                  <LandPlot className="w-4 h-4 mr-2 text-primary" />
                  {property.size.value} {property.size.unit}
                </span>
            ) : isMine ? (
               <span className="flex items-center" title={`${property.size.value} ${property.size.unit}`}>
                  <Hammer className="w-4 h-4 mr-2 text-primary" />
                  {property.size.value} {property.size.unit}
                </span>
            ) : (
              <span className="flex items-center" title={`${property.size.value} ${property.size.unit}`}>
                <Milestone className="w-4 h-4 mr-2 text-primary" />
                {property.size.value} {property.size.unit}
              </span>
            )}
          </div>
          <p className="text-xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
