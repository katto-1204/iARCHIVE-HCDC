
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, Github, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.userType) {
      throw new Error("Please fill in all required fields");
    }
    if (!formData.email.includes("@")) {
      throw new Error("Please enter a valid email address");
    }
    if (formData.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      validateForm();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;
    if (formData.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(formData.password)) strength += 25;
    if (/[0-9]/.test(formData.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#002B5B]">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-br from-blue-400 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-to-tl from-red-600 to-transparent rounded-full blur-[120px]" />
        </div>
        <Card className="w-full max-w-md shadow-2xl border-white/10 bg-white/10 backdrop-blur-xl animate-fade-in relative z-10 text-white">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30 mx-auto animate-bounce">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Registration Successful!</h2>
              <p className="text-blue-100/70">
                We've sent a verification email to <br /> <span className="text-blue-200 font-semibold">{formData.email}</span>
              </p>
            </div>
            <div className="pt-4">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[loading_3s_ease-in-out]" style={{ width: '100%' }} />
              </div>
              <p className="text-xs text-blue-200/50 mt-4">Redirecting to login page...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden lg:flex relative bg-[#002B5B] overflow-hidden flex-col justify-between p-12 text-white order-last">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -right-1/4 w-full h-full bg-gradient-to-bl from-red-500 to-transparent rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-1/4 w-full h-full bg-gradient-to-tr from-blue-400 to-transparent rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex items-center justify-end gap-3 group">
          <span className="text-2xl font-bold tracking-tighter">iARCHIVE</span>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all duration-300">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="relative z-10 space-y-6 text-right ml-auto">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Start Your <br />
            <span className="text-red-400">Research Voyage</span> Today.
          </h1>
          <p className="text-xl text-blue-100 max-w-lg font-light leading-relaxed">
            Create an account to save collections, request special access, and contribute to the digital preservation of our school's legacy.
          </p>

          <div className="flex items-center justify-end gap-6 pt-4">
            <p className="text-sm font-medium text-blue-200">Used by schools across the region</p>
            <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 italic text-blue-100">
              "An essential tool for our archives."
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-blue-200/60 font-medium text-right">
          HCDC Digital Hub • Est. 2024
        </div>
      </div>

      {/* Form Side */}
      <div className="flex items-center justify-center p-6 bg-muted/5 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 animate-fade-in-up py-8">
          <div className="space-y-2">
            <Link to="/login" className="inline-flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h2>
            <p className="text-muted-foreground">Join the iArchive community today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Juan Alberto"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="h-11 border-muted-foreground/20 focus-visible:ring-primary/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Institutional Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="alberto.juan@hcdc.edu.ph"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-11 border-muted-foreground/20 focus-visible:ring-primary/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <Select value={formData.userType} onValueChange={(value) => handleChange("userType", value)}>
                <SelectTrigger className="h-11 border-muted-foreground/20">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="alumni">Alumni</SelectItem>
                  <SelectItem value="faculty">Faculty/Staff</SelectItem>
                  <SelectItem value="researcher">Researcher</SelectItem>
                  <SelectItem value="public">General Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <span className={`text-[10px] font-bold uppercase transition-colors ${strength <= 25 ? 'text-red-500' : strength <= 50 ? 'text-amber-500' : strength <= 75 ? 'text-blue-500' : 'text-green-500'
                  }`}>
                  {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Good' : 'Very Strong'}
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="h-11 border-muted-foreground/20"
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
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${strength <= 25 ? 'bg-red-500' : strength <= 50 ? 'bg-amber-500' : strength <= 75 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  style={{ width: `${strength}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="h-11 border-muted-foreground/20"
                required
              />
            </div>

            <div className="flex items-start gap-2 py-2">
              <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" required />
              <Label htmlFor="terms" className="text-xs text-muted-foreground leading-tight">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </Label>
            </div>

            <Button type="submit" className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform active:scale-[0.99]" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground font-medium pt-4 border-t border-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-bold text-lg ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;