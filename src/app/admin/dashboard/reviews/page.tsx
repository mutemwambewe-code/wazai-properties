
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { testimonials as initialTestimonials, getTestimonialsFromStorage, saveTestimonialsToStorage } from "@/lib/data";
import { MoreHorizontal, Star, CheckCircle, Trash2, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial } from "@/lib/types";

export default function ReviewsManagementPage() {
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [reviewToDelete, setReviewToDelete] = useState<Testimonial | null>(null);
    const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
    const { toast } = useToast();

    useEffect(() => {
        setReviews(getTestimonialsFromStorage());
    }, []);
    
    const handleStorageUpdate = () => {
        setReviews(getTestimonialsFromStorage());
    }

    useEffect(() => {
        window.addEventListener('storage', handleStorageUpdate);
        return () => window.removeEventListener('storage', handleStorageUpdate);
    }, []);

    const handleDelete = () => {
        if (reviewToDelete) {
            const updatedReviews = reviews.filter(r => r.id !== reviewToDelete.id);
            saveTestimonialsToStorage(updatedReviews);
            setReviews(updatedReviews);
            setReviewToDelete(null);
            toast({
                title: "Review Deleted",
                description: `The review by "${reviewToDelete.name}" has been deleted.`,
            });
        }
    };
    
    const handleAddReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newReview.name || !newReview.comment) {
             toast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill out all fields.",
            });
            return;
        }

        const newTestimonial: Testimonial = {
            id: `test-${Date.now()}`,
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            avatarImage: {
                id: `avatar-${Date.now()}`,
                url: `https://picsum.photos/seed/${Date.now()}/100/100`,
                description: `Avatar of ${newReview.name}`,
                hint: 'person portrait',
            }
        };

        const updatedReviews = [...reviews, newTestimonial];
        saveTestimonialsToStorage(updatedReviews);
        setReviews(updatedReviews);
        setIsAddReviewDialogOpen(false);
        setNewReview({ name: '', rating: 5, comment: '' });
        toast({
            title: "Review Added",
            description: `The review by "${newTestimonial.name}" has been successfully added.`,
        });
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                     <div className="grid gap-2">
                        <CardTitle>Reviews</CardTitle>
                        <CardDescription>Manage customer testimonials.</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                         <Dialog open={isAddReviewDialogOpen} onOpenChange={setIsAddReviewDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span>Add Review</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Review</DialogTitle>
                                    <DialogDescription>
                                        Enter the details for the new testimonial. It will be shown on the homepage.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddReview}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">Name</Label>
                                            <Input id="name" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="rating" className="text-right">Rating</Label>
                                            <Select value={String(newReview.rating)} onValueChange={(value) => setNewReview({...newReview, rating: Number(value)})}>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="comment" className="text-right">Comment</Label>
                                            <Textarea id="comment" value={newReview.comment} onChange={(e) => setNewReview({...newReview, comment: e.target.value})} className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Save Review</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
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
