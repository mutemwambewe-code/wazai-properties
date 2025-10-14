
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../ui/button';
import { getSiteContentFromStorage } from '@/lib/data';
import type { SiteContent } from '@/lib/types';

export function Footer() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    setContent(getSiteContentFromStorage());
  }, []);

  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container max-w-screen-2xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">
                Wazai Properties
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for Zambian real estate.
            </p>
          </div>
          <div className="md:col-start-2">
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/listings" className="text-muted-foreground hover:text-primary">All Listings</Link></li>
              <li><Link href="/#featured" className="text-muted-foreground hover:text-primary">Featured</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            {content ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{content.contactAddress}</li>
                <li><a href={`tel:${content.contactPhone}`} className="hover:text-primary">{content.contactPhone}</a></li>
                <li><a href={`mailto:${content.contactEmail}`} className="hover:text-primary">{content.contactEmail}</a></li>
              </ul>
            ) : (
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/40 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wazai Properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
