"use client"

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What exactly does FA Automations do?",
    answer: "We build custom automation workflows for hotels, vacation rentals, and property managers. This includes automated guest messaging, booking synchronization across platforms like Airbnb and Booking.com, cleaning and maintenance scheduling, review management, and more — all tailored to how your property operates.",
    category: "Services",
  },
  {
    question: "Which booking platforms do you integrate with?",
    answer: "We integrate with all major platforms including Airbnb, Booking.com, Vrbo, Expedia, and most property management systems (PMS). Our workflows sync bookings, calendars, and guest data across all your channels so nothing falls through the cracks.",
    category: "Integrations",
  },
  {
    question: "How long does it take to set up?",
    answer: "Most properties are fully up and running within 1–2 weeks. We handle the entire setup process — connecting your platforms, configuring your messaging templates, and testing everything before going live. No technical knowledge required on your end.",
    category: "Getting Started",
  },
  {
    question: "How does the pricing work?",
    answer: "We offer three plans starting at €29/month based on the number of properties and features you need. Annual billing saves you 20%. All plans include a free trial so you can see the results before committing.",
    category: "Pricing",
  },
  {
    question: "Will guests know the messages are automated?",
    answer: "No — our messages are crafted to feel personal and natural. You can fully customize every template with your tone of voice, property details, and local recommendations. Guests will think you're personally replying every time.",
    category: "Features",
  },
  {
    question: "What if I need something custom for my property?",
    answer: "That's exactly what we specialize in. Every property is different, so we work with you to design workflows that match your specific operations — whether it's coordinating multiple cleaning teams, managing seasonal pricing, or integrating with tools you already use.",
    category: "Support",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

function FAQCard({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div variants={itemVariants}>
      <Card
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card backdrop-blur-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-full p-6 text-left"
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <HelpCircle className="h-5 w-5 text-primary" />
            </motion.div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-xs uppercase tracking-wider text-primary"
                >
                  {faq.category}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                {faq.question}
              </h3>
            </div>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-14">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        </button>
      </Card>
    </motion.div>
  );
}

export function FAQSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="faq-section-heading"
      className="relative w-full overflow-hidden px-4 py-20 sm:px-6 lg:px-10"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.1, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: shouldReduceMotion ? 0.6 : 12,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
          className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : [1.1, 1, 1.1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: shouldReduceMotion ? 0.6 : 10,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-emerald-400/15 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-12 text-center"
        >
          <motion.div className="mb-4 inline-block">
            <Badge
              className="gap-2 bg-primary/10 text-primary backdrop-blur"
              variant="secondary"
            >
              <Sparkles className="h-3 w-3" aria-hidden />
              FAQ
            </Badge>
          </motion.div>

          <motion.h2
            id="faq-section-heading"
            className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Frequently Asked{" "}
            <span className="text-primary">
              Questions
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Everything you need to know about our automation services. Can&apos;t find your answer? Reach out — we&apos;re happy to help.
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4"
        >
          {faqs.map((faq, index) => (
            <FAQCard key={index} faq={faq} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >

        </motion.div>
      </div>
    </section>
  );
}
