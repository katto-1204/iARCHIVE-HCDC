import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Grid, List, Calendar, Tag, Eye, Lock, SlidersHorizontal, X } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  accessLevel: "public" | "restricted";
  thumbnail: string;
  subjects: string[];
}

const mockItems: ArchiveItem[] = [
  {
    id: "1",
    title: "Class of 2023 Yearbook",
    description: "Complete yearbook featuring graduates, campus events, and memorable moments from AY 2022-2023.",
    category: "Yearbooks",
    date: "2023-12-15",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Graduates", "Campus Life", "2023"],
  },
  {
    id: "2",
    title: "Campus Centennial Photo Collection",
    description: "A curated collection of photographs documenting the institution's growth over 75 years.",
    category: "Photographs",
    date: "2023-11-20",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Campus", "History", "Centennial"],
  },
  {
    id: "3",
    title: "Research Journal Volume 15",
    description: "Latest volume featuring faculty and student research papers across various disciplines.",
    category: "Publications",
    date: "2023-10-01",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Research", "Academic", "Faculty"],
  },
  {
    id: "4",
    title: "Founding Charter Documents",
    description: "Original founding documents and correspondence from the institution's establishment.",
    category: "Documents",
    date: "1950-01-15",
    accessLevel: "restricted",
    thumbnail: "/placeholder.svg",
    subjects: ["History", "Founding", "Charter"],
  },
  {
    id: "5",
    title: "Class of 2022 Yearbook",
    description: "Yearbook commemorating the achievements and memories of the Class of 2022.",
    category: "Yearbooks",
    date: "2022-12-15",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Graduates", "Campus Life", "2022"],
  },
  {
    id: "6",
    title: "Sports Championship Gallery",
    description: "Photos and memorabilia from institutional sports championships throughout the decades.",
    category: "Photographs",
    date: "2023-08-10",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Sports", "Athletics", "Championships"],
  },
  {
    id: "7",
    title: "Student Newspaper Archives 1980-1990",
    description: "Digitized collection of student newspapers from the 1980s decade.",
    category: "Publications",
    date: "1990-12-31",
    accessLevel: "public",
    thumbnail: "/placeholder.svg",
    subjects: ["Students", "Newspaper", "1980s"],
  },
  {
    id: "8",
    title: "Administrative Records 1960-1970",
    description: "Administrative correspondence and meeting minutes from the early institutional period.",
    category: "Documents",
    date: "1970-12-31",
    accessLevel: "restricted",
    thumbnail: "/placeholder.svg",
    subjects: ["Administration", "Records", "1960s"],
  },
];

const categories = ["All", "Yearbooks", "Photographs", "Publications", "Documents"];

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const sortBy = searchParams.get("sort") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const itemsPerPage = 6;

  const filteredItems = useMemo(() => {
    let items = [...mockItems];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.subjects.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Sort
    items.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return items;
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "All" && value !== "") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || sortBy !== "newest";

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <ParallaxSection offset={50}>
          <section className="bg-muted/30 border-b">
            <div className="container py-8 md:py-12">
              <ScrollReveal direction="right" delay={0.1}>
                <div className="max-w-2xl">
                  <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                    Browse
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Archive Collections
                  </h1>
                  <p className="text-muted-foreground">
                    Explore our digitized collections of yearbooks, photographs, publications, and historical documents.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ParallaxSection>

        {/* Search and Filters */}
        <section className="border-b sticky top-16 bg-background z-40">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title, subject, or keyword..."
                  value={searchQuery}
                  onChange={(e) => updateSearchParams("search", e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-3">
                <Select value={selectedCategory} onValueChange={(value) => updateSearchParams("category", value)}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => updateSearchParams("sort", value)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="flex flex-col gap-3 pt-4 md:hidden animate-fade-in">
                <Select value={selectedCategory} onValueChange={(value) => updateSearchParams("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => updateSearchParams("sort", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 pt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateSearchParams("search", "")}
                    />
                  </Badge>
                )}
                {selectedCategory !== "All" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateSearchParams("category", "All")}
                    />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="container py-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedItems.length} of {filteredItems.length} results
            </p>
          </div>

          {/* Items Grid/List */}
          {paginatedItems.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {paginatedItems.map((item, index) => (
                <ScrollReveal
                  key={item.id}
                  direction="up"
                  delay={0.05 * (index % itemsPerPage)}
                >
                  <Link
                    to={`/material/${item.id}`}
                    className={`group ${viewMode === "list" ? "block" : ""}`}
                  >
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden h-full hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge className="bg-primary/90">{item.category}</Badge>
                            {item.accessLevel === "restricted" && (
                              <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                                <Lock className="h-3 w-3 mr-1" />
                                Restricted
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="hover:shadow-card-hover transition-all duration-300">
                        <CardContent className="p-4 flex gap-4">
                          <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <div className="flex gap-2 flex-shrink-0">
                                <Badge variant="secondary">{item.category}</Badge>
                                {item.accessLevel === "restricted" && (
                                  <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                                    <Lock className="h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Tag className="h-3.5 w-3.5" />
                                {item.subjects.slice(0, 2).join(", ")}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => updateSearchParams("page", String(Math.max(1, currentPage - 1)))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => updateSearchParams("page", String(page))}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => updateSearchParams("page", String(Math.min(totalPages, currentPage + 1)))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Collections;