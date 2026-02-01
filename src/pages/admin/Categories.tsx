import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Plus, FolderOpen, MoreHorizontal, FileText, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, Category } from "@/contexts/DataContext";
import { useToast } from "@/components/ui/use-toast";

type CategoryFormData = Omit<Category, "id">;

const CategoriesPage = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useData();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");

    // Dialog states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

    // Form state
    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        count: 0,
        items: "",
        lastUpdated: new Date().toISOString().split("T")[0],
    });

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setFormData({
            name: "",
            count: 0,
            items: "",
            lastUpdated: new Date().toISOString().split("T")[0],
        });
        setEditingCategory(null);
    };

    const openAddDialog = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditDialog = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            count: category.count,
            items: category.items,
            lastUpdated: category.lastUpdated,
        });
        setIsFormOpen(true);
    };

    const openDeleteDialog = (id: number) => {
        setDeletingCategoryId(id);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submissionData = { ...formData, lastUpdated: new Date().toISOString().split("T")[0] };
        if (editingCategory) {
            updateCategory(editingCategory.id, submissionData);
            toast({ title: "Category updated", description: `"${formData.name}" has been updated.` });
        } else {
            addCategory(submissionData);
            toast({ title: "Category added", description: `"${formData.name}" has been added.` });
        }
        setIsFormOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        if (deletingCategoryId !== null) {
            deleteCategory(deletingCategoryId);
            toast({ title: "Category deleted", description: "The category has been removed.", variant: "destructive" });
        }
        setIsDeleteOpen(false);
        setDeletingCategoryId(null);
    };

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
                <Button className="bg-[#B31312] hover:bg-[#B31312]/90" onClick={openAddDialog}>
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
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => openEditDialog(cat)}>
                                        <Pencil className="h-4 w-4 mr-2" /> Edit Category
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(cat.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                    </DropdownMenuItem>
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

            {/* Add/Edit Category Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
                        <DialogDescription>
                            {editingCategory ? "Update the category details below." : "Fill in the details for the new category."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" className="col-span-3" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="items" className="text-right">Description</Label>
                                <Textarea id="items" className="col-span-3" placeholder="e.g., Graduation photos, student lists" value={formData.items} onChange={e => setFormData({ ...formData, items: e.target.value })} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-[#B31312] hover:bg-[#B31312]/90">{editingCategory ? "Save Changes" : "Create Category"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this category.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default CategoriesPage;
