import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  LayoutDashboard,
  Users,
  FolderOpen,
  FileText,
  ClipboardList,
  Activity,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  AlertCircle,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Categories", url: "/admin/categories", icon: FolderOpen },
  { title: "Materials", url: "/admin/materials", icon: FileText },
  { title: "Access Requests", url: "/admin/requests", icon: ClipboardList, badge: 5 },
  { title: "Activity Logs", url: "/admin/logs", icon: Activity },
];

const stats = [
  { title: "Total Materials", value: "10,234", change: "+12%", icon: FileText, trend: "up" },
  { title: "Active Users", value: "1,456", change: "+8%", icon: Users, trend: "up" },
  { title: "Pending Requests", value: "23", change: "-5%", icon: ClipboardList, trend: "down" },
  { title: "Downloads Today", value: "89", change: "+15%", icon: TrendingUp, trend: "up" },
];

const recentActivity = [
  { action: "New material uploaded", item: "Class of 2024 Yearbook", time: "2 minutes ago", user: "Admin" },
  { action: "Access request approved", item: "Historical Documents 1950-1960", time: "15 minutes ago", user: "Archivist" },
  { action: "User registered", item: "john.doe@email.com", time: "1 hour ago", user: "System" },
  { action: "Material downloaded", item: "Research Journal Vol. 14", time: "2 hours ago", user: "Researcher" },
];

const pendingRequests = [
  { id: 1, user: "Maria Santos", material: "Administrative Records 1960-1970", date: "2024-01-15" },
  { id: 2, user: "Jose Garcia", material: "Founding Charter Documents", date: "2024-01-14" },
  { id: 3, user: "Ana Reyes", material: "Board Meeting Minutes 1980", date: "2024-01-14" },
];

const AdminDashboard = () => {
  const location = useLocation();
  const isRootDashboard = location.pathname === "/admin";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B31312] text-white font-bold italic">
                iA
              </div>
              <div>
                <span className="font-bold text-sidebar-foreground">i<span className="text-[#B31312]">ARCHIVE</span></span>
                <Badge variant="secondary" className="ml-2 text-[10px] bg-muted text-muted-foreground uppercase tracking-wider h-4">
                  Admin
                </Badge>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                      >
                        <Link to={item.url} className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </span>
                          {item.badge && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/admin/settings">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground" asChild>
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Exit Admin
              </Link>
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {isRootDashboard ? "Dashboard" : menuItems.find((m) => m.url === location.pathname)?.title || "Admin"}
              </h1>
            </div>
          </header>

          <div className="p-6">
            {isRootDashboard ? (
              <div className="space-y-6 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <Card key={stat.title}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change} from last month
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Recent Activity</CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/admin/logs">View all</Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              <Activity className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.item}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {activity.time} • {activity.user}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Requests */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        Pending Requests
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          {pendingRequests.length}
                        </Badge>
                      </CardTitle>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/admin/requests">View all</Link>
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingRequests.map((request) => (
                          <div key={request.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{request.user}</p>
                              <p className="text-xs text-muted-foreground">{request.material}</p>
                              <p className="text-xs text-muted-foreground">{request.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Deny
                              </Button>
                              <Button size="sm">
                                Approve
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/admin/materials">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload Material
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admin/users">
                        <Users className="h-4 w-4 mr-2" />
                        Add User
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admin/categories">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Manage Categories
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;