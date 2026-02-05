 import { ArrowRight, MessageCircle, Shield, CheckCircle } from "lucide-react";
 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef } from "react";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 
 export function Hero() {
   const ref = useRef<HTMLElement>(null);
   const { scrollYProgress } = useScroll({
     target: ref,
     offset: ["start start", "end start"]
   });
 
   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
   const opacityRange = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
 
   return (
     <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-primary via-primary to-primary/95 text-primary-foreground min-h-[100svh] flex flex-col justify-center">
       {/* Parallax Background Elements */}
       <motion.div 
         className="absolute inset-0 opacity-20"
         style={{ y: backgroundY }}
       >
         <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
         <div className="absolute top-40 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
         <div className="absolute bottom-32 left-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
       </motion.div>
 
       {/* Floating geometric shapes */}
       <motion.div
         className="absolute inset-0 pointer-events-none"
         style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
       >
         <div className="absolute top-1/4 left-[10%] w-4 h-4 rotate-45 border-2 border-white/20" />
         <div className="absolute top-1/3 right-[15%] w-6 h-6 rounded-full border-2 border-accent/30" />
         <div className="absolute bottom-1/3 left-[20%] w-3 h-3 bg-white/10 rotate-45" />
         <div className="absolute top-1/2 right-[25%] w-8 h-8 rounded-full border border-white/10" />
       </motion.div>
 
       {/* Original gradient pattern */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute inset-0" style={{
           backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
         }} />
       </div>
 
       <motion.div 
         className="container relative py-16 px-4 md:py-28 lg:py-32"
         style={{ y: textY, opacity: opacityRange }}
       >
         <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
           {/* Trust Badge */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-medium backdrop-blur-sm"
           >
             <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent" />
             <span className="hidden sm:inline">NAICOM Regulated • Insurance Act 2003 Compliant</span>
             <span className="sm:hidden">NAICOM Regulated</span>
           </motion.div>
 
           {/* Headline */}
           <motion.h1
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.4 }}
             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
           >
             Insurance clarity on{" "}
             <span className="text-accent">WhatsApp</span>.
           </motion.h1>
 
           {/* Subheadline */}
           <motion.p
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.6 }}
             className="text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed px-2"
           >
             Check claims, understand coverage, and know your rights — instantly. 
             Your trusted AI assistant for Nigerian insurance, available 24/7.
           </motion.p>
 
           {/* Feature Pills */}
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.8 }}
             className="flex flex-wrap justify-center gap-2 md:gap-3 text-xs md:text-sm"
           >
             {["Claim Status", "Legal Rights", "Document Requests", "Pidgin Support"].map((feature) => (
               <span
                 key={feature}
                 className="inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/10 border border-white/10"
               >
                 <CheckCircle className="h-3 w-3 md:h-3.5 md:w-3.5 text-accent" />
                 {feature}
               </span>
             ))}
           </motion.div>
 
           {/* CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 1 }}
             className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4"
           >
             <Button
               asChild
               size="lg"
               className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg group w-full sm:w-auto"
             >
               <Link to="/demo">
                 <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                 View Live Demo
                 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </Link>
             </Button>
             <Button
               asChild
               size="lg"
               variant="outline"
               className="border-white/30 text-primary-foreground bg-white/10 hover:bg-white/20 w-full sm:w-auto"
             >
               <Link to="/dashboard">
                 Explore Dashboard
               </Link>
             </Button>
           </motion.div>
 
           {/* Stats */}
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 1.2 }}
             className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-12 max-w-lg mx-auto"
           >
             {[
               { value: "50K+", label: "Claims Processed" },
               { value: "< 24hrs", label: "Avg Response" },
               { value: "98%", label: "Resolution Rate" },
             ].map((stat) => (
               <div key={stat.label} className="text-center">
                 <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                 <div className="text-xs md:text-sm text-primary-foreground/70">{stat.label}</div>
               </div>
             ))}
           </motion.div>
         </div>
       </motion.div>
 
       {/* Bottom Wave */}
       <div className="absolute bottom-0 left-0 right-0">
         <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path
             d="M0 80V40C240 0 480 0 720 20C960 40 1200 80 1440 60V80H0Z"
             fill="hsl(var(--background))"
           />
         </svg>
       </div>
     </section>
   );
 }
