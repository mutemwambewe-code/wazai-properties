"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { testimonials as initialTestimonials } from "@/lib/data";
import { MoreHorizontal, Star, CheckCircle, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Testimonial } from "@/lib/types";

const LOCAL_STORAGE_KEY = 'testimonials';

export default function ReviewsManagementPage() {
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [reviewToDelete, setReviewToDelete] = useState<Testimonial | null>(null);

    useEffect(() => {
        const storedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            setReviews(initialTestimonials);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTestimonials));
        }
    }, []);

    const handleDelete = () => {
        if (reviewToDelete) {
            const updatedReviews = reviews.filter(r => r.id !== reviewToDelete.id);
            setReviews(updatedReviews);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedReviews));
            setReviewToDelete(null);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>Manage customer testimonials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reviewer</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="max-w-[400px]">Comment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.map(review => (
                                <TableRow key={review.id}>
                                    <TableCell className="font-medium">{review.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            {review.rating} <Star className="h-3 w-3 ml-1 fill-primary text-primary"/>
                                        </div>
                                    </TableCell>
                                    <TableCell className="truncate max-w-[400px]">{review.comment}</TableCell>
                                    <TableCell><Badge>Approved</Badge></TableCell>
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
                                                <DropdownMenuItem><CheckCircle className="h-4 w-4 mr-2"/> Approve</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => setReviewToDelete(review)}>
                                                    <Trash2 className="h-4 w-4 mr-2"/> Delete
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
            <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the review by &quot;{reviewToDelete?.name}&quot;.
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
