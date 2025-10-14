
'use client';

import Image from "next/image";
import { testimonials as initialTestimonials } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
      />
    ))}
  </div>
);

const getTestimonialsFromStorage = (): Testimonial[] => {
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
    return initialTestimonials;
};


export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Initial load
    setTestimonials(getTestimonialsFromStorage());

    // Listen for changes in localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'testimonials' && event.newValue) {
        try {
          const newTestimonials = JSON.parse(event.newValue);
          if (Array.isArray(newTestimonials)) {
            setTestimonials(newTestimonials);
          }
        } catch (e) {
            console.error("Failed to parse updated testimonials from localStorage", e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from investors and homeowners who have trusted us with their property needs.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: testimonials.length > 1,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex flex-col flex-grow items-center text-center p-6">
                      <Image
                        src={testimonial.avatarImage.url}
                        alt={`Avatar of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="rounded-full mb-4 border-2 border-primary"
                        data-ai-hint={testimonial.avatarImage.hint}
                      />
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <div className="my-2">
                        <StarRating rating={testimonial.rating} />
                      </div>
                      <p className="text-muted-foreground text-sm flex-grow">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
