import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Upload, MoreHorizontal, Lock, Eye, Calendar, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, Material } from "@/contexts/DataContext";
import { useToast } from "@/components/ui/use-toast";

type MaterialFormData = Omit<Material, "id">;

const MaterialsPage = () => {
    const { materials, categories, addMaterial, updateMaterial, deleteMaterial } = useData();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");

    // Dialog states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [deletingMaterialId, setDeletingMaterialId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<MaterialFormData>({
        title: "",
        category: categories.length > 0 ? categories[0].name : "",
        date: new Date().toISOString().split("T")[0],
        accessLevel: "public",
        views: 0,
    });

    const filteredMaterials = materials.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setFormData({
            title: "",
            category: categories.length > 0 ? categories[0].name : "",
            date: new Date().toISOString().split("T")[0],
            accessLevel: "public",
            views: 0,
        });
        setEditingMaterial(null);
    };

    const openAddDialog = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditDialog = (material: Material) => {
        setEditingMaterial(material);
        setFormData({
            title: material.title,
            category: material.category,
            date: material.date,
            accessLevel: material.accessLevel,
            views: material.views,
        });
        setIsFormOpen(true);
    };

    const openDeleteDialog = (id: string) => {
        setDeletingMaterialId(id);
        setIsDeleteOpen(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingMaterial) {
            updateMaterial(editingMaterial.id, formData);
            toast({ title: "Material updated", description: `"${formData.title}" has been updated.` });
        } else {
            addMaterial(formData);
            toast({ title: "Material added", description: `"${formData.title}" has been added.` });
        }
        setIsFormOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        if (deletingMaterialId !== null) {
            deleteMaterial(deletingMaterialId);
            toast({ title: "Material deleted", description: "The material has been removed.", variant: "destructive" });
        }
        setIsDeleteOpen(false);
        setDeletingMaterialId(null);
    };

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
                <Button className="bg-[#B31312] hover:bg-[#B31312]/90" onClick={openAddDialog}>
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
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => openEditDialog(item)}>
                                                        <Pencil className="h-4 w-4 mr-2" /> Edit Metadata
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(item.id)}>
                                                        <Trash2 className="h-4 w-4 mr-2" /> Delete Material
                                                    </DropdownMenuItem>
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

            {/* Add/Edit Material Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>{editingMaterial ? "Edit Material" : "Upload New Material"}</DialogTitle>
                        <DialogDescription>
                            {editingMaterial ? "Update the material's metadata below." : "Fill in the details for the new material."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input id="title" className="col-span-3" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">Date</Label>
                                <Input id="date" type="date" className="col-span-3" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="access" className="text-right">Access</Label>
                                <Select value={formData.accessLevel} onValueChange={v => setFormData({ ...formData, accessLevel: v as "public" | "restricted" })}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select access level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="restricted">Restricted</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" className="bg-[#B31312] hover:bg-[#B31312]/90">{editingMaterial ? "Save Changes" : "Upload"}</Button>
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
                            This action cannot be undone. This will permanently delete this material from the archive.
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

export default MaterialsPage;
