import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContentManagementPage() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Homepage Content</CardTitle>
                    <CardDescription>Edit the content displayed on the homepage hero section.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="hero-headline">Hero Headline</Label>
                            <Input id="hero-headline" defaultValue="Invest. Build. Live." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="hero-subheadline">Hero Sub-headline</Label>
                            <Textarea id="hero-subheadline" defaultValue="Find Your Ideal Property in Zambia." />
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
                     <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="contact-phone">Phone Number</Label>
                            <Input id="contact-phone" defaultValue="+260 977 123456" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-email">Email Address</Label>
                            <Input id="contact-email" defaultValue="info@zambia.homes" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact-address">Office Address</Label>
                            <Input id="contact-address" defaultValue="123 Independence Ave, Lusaka, Zambia" />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
