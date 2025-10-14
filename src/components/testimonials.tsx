import Image from "next/image";
import { testimonials } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star } from "lucide-react";

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

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background">
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
            loop: true,
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
