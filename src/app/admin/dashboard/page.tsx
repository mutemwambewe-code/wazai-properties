
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Star } from "lucide-react";
import Link from "next/link";
import { getPropertiesFromStorage, getTestimonialsFromStorage } from '@/lib/data';
import type { Property, Testimonial } from '@/lib/types';

export default function DashboardHomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    setProperties(getPropertiesFromStorage());
    setReviews(getTestimonialsFromStorage());
  }, []);

  const residentialCount = properties.filter(p => p.type === 'Residential').length;
  const commercialCount = properties.filter(p => p.type === 'Commercial').length;
  const landCount = properties.filter(p => p.type === 'Land').length;
  const mineCount = properties.filter(p => p.type === 'Mine').length;

  // Assuming all reviews are "pending" for this example, as there's no status property yet.
  const pendingReviewsCount = reviews.length; 

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/dashboard/listings">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-muted-foreground">
                {residentialCount} Res, {commercialCount} Comm, {landCount} Land, {mineCount} Mine
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/dashboard/reviews">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reviews.length}</div>
              <p className="text-xs text-muted-foreground">All reviews are currently displayed.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Welcome, Admin!</CardTitle>
                <CardDescription>
                    You can manage your property listings, reviews, and website content from the sidebar navigation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>This is your central hub for overseeing all aspects of the Wazai Properties website.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
