
"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageSquare, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteContentFromStorage } from "@/lib/data";
import type { SiteContent } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    setContent(getSiteContentFromStorage());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formState);

    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });

    // Reset form
    setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
  };

  if (!content) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Loading...</h1>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help. Reach out to us for any inquiries about our properties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Your Name" value={formState.name} onChange={handleInputChange} required />
                  <Input name="email" type="email" placeholder="Your Email" value={formState.email} onChange={handleInputChange} required />
                </div>
                <Input name="subject" placeholder="Subject" value={formState.subject} onChange={handleInputChange} required />
                <Textarea name="message" placeholder="Your Message" rows={6} value={formState.message} onChange={handleInputChange} required />
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
                  <span>{content.contactAddress}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 text-primary" />
                  <a href={`tel:${content.contactPhone}`} className="hover:underline">{content.contactPhone}</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 text-primary" />
                  <a href={`mailto:${content.contactEmail}`} className="hover:underline">{content.contactEmail}</a>
                </div>
              </CardContent>
            </Card>
            
            <Button asChild size="lg" className="w-full h-14 text-lg">
                <a href="https://wa.me/260978227584" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-6 w-6 mr-3" /> Chat on WhatsApp
                </a>
            </Button>
          </div>
        </div>

        <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Our Office Location</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.54929841801!2d28.36502767588075!3d-15.350366016339746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408bb601655ba5%3A0x8c4e89277695a69d!2sWAZAI%20PROPERTIES!5e0!3m2!1sen!2sus!4v1716398325883!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
