"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPlaceholder } from "@/components/map-placeholder";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Reach out to us for any inquiries about our properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                </div>
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={6} />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-4 text-primary" />
                  <span>123 Independence Ave, Lusaka, Zambia</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 text-primary" />
                  <a href="tel:+260977123456" className="hover:underline">+260 977 123456</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 text-primary" />
                  <a href="mailto:info@zambia.homes" className="hover:underline">info@zambia.homes</a>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild size="lg" className="w-full h-14 text-lg">
                <a href="https://wa.me/260977123456" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-6 w-6 mr-3" /> Chat on WhatsApp
                </a>
            </Button>
          </div>
        </div>

        <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Our Office Location</h2>
            <MapPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
}
