 import { motion, useInView } from "framer-motion";
 import { useRef, ReactNode } from "react";
 
 interface ScrollSectionProps {
   children: ReactNode;
   className?: string;
 }
 
 export function ScrollSection({ children, className = "" }: ScrollSectionProps) {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.2 });
 
   return (
     <motion.div
       ref={ref}
       initial={{ opacity: 0, y: 100 }}
       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
       transition={{
         duration: 0.8,
         ease: [0.25, 0.4, 0.25, 1],
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 }
 
 interface StaggerChildProps {
   children: ReactNode;
   index?: number;
   className?: string;
 }
 
 export function StaggerChild({ children, index = 0, className = "" }: StaggerChildProps) {
   const ref = useRef<HTMLDivElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.3 });
 
   return (
     <motion.div
       ref={ref}
       initial={{ opacity: 0, y: 50 }}
       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
       transition={{
         duration: 0.6,
         delay: index * 0.1,
         ease: [0.25, 0.4, 0.25, 1],
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 }