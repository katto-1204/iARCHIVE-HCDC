
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { CheckCircle2, XCircle, Clock, FileText, User, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialRequests = [
    { id: 1, user: "Maria Santos", email: "maria@email.com", material: "Administrative Records 1960-1970", date: "2024-01-15", status: "Pending", purpose: "Graduate thesis on institutional history." },
    { id: 2, user: "Jose Garcia", email: "jose@email.com", material: "Founding Charter Documents", date: "2024-01-14", status: "Pending", purpose: "Legal verification for land titling research." },
    { id: 3, user: "Ana Reyes", email: "ana@email.com", material: "Board Meeting Minutes 1980", date: "2024-01-14", status: "Approved", purpose: "Student organization anniversary research." },
    { id: 4, user: "Mark Ramos", email: "mark@email.com", material: "Restricted Personnel Records", date: "2024-01-13", status: "Denied", purpose: "Personal curiosity." },
];

const AccessRequestsPage = () => {
    const [requests, setRequests] = useState(initialRequests);
    const { toast } = useToast();

    const handleAction = (id: number, action: "Approved" | "Denied") => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));
        toast({
            title: `Request ${action}`,
            description: `The access request has been successfully ${action.toLowerCase()}.`,
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Access Requests</CardTitle>
                    <CardDescription>Review and manage user requests for restricted institutional materials.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User Information</TableHead>
                                    <TableHead>Requested Material</TableHead>
                                    <TableHead>Date & Purpose</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{request.user}</span>
                                                <span className="text-xs text-muted-foreground">{request.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-primary" />
                                                <span className="text-sm font-medium">{request.material}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-[200px]">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    {request.date}
                                                </div>
                                                <div className="flex items-start gap-1 text-sm italic line-clamp-2">
                                                    <MessageSquare className="h-3 w-3 mt-1" />
                                                    "{request.purpose}"
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    request.status === "Approved" ? "bg-green-100 text-green-700" :
                                                        request.status === "Denied" ? "bg-red-100 text-red-700" :
                                                            "bg-amber-100 text-amber-700"
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {request.status === "Pending" ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleAction(request.id, "Denied")}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Deny
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleAction(request.id, "Approved")}
                                                        className="bg-primary hover:bg-primary/90"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">
                                                    Decision Meta
                                                </span>
                                            )}
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

export default AccessRequestsPage;
