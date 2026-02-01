import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collections from "./pages/Collections";
import MaterialView from "./pages/MaterialView";
import About from "./pages/About";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Materials from "./pages/admin/Materials";
import AccessRequests from "./pages/admin/AccessRequests";
import ActivityLogs from "./pages/admin/ActivityLogs";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/ui/LoadingScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme-provider";
import { DataProvider } from "./contexts/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider defaultTheme="light" storageKey="iarchive-theme">
            <LoadingScreen />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/material/:id" element={<MaterialView />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route path="users" element={<Users />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="materials" element={<Materials />} />
                  <Route path="requests" element={<AccessRequests />} />
                  <Route path="logs" element={<ActivityLogs />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;