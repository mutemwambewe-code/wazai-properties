export type PropertyType = 'Commercial' | 'Residential';
export type PropertyStatus = 'For Sale' | 'For Rent' | 'Sold';

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
    unit: 'hectares' | 'sqm' | 'plot';
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
