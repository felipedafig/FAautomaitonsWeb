import { Hero } from "@workspace/ui/components/animated-hero"
import { HeroInfoCard } from "@workspace/ui/components/hero-info-card"
import { GlowingEffect } from "@workspace/ui/components/glowing-effect"
import { WebGLShader } from "@workspace/ui/components/web-gl-shader"
import { TestimonialsSection } from "@workspace/ui/components/testimonials-with-marquee"
import { PricingSection } from "@workspace/ui/components/pricing"
import { Header } from "@workspace/ui/components/header-1"
import { FAQSection } from "@workspace/ui/components/faq-section"
import { Footerdemo } from "@workspace/ui/components/footer-section"
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none will-change-transform", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 bg-background/80 backdrop-blur-sm">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Page() {
  return (
    <div className="relative min-h-svh">
      <Header />
      <div className="container mx-auto px-4">
        <div className="grid gap-8 py-12 lg:py-20 items-center lg:grid-cols-2">
          <Hero calendlyUrl={process.env.NEXT_PUBLIC_CALENDLY_URL} />
          <div className="flex justify-center lg:justify-end">
            <HeroInfoCard />
          </div>
        </div>
      </div>
      <div className="relative will-change-transform" style={{ contentVisibility: 'auto' }}>
        <div className="absolute inset-0 -z-10">
          <WebGLShader />
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/5] xl:[grid-area:1/1/2/5]"
              icon={<Box className="h-4 w-4" />}
              title="Do things the right way"
              description="Running out of copy so I'll write anything."
            />
            <GridItem
              area="md:[grid-area:1/5/2/9] xl:[grid-area:1/5/2/9]"
              icon={<Settings className="h-4 w-4" />}
              title="The best AI code editor ever."
              description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
            />
            <GridItem
              area="md:[grid-area:1/9/3/13] xl:[grid-area:1/9/3/13]"
              icon={<Lock className="h-4 w-4" />}
              title="You should buy Aceternity UI Pro"
              description="It's the best money you'll ever spend"
            />
            <GridItem
              area="md:[grid-area:2/1/3/9] xl:[grid-area:2/1/3/9]"
              icon={<Sparkles className="h-4 w-4" />}
              title="This card is also built by Cursor"
              description="I'm not even kidding. Ask my mom if you don't believe me."
            />
          </ul>
        </div>
      </div>
      <TestimonialsSection
        title="Trusted by developers worldwide"
        description="Join thousands of developers who are already building the future with our AI platform"
        testimonials={[
          {
            author: {
              name: "Emma Thompson",
              handle: "@emmaai",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
            },
            text: "Using this AI platform has transformed how we handle data analysis. The speed and accuracy are unprecedented.",
            href: "https://twitter.com/emmaai"
          },
          {
            author: {
              name: "David Park",
              handle: "@davidtech",
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            text: "The API integration is flawless. We've reduced our development time by 60% since implementing this solution.",
            href: "https://twitter.com/davidtech"
          },
          {
            author: {
              name: "Sofia Rodriguez",
              handle: "@sofiaml",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
            },
            text: "Finally, an AI tool that actually understands context! The accuracy in natural language processing is impressive."
          }
        ]}
      />
      <PricingSection
        plans={[
          {
            name: "Starter",
            price: "50",
            yearlyPrice: "40",
            period: "month",
            features: [
              "Up to 10 projects",
              "Basic analytics",
              "48-hour support response time",
              "Limited API access",
              "Community support",
            ],
            description: "Perfect for individuals and small projects.",
            buttonText: "Start Free Trial",
            href: "#",
          },
          {
            name: "Professional",
            price: "99",
            yearlyPrice: "79",
            period: "month",
            features: [
              "Unlimited projects",
              "Advanced analytics",
              "24-hour support response time",
              "Full API access",
              "Priority support & Team collaboration",
            ],
            description: "Ideal for growing teams and businesses.",
            buttonText: "Get Started",
            href: "#",
            isPopular: true,
          },
          {
            name: "Enterprise",
            price: "299",
            yearlyPrice: "239",
            period: "month",
            features: [
              "Everything in Professional",
              "Custom solutions & integrations",
              "Dedicated account manager",
              "SSO Authentication & Advanced security",
            ],
            description: "For large organizations with specific needs.",
            buttonText: "Contact Sales",
            href: "#",
          },
        ]}
        title="Find the Perfect Plan"
        description="Select the ideal package for your needs and start building today."
      />
      <FAQSection />
      <Footerdemo />
    </div>
  )
}
