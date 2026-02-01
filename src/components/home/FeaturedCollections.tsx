import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Camera, FileText, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  icon: React.ElementType;
  category: string;
  featured: boolean;
  imageUrl?: string;
}

const collections: Collection[] = [
  {
    id: "yearbooks",
    title: "Yearbooks Collection",
    description: "Complete digital archive of institutional yearbooks from 1950 to present, documenting generations of graduates.",
    itemCount: 75,
    icon: BookOpen,
    category: "Yearbooks",
    featured: true,
  },
  {
    id: "photographs",
    title: "Historical Photographs",
    description: "A visual journey through campus life, events, and milestones captured across decades of institutional history.",
    itemCount: 5000,
    icon: Camera,
    category: "Photographs",
    featured: true,
  },
  {
    id: "publications",
    title: "Official Publications",
    description: "Research journals, newsletters, and official institutional publications preserving academic achievements.",
    itemCount: 320,
    icon: Newspaper,
    category: "Publications",
    featured: true,
  },
  {
    id: "documents",
    title: "Historical Documents",
    description: "Founding documents, correspondence, and records that tell the story of our institution's growth.",
    itemCount: 1200,
    icon: FileText,
    category: "Documents",
    featured: false,
  },
];

const FeaturedCollections = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
              Explore
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Collections
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Discover curated collections spanning decades of institutional heritage, 
              carefully digitized and preserved for future generations.
            </p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto">
            <Link to="/collections">
              View All Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collections?category=${collection.id}`}
              className="group archive-card p-6 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <collection.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  {collection.featured && (
                    <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {collection.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {collection.itemCount.toLocaleString()} items
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;