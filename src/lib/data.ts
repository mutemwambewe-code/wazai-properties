
import type { Property, Testimonial, SiteContent } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Fallback for images not found in placeholder-images.json, e.g. from property data
    return { id, url: 'https://picsum.photos/seed/default/600/400', description: 'Placeholder image', hint: 'image' };
  }
  return { id: image.id, url: image.imageUrl, description: image.description, hint: image.imageHint };
}

export const properties: Property[] = [
  {
    id: 'comm-1',
    title: 'Prime Commercial Land in Lusaka CBD',
    type: 'Commercial',
    status: 'For Sale',
    price: { amount: 2500000, currency: 'USD' },
    location: 'Lusaka, Zambia',
    size: { value: 5, unit: 'hectares' },
    zoning: 'Mixed-Use Commercial',
    description: 'A rare opportunity to acquire a large plot in the heart of Lusaka\'s central business district. Ideal for a shopping mall, office park, or high-rise residential complex.',
    amenities: ['Road access', 'Water connection', 'Electricity'],
    investmentPotential: 'High rental yield and capital appreciation expected due to prime location and government infrastructure projects in the area.',
    images: [
      getImage('commercial-2'),
      { id: 'comm-1-2', url: 'https://picsum.photos/seed/c1_2/800/600', description: 'Plot boundary view', hint: 'land plot' },
      { id: 'comm-1-3', url: 'https://picsum.photos/seed/c1_3/800/600', description: 'Nearby street view', hint: 'city street' },
    ],
    agent: { name: 'John Doe', phone: '+260977123456', email: 'john.doe@zambia.homes' },
    coordinates: { lat: -15.4167, lng: 28.2833 },
  },
  {
    id: 'res-1',
    title: 'Luxury 4-Bedroom Villa in Leopards Hill',
    type: 'Residential',
    status: 'For Sale',
    price: { amount: 850000, currency: 'USD' },
    location: 'Leopards Hill, Lusaka',
    size: { value: 450, unit: 'sqm' },
    bedrooms: 4,
    bathrooms: 5,
    description: 'An exquisite family home in the serene and prestigious Leopards Hill area. Features modern finishes, a large garden, swimming pool, and excellent security.',
    amenities: ['Swimming pool', 'Backup generator', 'Borehole', 'Wi-Fi', '24/7 Security'],
    images: [
      getImage('residential-1'),
      { id: 'res-1-2', url: 'https://picsum.photos/seed/r1_2/800/600', description: 'Living room interior', hint: 'living room' },
      { id: 'res-1-3', url: 'https://picsum.photos/seed/r1_3/800/600', description: 'Swimming pool area', hint: 'swimming pool' },
    ],
    agent: { name: 'Jane Smith', phone: '+260966987654', email: 'jane.smith@zambia.homes' },
    coordinates: { lat: -15.431, lng: 28.396 },
  },
  {
    id: 'res-2',
    title: 'Modern 2-Bedroom Apartment in Roma',
    type: 'Residential',
    status: 'For Rent',
    price: { amount: 1200, currency: 'USD' },
    location: 'Roma, Lusaka',
    size: { value: 120, unit: 'sqm' },
    bedrooms: 2,
    bathrooms: 2,
    description: 'A stylish and secure apartment in a newly built complex in Roma. Perfect for expatriates and young professionals. Comes fully furnished with access to a communal gym and pool.',
    amenities: ['Communal pool', 'Gym', 'Wi-Fi', 'Air conditioning', 'Covered parking'],
    images: [
      getImage('residential-2'),
      getImage('residential-3'),
      { id: 'res-2-3', url: 'https://picsum.photos/seed/r2_3/800/600', description: 'Kitchen view', hint: 'modern kitchen' },
    ],
    agent: { name: 'Jane Smith', phone: '+260966987654', email: 'jane.smith@zambia.homes' },
    coordinates: { lat: -15.385, lng: 28.315 },
  },
  {
    id: 'comm-2',
    title: 'Industrial Park Development Land',
    type: 'Commercial',
    status: 'For Sale',
    price: { amount: 5000000, currency: 'USD' },
    location: 'Lusaka South Multi-Facility Economic Zone',
    size: { value: 20, unit: 'hectares' },
    zoning: 'Industrial',
    description: 'Vast expanse of land located in the LS-MFEZ, offering tax incentives and world-class infrastructure. Perfect for manufacturing, logistics, or warehousing.',
    amenities: ['Tarred road network', 'Heavy-duty power grid', 'Fiber optic internet'],
    investmentPotential: 'Strategic location for regional trade with access to major transport corridors. Government incentives for investors in the zone make this a prime opportunity.',
    images: [
      getImage('commercial-3'),
      { id: 'comm-2-2', url: 'https://picsum.photos/seed/c2_2/800/600', description: 'Aerial of the economic zone', hint: 'industrial park' },
      { id: 'comm-2-3', url: 'https://picsum.photos/seed/c2_3/800/600', description: 'Road infrastructure', hint: 'road construction' },
    ],
    agent: { name: 'John Doe', phone: '+260977123456', email: 'john.doe@zambia.homes' },
    coordinates: { lat: -15.533, lng: 28.366 },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'David Chen',
    rating: 5,
    comment: 'The team at Zambia Homes & Investments provided unparalleled service in helping us secure a prime commercial plot. Their market knowledge is exceptional.',
    avatarImage: getImage('testimonial-1'),
  },
  {
    id: 'test-2',
    name: 'Amina Juma',
    rating: 5,
    comment: 'Found our dream home through them! The process was smooth, and their agents were incredibly professional and helpful. Highly recommended.',
    avatarImage: getImage('testimonial-2'),
  },
  {
    id: 'test-3',
    name: 'Michael Johnson',
    rating: 4,
    comment: 'A very professional outfit. They have a great portfolio of residential properties for rent. I found a great apartment in no time.',
    avatarImage: getImage('testimonial-3'),
  },
];

export const defaultSiteContent: SiteContent = {
  heroHeadline: 'Invest. Build. Live.',
  heroSubheadline: 'Find Your Ideal Property in Zambia.',
  contactPhone: '+260978227584',
  contactEmail: 'info@zambia.homes',
  contactAddress: '123 Independence Ave, Lusaka, Zambia',
};

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
}

export const savePropertiesToStorage = (properties: Property[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('properties', JSON.stringify(properties));
    }
}

export const getPropertiesFromStorage = (): Property[] => {
    if (typeof window !== 'undefined') {
        const storedProperties = localStorage.getItem('properties');
        if (storedProperties) {
            try {
                const parsed = JSON.parse(storedProperties);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                console.error("Failed to parse properties from localStorage", e);
            }
        }
    }
    return properties;
}

export const getPropertyByIdFromStorage = (id: string): Property | undefined => {
    const allProperties = getPropertiesFromStorage();
    return allProperties.find(p => p.id === id);
}


export const getSiteContentFromStorage = (): SiteContent => {
    if (typeof window !== 'undefined') {
        const storedContent = localStorage.getItem('siteContent');
        if (storedContent) {
             try {
                const parsed = JSON.parse(storedContent);
                return { ...defaultSiteContent, ...parsed };
            } catch (e) {
                console.error("Failed to parse site content from localStorage", e);
            }
        }
    }
    return defaultSiteContent;
};

export const saveSiteContentToStorage = (content: SiteContent) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('siteContent', JSON.stringify(content));
    }
};

export const getTestimonialsFromStorage = (): Testimonial[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('testimonials');
        try {
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Failed to parse testimonials from localStorage", e);
        }
    }
    return testimonials;
};
