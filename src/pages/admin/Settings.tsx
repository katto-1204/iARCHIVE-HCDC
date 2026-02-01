
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Shield, Bell, Database, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your system preferences have been updated.",
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Configure the basic identity and behavior of the archive platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="site-name">Archive Name</Label>
                                <Input id="site-name" defaultValue="iARCHIVE - HCDC Digital Heritage" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="contact-email">Administrative Contact Email</Label>
                                <Input id="contact-email" type="email" defaultValue="archives@hcdc.edu.ph" />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Public Registration</Label>
                                    <p className="text-xs text-muted-foreground">Allow new users to register for public accounts auto-approved.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Button onClick={handleSave} className="bg-primary">
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Configuration</CardTitle>
                            <CardDescription>Manage authentication and access protocols.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-xs text-muted-foreground">Require 2FA for all administrative accounts.</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Session Timeout</Label>
                                    <p className="text-xs text-muted-foreground">Auto logout after 30 minutes of inactivity.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Button onClick={handleSave} className="bg-primary">
                                <Shield className="h-4 w-4 mr-2" />
                                Update Security
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Control how the system alerts you about new activities.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label>New Access Requests</Label>
                                        <p className="text-xs text-muted-foreground">Email admin when a user requests restricted documents.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="space-y-0.5">
                                        <Label>Storage Alerts</Label>
                                        <p className="text-xs text-muted-foreground">Notify when digital asset storage exceeds 90% capacity.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <Button onClick={handleSave} className="bg-primary">
                                <Bell className="h-4 w-4 mr-2" />
                                Save Alerts
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingsPage;
