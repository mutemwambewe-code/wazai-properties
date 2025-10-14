
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Star } from "lucide-react";
import Link from "next/link";

export default function DashboardHomePage() {
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
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 Commercial, 2 Residential</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/dashboard/reviews">
          <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">out of 3 total reviews</p>
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
