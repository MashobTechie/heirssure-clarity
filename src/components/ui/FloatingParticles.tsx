import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "square" | "diamond";
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  color?: "primary" | "accent" | "mixed";
}

export function FloatingParticles({ count = 20, className = "", color = "mixed" }: FloatingParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      shape: (["circle", "square", "diamond"] as const)[Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, [count]);

  const getColor = (index: number) => {
    if (color === "primary") return "bg-primary";
    if (color === "accent") return "bg-accent";
    return index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-accent" : "bg-foreground";
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${getColor(particle.id)} ${
            particle.shape === "circle" ? "rounded-full" :
            particle.shape === "diamond" ? "rotate-45" : "rounded-sm"
          }`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity * 0.5, particle.opacity * 1.2, particle.opacity],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
