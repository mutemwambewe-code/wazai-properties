import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";

export function MapPlaceholder() {
  return (
    <Card className="aspect-video w-full bg-muted/50 flex items-center justify-center border-dashed">
      <CardContent className="flex flex-col items-center gap-4 text-center text-muted-foreground p-6">
        <Map className="w-16 h-16" />
        <h3 className="font-semibold text-lg">Interactive Map</h3>
        <p className="max-w-md">
          To enable the interactive map view, you need to provide a Google Maps API key. 
          Please add your key to your environment variables and configure the map component.
        </p>
      </CardContent>
    </Card>
  );
}
