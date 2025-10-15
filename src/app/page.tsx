
'use client';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { Testimonials } from "@/components/testimonials";
import { LeaveReview } from "@/components/leave-review";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <FeaturedProperties />
          <Testimonials />
          <LeaveReview />
        </div>
      </main>
      <Footer />
    </div>
  );
}
