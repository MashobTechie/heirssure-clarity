 import { motion, useInView } from "framer-motion";
 import { useRef } from "react";
 import { AlertTriangle } from "lucide-react";
 
 export function Disclaimer() {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.3 });
 
   return (
     <motion.section
       ref={ref}
       initial={{ opacity: 0, y: 80 }}
       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
       transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
       className="py-16 bg-primary/5 border-y border-border"
     >
       <div className="container">
         <div className="max-w-3xl mx-auto">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border"
           >
             <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
               <AlertTriangle className="h-5 w-5 text-warning" />
             </div>
             <div>
               <h3 className="font-semibold mb-2">Legal Disclaimer</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                 HeirsSure provides informational guidance based on Nigerian insurance laws and regulations. 
                 This service does not constitute legal advice. All references to the Insurance Act 2003, 
                 NAICOM Guidelines, and related regulations are for informational purposes only. 
                 For specific legal matters, please consult a qualified insurance lawyer or contact NAICOM directly.
               </p>
             </div>
           </motion.div>
         </div>
       </div>
     </motion.section>
   );
 }
