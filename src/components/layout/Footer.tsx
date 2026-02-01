import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary">iArchive</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Preserving institutional heritage through digital innovation. The official digital archive of Holy Cross of Davao College.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Browse Collections
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About the Archive
              </Link>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Researcher Login
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Collections</h4>
            <div className="flex flex-col gap-2">
              <Link to="/collections?category=yearbooks" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Yearbooks
              </Link>
              <Link to="/collections?category=publications" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Publications
              </Link>
              <Link to="/collections?category=photographs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Photographs
              </Link>
              <Link to="/collections?category=documents" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Historical Documents
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Sta. Ana Avenue, Davao City, Philippines</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+63 82 222 1234</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>archive@hcdc.edu.ph</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Holy Cross of Davao College. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;