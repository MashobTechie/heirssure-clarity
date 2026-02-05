 import { motion, useInView } from "framer-motion";
 import { useRef } from "react";
 import { ArrowRight, MessageCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Link } from "react-router-dom";
 
 export function CTA() {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.3 });
 
   return (
     <motion.section
       ref={ref}
       initial={{ opacity: 0, y: 100 }}
       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
       transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
       className="py-20 md:py-28 min-h-[80vh] flex items-center"
     >
       <div className="container">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="relative overflow-hidden rounded-2xl bg-primary p-10 md:p-16 text-center"
         >
           {/* Background decoration */}
           <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
           </div>
 
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="relative z-10 max-w-2xl mx-auto"
           >
             <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
               Ready to experience transparent insurance?
             </h2>
             <p className="text-lg text-primary-foreground/80 mb-8">
               Try our live demo and see how HeirsSure brings clarity to your insurance journey.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button
                 asChild
                 size="lg"
                 className="bg-accent text-accent-foreground hover:bg-accent/90 group"
               >
                 <Link to="/demo">
                   <MessageCircle className="mr-2 h-5 w-5" />
                   Try Live Demo
                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </Button>
               <Button
                 asChild
                 size="lg"
                 variant="outline"
                 className="border-white/30 text-primary-foreground bg-white/10 hover:bg-white/20"
               >
                 <Link to="/dashboard">
                   View Dashboard
                 </Link>
               </Button>
             </div>
           </motion.div>
         </motion.div>
       </div>
     </motion.section>
   );
 }
