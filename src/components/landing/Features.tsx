import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  MessageSquare, 
  FileSearch, 
  Scale, 
  Clock, 
  Languages, 
  ShieldCheck 
} from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp Native",
    description: "Chat naturally on WhatsApp. No app downloads, no learning curve. Just text your questions.",
  },
  {
    icon: FileSearch,
    title: "Smart Claim Tracking",
    description: "Get real-time updates on your claim status. Track every step from submission to settlement.",
  },
  {
    icon: Scale,
    title: "Legal Rights Access",
    description: "Understand your rights under the Insurance Act 2003 and NAICOM guidelines with accurate references.",
  },
  {
    icon: Clock,
    title: "90-Day Compliance",
    description: "Auto-flag claims exceeding regulatory timelines. Know when your insurer is overdue.",
  },
  {
    icon: Languages,
    title: "English & Pidgin",
    description: "Communicate in your preferred language. We understand both formal English and Nigerian Pidgin.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Aligned",
    description: "Built with NAICOM compliance in mind. Every response references official insurance regulations.",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const floatY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="py-20 md:py-28 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Floating Particles */}
      <FloatingParticles count={15} color="primary" className="opacity-30" />

      {/* Parallax background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: floatY }}
      >
        <div className="absolute top-1/4 right-[5%] w-20 h-20 border border-primary/10 rounded-2xl rotate-12" />
        <div className="absolute bottom-1/4 left-[8%] w-16 h-16 border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-[3%] w-3 h-3 bg-primary/20 rounded-full" />
        <div className="absolute bottom-1/3 right-[10%] w-4 h-4 bg-primary/15 rotate-45" />
      </motion.div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Nigerian Insurance
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand, track, and advocate for your insurance claims.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-card-hover transition-all duration-300 hover:border-primary/20"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
