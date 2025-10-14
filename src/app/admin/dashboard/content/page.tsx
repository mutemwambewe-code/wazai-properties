
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteContentFromStorage, saveSiteContentToStorage, defaultSiteContent } from "@/lib/data";
import type { SiteContent } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function ContentManagementPage() {
    const [content, setContent] = useState<SiteContent>(defaultSiteContent);
    const { toast } = useToast();

    useEffect(() => {
        setContent(getSiteContentFromStorage());
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setContent(prev => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = (e: React.FormEvent, section: 'hero' | 'contact') => {
        e.preventDefault();
        saveSiteContentToStorage(content);
        toast({
            title: "Content Saved",
            description: `The ${section} content has been updated.`,
        });
    };
    
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>Edit the content displayed on the homepage hero section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={(e) => handleSaveChanges(e, 'hero')}>
                        <div className="space-y-2">
                            <Label htmlFor="heroHeadline">Hero Headline</Label>
                            <Input id="heroHeadline" value={content.heroHeadline} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heroSubheadline">Hero Sub-headline</Label>
                            <Textarea id="heroSubheadline" value={content.heroSubheadline} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero-image">Hero Image</Label>
                            <Input id="hero-image" type="file" />
                            <p className="text-sm text-muted-foreground">Upload a new background image for the hero section.</p>
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update the contact details shown across the site.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form className="space-y-4" onSubmit={(e) => handleSaveChanges(e, 'contact')}>
                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Phone Number</Label>
                            <Input id="contactPhone" value={content.contactPhone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email Address</Label>
                            <Input id="contactEmail" value={content.contactEmail} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactAddress">Office Address</Label>
                            <Input id="contactAddress" value={content.contactAddress} onChange={handleInputChange} />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
