
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
import { Search, UserPlus, MoreHorizontal, Mail, Shield, Calendar } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockUsers = [
    { id: 1, name: "Admin User", email: "admin@gmail.com", role: "Admin", status: "Active", joined: "2023-01-10" },
    { id: 2, name: "Maria Santos", email: "maria@email.com", role: "Archivist", status: "Active", joined: "2023-05-15" },
    { id: 3, name: "Jose Garcia", email: "jose@email.com", role: "Researcher", status: "Inactive", joined: "2023-08-20" },
    { id: 4, name: "Ana Reyes", email: "ana@email.com", role: "Student", status: "Active", joined: "2023-10-05" },
    { id: 5, name: "Juan Dela Cruz", email: "juan@email.com", role: "Student", status: "Active", joined: "2023-11-12" },
];

const UsersPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button className="bg-[#B31312] hover:bg-[#B31312]/90">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{user.name}</span>
                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Shield className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{user.role}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === "Active" ? "secondary" : "outline"} className={user.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                <Calendar className="h-3 w-3" />
                                                {user.joined}
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
                                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit permissions</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive">Deactivate account</DropdownMenuItem>
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

export default UsersPage;
