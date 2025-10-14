
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import { cn } from '@/lib/utils';

const LOCAL_STORAGE_KEY = 'testimonials';

export function LeaveReview() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Incomplete Review',
        description: 'Please fill in all fields and provide a rating.',
      });
      return;
    }

    const newReview: Testimonial = {
      id: `test-${Date.now()}`,
      name,
      rating,
      comment,
      avatarImage: {
        id: `avatar-${Date.now()}`,
        url: `https://picsum.photos/seed/${Date.now()}/100/100`,
        description: `Avatar of ${name}`,
        hint: 'person portrait',
      },
    };

    try {
        const storedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
        const existingReviews: Testimonial[] = storedReviews ? JSON.parse(storedReviews) : [];
        const updatedReviews = [...existingReviews, newReview];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReviews));

        toast({
            title: 'Review Submitted!',
            description: 'Thank you for your feedback.',
        });

        // Reset form
        setName('');
        setComment('');
        setRating(0);
    } catch (error) {
        console.error("Failed to save review:", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Could not save your review.",
        });
    }
  };

  return (
    <section id="leave-review" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-headline font-bold">Leave a Review</CardTitle>
            <CardDescription className="mt-2 text-lg text-muted-foreground">
              Share your experience with us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Your Rating</Label>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <Star
                        key={starValue}
                        className={cn(
                          'w-8 h-8 cursor-pointer transition-colors',
                          starValue <= (hoverRating || rating)
                            ? 'text-primary fill-primary'
                            : 'text-muted-foreground/30'
                        )}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
