"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { properties as initialProperties } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Property } from "@/lib/types";

const formatPrice = (price: Property['price']) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format(price.amount);
};

const LOCAL_STORAGE_KEY = 'properties';

export default function ListingsManagementPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

    useEffect(() => {
        const storedProperties = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedProperties) {
            setProperties(JSON.parse(storedProperties));
        } else {
            setProperties(initialProperties);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialProperties));
        }
    }, []);

    const handleDelete = () => {
        if (propertyToDelete) {
            const updatedProperties = properties.filter(p => p.id !== propertyToDelete.id);
            setProperties(updatedProperties);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProperties));
            setPropertyToDelete(null);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Properties</CardTitle>
                        <CardDescription>Manage your property listings.</CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <a href="#"><PlusCircle className="h-3.5 w-3.5" /><span>Add Property</span></a>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {properties.map(prop => (
                                <TableRow key={prop.id}>
                                    <TableCell className="font-medium">{prop.title}</TableCell>
                                    <TableCell><Badge variant="outline">{prop.type}</Badge></TableCell>
                                    <TableCell><Badge variant={prop.status === 'For Sale' ? 'default' : 'secondary'}>{prop.status}</Badge></TableCell>
                                    <TableCell>{formatPrice(prop.price)}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => setPropertyToDelete(prop)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <AlertDialog open={!!propertyToDelete} onOpenChange={() => setPropertyToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this property?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the property listing for &quot;{propertyToDelete?.title}&quot;.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
