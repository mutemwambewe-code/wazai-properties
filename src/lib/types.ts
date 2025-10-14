

export type PropertyType = 'Commercial' | 'Residential' | 'Land' | 'Mine';
export type PropertyStatus = 'For Sale' | 'For Rent' | 'Sold';
export type PropertySizeUnit = 'hectares' | 'sqm' | 'acres' | 'plot';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: {
    amount: number;
    currency: 'USD' | 'ZMW';
  };
  location: string;
  size: {
    value: number;
    unit: PropertySizeUnit;
  };
  bedrooms?: number;
  bathrooms?: number;
  zoning?: string;
  description: string;
  amenities: string[];
  investmentPotential?: string;
  images: { id: string, description: string, url: string, hint: string }[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatarImage: { id: string, description: string, url: string, hint: string };
}

export interface SiteContent {
  heroHeadline: string;
  heroSubheadline: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}
