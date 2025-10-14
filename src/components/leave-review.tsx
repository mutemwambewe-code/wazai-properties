
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const googleMapsReviewUrl = "https://www.google.com/maps/place/WAZAI+PROPERTIES/@-15.3504193,28.3675728,17z/data=!4m15!1m8!3m7!1s0x19408bb601655ba5:0x8c4e89277695a69d!2sWAZAI+PROPERTIES!8m2!3d-15.3503711!4d28.3676026!10e1!16s%2Fg%2F11sssc47_7!3m5!1s0x19408bb601655ba5:0x8c4e89277695a69d!8m2!3d-15.3503711!4d28.3676026!16s%2Fg%2F11sssc47_7?authuser=0&entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D";

export function LeaveReview() {
  return (
    <section id="leave-review" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold">Leave a Review</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              Your feedback helps us improve. Share your experience on Google!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <a href={googleMapsReviewUrl} target="_blank" rel="noopener noreferrer">
                <Star className="mr-2 h-5 w-5" />
                Review us on Google Maps
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
