import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Search, Users, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure & Preserved",
    description: "All materials are securely stored with multiple backups to ensure permanent preservation.",
  },
  {
    icon: Search,
    title: "Easy Discovery",
    description: "Advanced search and filtering make finding specific records quick and intuitive.",
  },
  {
    icon: Clock,
    title: "Historical Access",
    description: "Browse materials spanning decades of institutional history at your convenience.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Open to students, alumni, researchers, and the public with appropriate access levels.",
  },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Preserving History for
                <br />
                <span className="text-primary">Future Generations</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                iArchive is the official digital repository of Holy Cross of Davao College, 
                dedicated to preserving and providing access to our rich institutional heritage.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/collections">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="relative">
            <div className="bg-card rounded-2xl border shadow-lg p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                <p className="text-muted-foreground">
                  To digitize, preserve, and make accessible the historical records of Holy Cross of Davao College, 
                  ensuring that our institutional memory endures for generations to come.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Dublin Core metadata standards",
                  "Role-based access control",
                  "Full-text search capabilities",
                  "Secure document viewing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">Est. 1950</div>
                    <div className="text-sm text-muted-foreground">Founding Year</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2024</div>
                    <div className="text-sm text-muted-foreground">Digital Launch</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-4 left-4 w-full h-full rounded-2xl bg-primary/5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;