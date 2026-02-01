
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Search, Upload, MoreHorizontal, Lock, Eye, Calendar, Tag } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockMaterials = [
    { id: "1", title: "Class of 2023 Yearbook", category: "Yearbooks", date: "2023-12-15", accessLevel: "public", views: 245 },
    { id: "2", title: "Campus Centennial Photo Collection", category: "Photographs", date: "2023-11-20", accessLevel: "public", views: 120 },
    { id: "3", title: "Research Journal Volume 15", category: "Publications", date: "2023-10-01", accessLevel: "public", views: 89 },
    { id: "4", title: "Founding Charter Documents", category: "Documents", date: "1950-01-15", accessLevel: "restricted", views: 34 },
    { id: "5", title: "Class of 2022 Yearbook", category: "Yearbooks", date: "2022-12-15", accessLevel: "public", views: 156 },
    { id: "6", title: "Sports Championship Gallery", category: "Photographs", date: "2023-08-10", accessLevel: "public", views: 92 },
];

const MaterialsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMaterials = mockMaterials.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search materials by title or category..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button className="bg-[#B31312] hover:bg-[#B31312]/90">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Material
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Digital Assets</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Material Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Access</TableHead>
                                    <TableHead>Upload Date</TableHead>
                                    <TableHead>Stats</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMaterials.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {item.accessLevel === "restricted" ? (
                                                <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1 w-fit">
                                                    <Lock className="h-3 w-3" />
                                                    Restricted
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1 w-fit">
                                                    <Eye className="h-3 w-3" />
                                                    Public
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                <Calendar className="h-3 w-3" />
                                                {item.date}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
                                                <Eye className="h-3 w-3" />
                                                {item.views} views
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Preview</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Metadata</DropdownMenuItem>
                                                    <DropdownMenuItem>Download File</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">Archive/Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MaterialsPage;
