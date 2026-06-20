"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GlobalBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random bubbles/lights
  const bubbles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 200 + 100, // 100px to 300px
    x: Math.random() * 100, // 0 to 100vw
    y: Math.random() * 100, // 0 to 100vh
    duration: Math.random() * 30 + 20, // 20s to 50s
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#050505]">
      {/* Animated gold lights */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-[#e6c18f]/5 blur-[80px]"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}vw`,
            top: `${bubble.y}vh`,
          }}
          animate={{
            y: ["0vh", "-15vh", "15vh", "0vh"],
            x: ["0vw", "10vw", "-10vw", "0vw"],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay,
          }}
        />
      ))}
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
        }} 
      />
    </div>
  );
}
