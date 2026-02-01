import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import AboutSection from "@/components/home/AboutSection";
import RecentAdditions from "@/components/home/RecentAdditions";
import CTASection from "@/components/home/CTASection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxSection from "@/components/ui/ParallaxSection";

const Index = () => {
  return (
    <Layout>
      <ParallaxSection offset={100}>
        <HeroSection />
      </ParallaxSection>
      <ScrollReveal direction="up" delay={0.2}>
        <FeaturedCollections />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.3}>
        <RecentAdditions />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.2}>
        <CTASection />
      </ScrollReveal>
    </Layout>
  );
};

export default Index;