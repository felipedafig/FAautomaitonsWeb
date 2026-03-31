"use client";

import { motion, useSpring } from "framer-motion";
import React, {
  memo,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import confetti from "canvas-confetti";
import { Check, Star as LucideStar, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { InlineWidget } from "react-calendly";
import NumberFlow from "@number-flow/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY FUNCTIONS ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

// --- BASE UI COMPONENTS (BUTTON) ---

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

// --- INTERACTIVE STARFIELD ---

// Pre-generate static positions to avoid re-calculation
const STAR_COUNT = 30; // Reduced from 150 to 30

interface StarData {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const generateStars = (): StarData[] => {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1 + Math.random() * 2,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  }));
};

const staticStars = generateStars();

const Star = memo(function Star({
  data,
  mouseX,
  mouseY,
  containerRect,
}: {
  data: StarData;
  mouseX: number | null;
  mouseY: number | null;
  containerRect: DOMRect | null;
}) {
  // Only calculate spring values when mouse is within range
  const springX = useSpring(0, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!containerRect || mouseX === null || mouseY === null) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const starX =
      containerRect.left + (parseFloat(data.left) / 100) * containerRect.width;
    const starY =
      containerRect.top + (parseFloat(data.top) / 100) * containerRect.height;

    const deltaX = mouseX - starX;
    const deltaY = mouseY - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 300; // Reduced from 600

    if (distance < radius) {
      const force = 1 - distance / radius;
      springX.set(deltaX * force * 0.3);
      springY.set(deltaY * force * 0.3);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mouseX, mouseY, data.left, data.top, containerRect, springX, springY]);

  return (
    <motion.div
      className="absolute bg-foreground rounded-full will-change-transform"
      style={{
        top: data.top,
        left: data.left,
        width: data.size,
        height: data.size,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{
        duration: data.duration,
        repeat: Infinity,
        delay: data.delay,
        ease: "easeInOut",
      }}
    />
  );
});

const InteractiveStarfield = memo(function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  // Update container rect less frequently
  useEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    
    // Update on resize only
    const resizeObserver = new ResizeObserver(updateRect);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [containerRef]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {staticStars.map((star) => (
        <Star
          key={star.id}
          data={star}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          containerRect={containerRect}
        />
      ))}
    </div>
  );
});

// --- THROTTLED MOUSE HANDLER ---

// Throttle function for mouse move
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// --- PRICING COMPONENT LOGIC ---

// Interfaces
interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  calendlyUrl?: string;
}

// Context for state management
const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
  calendlyUrl?: string;
}>({
  isMonthly: true,
  setIsMonthly: () => {},
});

// Main PricingSection Component
export function PricingSection({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you. All plans include our core features and support.",
  calendlyUrl,
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly, calendlyUrl }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative w-full bg-background dark:bg-neutral-950 py-20 sm:py-24"
      >
        <InteractiveStarfield
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-neutral-900 dark:text-white">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg whitespace-pre-line">
              {description}
            </p>
          </div>
          <PricingToggle />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-start gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

// Pricing Toggle Component
function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--background))",
          "hsl(var(--accent))",
        ],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div ref={confettiRef} className="relative flex w-fit items-center rounded-full bg-muted p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary p-1"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            !isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Annual
          <span
            className={cn(
              "hidden sm:inline",
              !isMonthly ? "text-primary-foreground/80" : "",
            )}
          >
            {" "}
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

// Signup Modal Component (two-step: form → Calendly)
function SignupModal({
  open,
  onOpenChange,
  planName,
  calendlyUrl,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  calendlyUrl?: string;
}) {
  const [step, setStep] = useState<"form" | "calendly">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(
        "https://formsubmit.co/ajax/filip.almeida@faautomations.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      );
      setStep("calendly");
    } catch {
      // Still advance — FormSubmit may block CORS on first use
      setStep("calendly");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (value: boolean) => {
    onOpenChange(value);
    if (!value) {
      // Reset after close animation
      setTimeout(() => setStep("form"), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={cn(
        "transition-all duration-300",
        step === "calendly" ? "sm:max-w-2xl" : "sm:max-w-md",
      )}>
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Get Started with {planName}</DialogTitle>
              <DialogDescription>
                Tell us a bit about yourself and we&apos;ll set everything up
                for you.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value={`New signup: ${planName} plan`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="plan" value={planName} />
              <div className="space-y-2">
                <Label htmlFor={`signup-name-${planName}`}>Name</Label>
                <Input
                  id={`signup-name-${planName}`}
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`signup-email-${planName}`}>Email</Label>
                <Input
                  id={`signup-email-${planName}`}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`signup-property-${planName}`}>
                  Property / Hotel Name
                </Label>
                <Input
                  id={`signup-property-${planName}`}
                  name="property"
                  placeholder="e.g. Seaside Boutique Hotel"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <DialogTitle>You&apos;re signed up!</DialogTitle>
              </div>
              <DialogDescription>
                Now let&apos;s schedule a quick call to get your automations
                running.
              </DialogDescription>
            </DialogHeader>
            {calendlyUrl ? (
              <div className="h-[520px] -mx-6 -mb-6">
                <InlineWidget
                  url={calendlyUrl}
                  styles={{ height: "100%", width: "100%" }}
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                We&apos;ll be in touch shortly to schedule your onboarding
                call.
              </p>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Pricing Card Component
function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly, calendlyUrl } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const isTailored = isNaN(Number(plan.price));

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      className={cn(
        "rounded-2xl flex flex-col relative bg-background/70 backdrop-blur-sm",
        plan.isPopular
          ? "border-2 border-primary shadow-xl p-8 lg:p-10"
          : isTailored
            ? "border border-violet-500/30 p-8"
            : "border border-border p-8",
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-primary py-1.5 px-4 rounded-full flex items-center gap-1.5">
            <LucideStar className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground text-sm font-semibold">
              Most Popular
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        {!isTailored && (
          <>
            <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {plan.description}
            </p>
          </>
        )}
        <div className={cn("flex items-baseline justify-center gap-x-1", isTailored ? "mt-2" : "mt-6")}>
          <span className={cn(
            "font-bold tracking-tight",
            isTailored
              ? "text-6xl bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent"
              : "text-5xl text-foreground",
          )}>
            {isTailored ? (
              plan.price
            ) : (
              <NumberFlow
                value={
                  isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                }
                format={{
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                }}
                className="font-variant-numeric: tabular-nums"
              />
            )}
          </span>
          {!isTailored && (
            <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
              / {plan.period}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isTailored ? "You choose, we build" : isMonthly ? "Billed Monthly" : "Billed Annually"}
        </p>

        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-left text-muted-foreground"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          {isTailored ? (
            <>
              <button
                onClick={() => setIsSignupOpen(true)}
                className="w-full h-11 rounded-md px-8 text-sm font-medium relative overflow-hidden bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-purple-500/20 border border-violet-400/40 text-violet-300 hover:border-violet-400/70 hover:from-blue-500/30 hover:via-violet-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                {plan.buttonText}
              </button>
              <SignupModal
                open={isSignupOpen}
                onOpenChange={setIsSignupOpen}
                planName={plan.name}
                calendlyUrl={calendlyUrl}
              />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
