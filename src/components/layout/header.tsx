import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2 } from "lucide-react";

const NavLinks = () => (
  <>
    <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
    <Link href="/listings" className="text-foreground/80 hover:text-foreground transition-colors">Listings</Link>
    <Link href="/#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Reviews</Link>
    <Link href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</Link>
  </>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Zambia Homes & Investments
            </span>
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <NavLinks />
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild>
            <Link href="/admin/login">Admin Login</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline">ZHI</span>
              </Link>
              <nav className="flex flex-col gap-4 text-lg">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
