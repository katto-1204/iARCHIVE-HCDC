import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Download,
  ZoomIn,
  ZoomOut,
  Lock,
  Share2,
  Bookmark,
  Calendar,
  User,
  Tag,
  FileText,
  Globe,
  Building,
  MapPin,
  Scale,
  ExternalLink,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";

interface MaterialMetadata {
  title: string;
  creator: string;
  subject: string[];
  description: string;
  publisher: string;
  contributor: string;
  date: string;
  type: string;
  format: string;
  identifier: string;
  source: string;
  language: string;
  relation: string;
  coverage: string;
  rights: string;
}

// Mock data - would come from API
const mockMaterial: {
  id: string;
  title: string;
  category: string;
  accessLevel: "public" | "restricted";
  thumbnail: string;
  metadata: MaterialMetadata;
} = {
  id: "1",
  title: "Class of 2023 Yearbook",
  category: "Yearbooks",
  accessLevel: "public",
  thumbnail: "/placeholder.svg",
  metadata: {
    title: "Holy Cross of Davao College Yearbook 2023",
    creator: "HCDC Yearbook Committee",
    subject: ["Graduates", "Campus Life", "Academic Year 2022-2023", "Student Organizations"],
    description: "The complete yearbook featuring graduates, campus events, student organizations, and memorable moments from the academic year 2022-2023. This edition commemorates the achievements and milestones of the graduating class.",
    publisher: "Holy Cross of Davao College",
    contributor: "Office of Student Affairs, Photography Club",
    date: "2023-12-15",
    type: "Yearbook",
    format: "PDF, 245 pages",
    identifier: "HCDC-YB-2023-001",
    source: "HCDC Archives",
    language: "English, Filipino",
    relation: "Part of HCDC Yearbook Collection",
    coverage: "Academic Year 2022-2023, Davao City, Philippines",
    rights: "© 2023 Holy Cross of Davao College. All rights reserved.",
  },
};

const MaterialView = () => {
  const { id } = useParams();
  const [zoom, setZoom] = useState(100);
  const [accessRequestOpen, setAccessRequestOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: "", email: "", purpose: "" });
  const { toast } = useToast();

  // In production, fetch material by ID
  const material = mockMaterial;

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      if (direction === "in" && prev < 200) return prev + 25;
      if (direction === "out" && prev > 50) return prev - 25;
      return prev;
    });
  };

  const handleAccessRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "Your access request has been submitted for review. We'll notify you via email.",
    });
    setAccessRequestOpen(false);
    setRequestForm({ name: "", email: "", purpose: "" });
  };

  const metadataFields = [
    { key: "creator", label: "Creator", icon: User },
    { key: "publisher", label: "Publisher", icon: Building },
    { key: "date", label: "Date", icon: Calendar },
    { key: "type", label: "Type", icon: FileText },
    { key: "format", label: "Format", icon: FileText },
    { key: "language", label: "Language", icon: Globe },
    { key: "coverage", label: "Coverage", icon: MapPin },
    { key: "rights", label: "Rights", icon: Scale },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Breadcrumb Header */}
        <section className="bg-muted/30 border-b">
          <ScrollReveal direction="right" delay={0.1}>
            <div className="container py-4">
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Collections
              </Link>
            </div>
          </ScrollReveal>
        </section>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Document Viewer */}
            <div className="lg:col-span-2 space-y-4">
              {/* Viewer Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {material.category}
                  </Badge>
                  {material.accessLevel === "restricted" && (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                      <Lock className="h-3 w-3 mr-1" />
                      Restricted
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleZoom("out")} disabled={zoom <= 50}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[4rem] text-center">
                    {zoom}%
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => handleZoom("in")} disabled={zoom >= 200}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Document Preview */}
              <ScrollReveal direction="up" delay={0.2}>
                <Card className="overflow-hidden">
                  <div
                    className="aspect-[4/3] bg-muted flex items-center justify-center relative"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center" }}
                  >
                    <img
                      src={material.thumbnail}
                      alt={material.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </Card>
              </ScrollReveal>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {material.accessLevel !== "restricted" ? (
                  <Button className="bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                ) : (
                  <Dialog open={accessRequestOpen} onOpenChange={setAccessRequestOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent hover:bg-accent/90">
                        <Lock className="h-4 w-4 mr-2" />
                        Request Access
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Access</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to request access to this restricted material.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAccessRequest} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={requestForm.name}
                            onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={requestForm.email}
                            onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="purpose">Purpose of Access</Label>
                          <Textarea
                            id="purpose"
                            placeholder="Please explain why you need access to this material..."
                            value={requestForm.purpose}
                            onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
                            required
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button type="submit" className="flex-1">Submit Request</Button>
                          <Button type="button" variant="outline" onClick={() => setAccessRequestOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Metadata Panel */}
            <ScrollReveal direction="left" delay={0.3}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{material.metadata.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="details">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="metadata">Metadata</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4 pt-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">
                            {material.metadata.description}
                          </p>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium text-foreground mb-3">Subjects</h4>
                          <div className="flex flex-wrap gap-2">
                            {material.metadata.subject.map((subject) => (
                              <Badge key={subject} variant="secondary">
                                <Tag className="h-3 w-3 mr-1" />
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          {metadataFields.slice(0, 4).map((field) => (
                            <div key={field.key} className="flex items-start gap-3">
                              <field.icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-xs text-muted-foreground">{field.label}</p>
                                <p className="text-sm text-foreground">
                                  {material.metadata[field.key as keyof MaterialMetadata]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="metadata" className="space-y-4 pt-4">
                        <p className="text-xs text-muted-foreground mb-4">
                          Dublin Core metadata standard
                        </p>
                        <div className="space-y-4">
                          {Object.entries(material.metadata).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                dc:{key}
                              </p>
                              <p className="text-sm text-foreground">
                                {Array.isArray(value) ? value.join(", ") : value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Related Materials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Materials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { id: "5", title: "Class of 2022 Yearbook" },
                      { id: "7", title: "Student Newspaper Archives 1980-1990" },
                    ].map((item) => (
                      <Link
                        key={item.id}
                        to={`/material/${item.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-12 h-12 bg-muted rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary truncate">
                            {item.title}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialView;