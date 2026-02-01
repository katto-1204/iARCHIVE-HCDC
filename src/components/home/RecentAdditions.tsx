import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import yearbookThumb from "@/assets/yearbook-thumb.jpg";
import photosThumb from "@/assets/photos-thumb.jpg";
import publicationsThumb from "@/assets/publications-thumb.jpg";

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  thumbnail: string;
}

const recentItems: ArchiveItem[] = [
  {
    id: "1",
    title: "Class of 2023 Yearbook",
    description: "The complete yearbook featuring graduates, campus events, and memorable moments from the academic year 2022-2023.",
    category: "Yearbooks",
    date: "December 2023",
    thumbnail: yearbookThumb,
  },
  {
    id: "2",
    title: "Campus Centennial Photos",
    description: "A curated collection of photographs documenting the institution's growth over the decades.",
    category: "Photographs",
    date: "November 2023",
    thumbnail: photosThumb,
  },
  {
    id: "3",
    title: "Research Journal Vol. 15",
    description: "The latest volume of the HCDC Research Journal featuring faculty and student research papers.",
    category: "Publications",
    date: "October 2023",
    thumbnail: publicationsThumb,
  },
];

const RecentAdditions = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="space-y-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/10">
              New Arrivals
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Recently Added
            </h2>
            <p className="text-muted-foreground max-w-lg">
              The latest additions to our digital archive, freshly digitized and cataloged for your exploration.
            </p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto">
            <Link to="/collections?sort=newest">
              View All New Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentItems.map((item, index) => (
            <Link
              key={item.id}
              to={`/material/${item.id}`}
              className="group archive-card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
                  {item.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    {item.category}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentAdditions;