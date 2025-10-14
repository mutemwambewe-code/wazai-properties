import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { testimonials } from "@/lib/data";
import { MoreHorizontal, Star, CheckCircle, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function ReviewsManagementPage() {
    return (
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
                        {testimonials.map(review => (
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
                                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2"/> Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
