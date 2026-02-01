
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Activity, Clock, User, LogIn, Upload, FileCheck, ShieldAlert } from "lucide-react";

const mockLogs = [
    { id: 1, action: "New material uploaded", item: "Class of 2024 Yearbook", time: "2024-01-20 14:30", user: "Admin", type: "creation" },
    { id: 2, action: "Access request approved", item: "Historical Documents 1950-1960", time: "2024-01-20 14:15", user: "Archivist", type: "authorization" },
    { id: 3, action: "Settings modified", item: "User Role Permissions", time: "2024-01-20 13:45", user: "Admin", type: "system" },
    { id: 4, action: "User registered", item: "john.doe@email.com", time: "2024-01-20 12:30", user: "System", type: "auth" },
    { id: 5, action: "Material downloaded", item: "Research Journal Vol. 14", time: "2024-01-20 11:20", user: "Researcher", type: "interaction" },
    { id: 6, action: "Log-in attempt failed", item: "IP 192.168.1.45", time: "2024-01-20 10:05", user: "Guest", type: "security" },
    { id: 7, action: "User role changed", item: "aria.santos@email.com", time: "2024-01-19 16:20", user: "Admin", type: "system" },
];

const getLogIcon = (type: string) => {
    switch (type) {
        case "creation": return <Upload className="h-4 w-4 text-green-600" />;
        case "authorization": return <FileCheck className="h-4 w-4 text-blue-600" />;
        case "security": return <ShieldAlert className="h-4 w-4 text-red-600" />;
        case "auth": return <LogIn className="h-4 w-4 text-purple-600" />;
        default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
};

const ActivityLogsPage = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        System Activity Audit
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Target Item</TableHead>
                                    <TableHead>Type</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell>
                                            {getLogIcon(log.type)}
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">
                                            {log.time}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <User className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm font-medium">{log.user}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">{log.action}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground italic">{log.item}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="uppercase text-[10px] tracking-tighter">
                                                {log.type}
                                            </Badge>
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

export default ActivityLogsPage;
