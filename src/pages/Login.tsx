
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Eye, EyeOff, ArrowLeft, AlertCircle, Github, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      if (email === "admin@gmail.com" && password === "admin123") {
        login(email, "admin");
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the administration panel.",
        });
        navigate("/admin");
        return;
      }

      login(email, "student");
      toast({
        title: "Login Successful",
        description: "Welcome back to iArchive!",
      });

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-[#002B5B] overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-br from-blue-400 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-to-tl from-red-600 to-transparent rounded-full blur-[120px]" />
        </div>

        <Link to="/" className="relative z-10 flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">iARCHIVE</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Preserving History, <br />
            <span className="text-red-400">One Document</span> At A Time.
          </h1>
          <p className="text-xl text-blue-100 max-w-lg font-light leading-relaxed">
            Access our digital heritage through a secure and intuitive platform designed for researchers, students, and historians.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-[#002B5B] bg-muted overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-blue-200">Joined by 2,000+ researchers this month</p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200/60 font-medium">
          © 2024 Holy Cross of Davao College. All rights reserved.
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-6 bg-muted/5 sm:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up">
          <div className="space-y-2">
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">Please enter your details to sign in.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 border-muted-foreground/20 hover:bg-muted/50 transition-all">
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button variant="outline" className="h-12 border-muted-foreground/20 hover:bg-muted/50 transition-all">
              <Mail className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-medium">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@hcdc.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-muted-foreground/20 focus-visible:ring-primary/30"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" title="Reset password" className="text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-muted-foreground/20 focus-visible:ring-primary/30"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform active:scale-[0.99]" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Signing in...
                </div>
              ) : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-medium">
            New to iArchive?{" "}
            <Link to="/signup" className="text-primary hover:underline font-bold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;