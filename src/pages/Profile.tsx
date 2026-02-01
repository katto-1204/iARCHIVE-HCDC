
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User,
    FileText,
    Bookmark,
    Clock,
    Settings,
    ExternalLink,
    ShieldCheck,
    ShieldAlert,
    Calendar,
    LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { mockItems } from "@/data/mockData";

const ProfilePage = () => {
    const { user, logout } = useAuth();

    const savedCollections = mockItems.filter(item => user?.savedItems?.includes(item.id));

    const mockRequests = [
        { id: 1, title: "Founding Charter 1951", date: "2 yrs ago", status: "Approved", category: "Documents" },
        { id: 2, title: "Restricted Personnel Ledger 1960", date: "1 day ago", status: "Pending", category: "Records" },
    ];

    return (
        <Layout>
            <div className="container py-8 max-w-6xl animate-fade-in">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / User Info */}
                    <div className="w-full md:w-80 space-y-6">
                        <Card className="overflow-hidden border-none shadow-md">
                            <div className="h-24 bg-gradient-to-r from-[#002B5B] to-[#B31312]" />
                            <CardContent className="relative pt-12 pb-6 text-center">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback className="text-2xl bg-muted text-foreground">
                                            {user?.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <h2 className="text-xl font-bold">{user?.name}</h2>
                                <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                                <div className="flex justify-center gap-2">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary capitalize">
                                        {user?.role}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                                        Verified
                                    </Badge>
                                </div>
                            </CardContent>
                            <Separator />
                            <div className="p-2 space-y-1">
                                <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                                    <a href="#">
                                        <Settings className="h-4 w-4" />
                                        Edit Profile
                                    </a>
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => logout()}>
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <FileText className="h-4 w-4" /> Downloads
                                    </span>
                                    <span className="font-bold">12</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Bookmark className="h-4 w-4" /> Saved Items
                                    </span>
                                    <span className="font-bold">{savedCollections.length}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> Login Streak
                                    </span>
                                    <span className="font-bold">5 days</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Areas */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-6 tracking-tight">Your iArchive Dashboard</h1>

                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList className="bg-muted/50 p-1">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="requests">Access Requests</TabsTrigger>
                                <TabsTrigger value="saved">Saved Archives</TabsTrigger>
                                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <Badge className="bg-green-100 text-green-700">Latest Approved</Badge>
                                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                            </div>
                                            <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">Founding Charter 1951</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">You now have full access to this document.</p>
                                            <Button variant="outline" size="sm" className="mt-4 w-full">View Material</Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="outline" className="text-amber-600 border-amber-200">Pending Review</Badge>
                                                <ShieldAlert className="h-5 w-5 text-amber-500" />
                                            </div>
                                            <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">Personnel Ledger 1960</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">Administrator is reviewing your thesis request.</p>
                                            <Button variant="ghost" size="sm" className="mt-4 w-full">Check Status</Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Bookmark className="h-5 w-5 text-primary" />
                                            Recently Saved
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {savedCollections.length > 0 ? (
                                                savedCollections.slice(0, 3).map((item) => (
                                                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                                                                <FileText className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium">{item.title}</p>
                                                                <p className="text-xs text-muted-foreground">{item.category}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <Link to={`/material/${item.id}`}>
                                                                <ExternalLink className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-muted-foreground text-sm">
                                                    No items saved yet. Explore the collections to add some!
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="requests" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Special Access History</CardTitle>
                                        <CardDescription>Status of your requests for restricted institutional materials.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {mockRequests.map((req) => (
                                                <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-sm transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2 rounded-full ${req.status === 'Approved' ? 'bg-green-100' : 'bg-amber-100'}`}>
                                                            <ShieldCheck className={`h-5 w-5 ${req.status === 'Approved' ? 'text-green-600' : 'text-amber-600'}`} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{req.title}</p>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                <Badge variant="outline" className="h-4 text-[9px] uppercase">{req.category}</Badge>
                                                                <span>Requested {req.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Badge className={req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                                                        {req.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="saved">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {savedCollections.length > 0 ? (
                                        savedCollections.map((item) => (
                                            <Card key={item.id} className="group hover:shadow-lg transition-all border-muted">
                                                <CardContent className="pt-6">
                                                    <Bookmark className="h-6 w-6 text-primary mb-4" />
                                                    <h3 className="font-bold leading-tight">{item.title}</h3>
                                                    <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                                                    <Separator className="my-3" />
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" /> {new Date(item.date).toLocaleDateString()}
                                                        </span>
                                                        <Button variant="link" className="h-auto p-0 text-xs" asChild>
                                                            <Link to={`/material/${item.id}`}>View →</Link>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-12 text-center text-muted-foreground">
                                            You haven't saved any collections yet.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="activity">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="relative">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-muted" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Viewed "Institutional Landmarks Photo Arch."</p>
                                                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="relative">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <FileText className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-muted" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Downloaded "Research Guidelines PDF"</p>
                                                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">Logged in from New Device (Chrome/Windows)</p>
                                                    <p className="text-xs text-muted-foreground">Jan 19, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
