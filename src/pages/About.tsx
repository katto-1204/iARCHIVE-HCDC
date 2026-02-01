import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Search, Users, Clock, Award } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";

const features = [
  {
    icon: Shield,
    title: "Secure Preservation",
    description: "All materials are stored with enterprise-grade security and multiple redundant backups to ensure permanent preservation of institutional records.",
  },
  {
    icon: Search,
    title: "Advanced Discovery",
    description: "Our search engine uses Dublin Core metadata standards to enable precise discovery across titles, subjects, dates, and full-text content.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Open to students, alumni, faculty, researchers, and the general public with appropriate role-based access controls.",
  },
  {
    icon: Clock,
    title: "Historical Depth",
    description: "Access materials spanning over 75 years of institutional history, from founding documents to recent yearbooks.",
  },
];

const milestones = [
  { year: "1950", event: "Holy Cross of Davao College founded" },
  { year: "1960", event: "First official yearbook published" },
  { year: "1985", event: "Archives department established" },
  { year: "2020", event: "Digitization initiative launched" },
  { year: "2024", event: "iArchive digital platform launched" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <ParallaxSection offset={100}>
        <section className="bg-muted/30 border-b py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  About iArchive
                </Badge>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Preserving Our Institutional Heritage
                </h1>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg text-muted-foreground">
                  iArchive is the official digital repository of Holy Cross of Davao College,
                  dedicated to preserving, organizing, and providing access to our rich institutional history
                  for current and future generations.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Mission Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground">
                  To digitize, preserve, catalog, and make accessible the historical records of
                  Holy Cross of Davao College, ensuring that our institutional memory endures
                  and remains available for research, education, and community engagement.
                </p>
                <div className="space-y-4">
                  {[
                    "Preserve institutional records in digital format",
                    "Provide accessible archives to researchers and alumni",
                    "Document and celebrate our institutional heritage",
                    "Support academic research and historical study",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center space-y-2 p-8">
                      <Award className="h-16 w-16 mx-auto text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">75+ Years of History</h3>
                      <p className="text-muted-foreground">Preserving our heritage since 1950</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with modern technology to provide the best experience for exploring our archives.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} direction="up" delay={0.2 + (index * 0.1)}>
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key milestones in the history of Holy Cross of Davao College and its archives.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <ScrollReveal key={milestone.year} direction="up" delay={0.1 * index}>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        {milestone.year}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="text-foreground font-medium">{milestone.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Archival Standards</h2>
              <p className="text-muted-foreground">
                iArchive follows internationally recognized archival standards to ensure
                interoperability, discoverability, and long-term preservation of our digital collections.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  Dublin Core Metadata
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  ISAD(G) Standards
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  OAIS Reference Model
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  WCAG 2.1 Accessibility
                </Badge>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;