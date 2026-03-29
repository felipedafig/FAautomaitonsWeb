"use client";

import { motion } from "framer-motion";
import { MessageCircle, BotMessageSquare, CalendarCheck, BellRing } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Guest Communication",
    description:
      "Automated welcomes, check-in instructions, and review requests via WhatsApp or Email.",
  },
  {
    icon: BotMessageSquare,
    title: "AI Virtual Receptionist",
    description:
      "24/7 AI agent handling inquiries, local tips, and real-time issue resolution.",
  },
  {
    icon: CalendarCheck,
    title: "Housekeeping Management",
    description:
      "Auto-triggered cleaning tasks on check-out with live room readiness tracking.",
  },
  {
    icon: BellRing,
    title: "Early Check-In Alerts",
    description:
      "Guests are notified the moment their room is ready, even before scheduled check-in.",
  },
];

export function HeroInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[34rem]"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl">
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />

        <div className="p-5">
          {/* Header */}
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/30">
            What we do
          </p>

          {/* Features 2x2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.08, duration: 0.35 }}
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05]"
              >
                <feature.icon className="mb-2 h-5 w-5 text-violet-400" />
                <h4 className="mb-1 text-base font-medium text-white/90">
                  {feature.title}
                </h4>
                <p className="text-sm leading-relaxed text-white/40">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
