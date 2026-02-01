
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
import { Search, Plus, FolderOpen, MoreHorizontal, FileText, Settings2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockCategories = [
    { id: 1, name: "Yearbooks", count: 45, items: "Graduation photos, student lists", lastUpdated: "2023-12-15" },
    { id: 2, name: "Photographs", count: 1250, items: "Campus events, historical landmarks", lastUpdated: "2023-11-20" },
    { id: 3, name: "Publications", count: 85, items: "Research journals, newsletters", lastUpdated: "2023-10-01" },
    { id: 4, name: "Documents", count: 320, items: "Administrative records, charters", lastUpdated: "2023-09-15" },
    { id: 5, name: "Memorabilia", count: 120, items: "Institutional artifacts, awards", lastUpdated: "2023-08-10" },
];

const CategoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = mockCategories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button className="bg-[#B31312] hover:bg-[#B31312]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    New Category
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((cat) => (
                    <Card key={cat.id} className="hover:shadow-md transition-shadow group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <FolderOpen className="h-5 w-5" />
                                </div>
                                <CardTitle className="text-lg">{cat.name}</CardTitle>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit Category</DropdownMenuItem>
                                    <DropdownMenuItem>Manage Fields</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {cat.items}
                                </p>
                                <div className="flex items-center justify-between pt-2">
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        {cat.count} items
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        Updated {cat.lastUpdated}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
