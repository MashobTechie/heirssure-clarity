 import { motion, useInView } from "framer-motion";
 import { useRef } from "react";
 import { MessageCircle, Brain, FileText, CheckCircle } from "lucide-react";
 
 const steps = [
   {
     icon: MessageCircle,
     step: "01",
     title: "Start a Chat",
     description: "Send a message to our WhatsApp number. Ask about your claim or insurance rights in English or Pidgin.",
   },
   {
     icon: Brain,
     step: "02", 
     title: "AI Understands",
     description: "Our AI detects your intent — whether it's a claim status check, legal question, or document request.",
   },
   {
     icon: FileText,
     step: "03",
     title: "Retrieves Information",
     description: "The system pulls your claim data and references relevant sections from Nigerian insurance law.",
   },
   {
     icon: CheckCircle,
     step: "04",
     title: "Clear Response",
     description: "You receive a helpful, legally-referenced answer. Complex issues get escalated to human agents.",
   },
 ];
 
 export function HowItWorks() {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.2 });
 
   return (
     <motion.section
       ref={ref}
       initial={{ opacity: 0, y: 100 }}
       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
       transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
       className="py-20 md:py-28 bg-muted/30 min-h-screen flex items-center"
     >
       <div className="container">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-center max-w-2xl mx-auto mb-14"
         >
           <h2 className="text-3xl md:text-4xl font-bold mb-4">
             How It Works
           </h2>
           <p className="text-lg text-muted-foreground">
             Simple, transparent, and designed for real insurance workflows.
           </p>
         </motion.div>
 
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {steps.map((step, index) => (
             <motion.div
               key={step.step}
               initial={{ opacity: 0, y: 50 }}
               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
               transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
               className="relative"
             >
               {/* Connector Line */}
               {index < steps.length - 1 && (
                 <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
               )}
               
               <div className="relative bg-card rounded-xl border border-border p-6 h-full">
                 {/* Step Number */}
                 <div className="absolute -top-3 left-6 px-2 py-0.5 bg-accent text-accent-foreground text-xs font-bold rounded">
                   {step.step}
                 </div>
                 
                 <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-4 mt-2">
                   <step.icon className="h-5 w-5 text-primary-foreground" />
                 </div>
                 
                 <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   {step.description}
                 </p>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </motion.section>
   );
 }
