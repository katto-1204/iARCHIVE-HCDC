import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, Search } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Explore Our Archives?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Create an account to access exclusive materials, save your favorite items, 
            and request access to restricted collections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Link to="/signup">
                <UserPlus className="mr-2 h-5 w-5" />
                Create Free Account
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/collections">
                <Search className="mr-2 h-5 w-5" />
                Browse as Guest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-white/50">
            Already have an account?{" "}
            <Link to="/login" className="text-white/80 hover:text-white underline underline-offset-4">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;