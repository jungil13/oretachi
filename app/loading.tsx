"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Glow backdrop */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            background:
              "radial-gradient(circle, rgba(250,204,21,0.25) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />

        {/* Outer ring — slowest */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 112,
            height: 112,
            border: "4px solid transparent",
            borderTopColor: "#FACC15",
            borderRightColor: "#FDE047",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        />

        {/* Middle ring — medium */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            border: "4px solid transparent",
            borderTopColor: "#FDE047",
            borderBottomColor: "#FACC15",
            borderRadius: "50%",
          }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        />

        {/* Inner ring — fastest */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 48,
            height: 48,
            border: "4px solid transparent",
            borderTopColor: "#FCD34D",
            borderLeftColor: "#F59E0B",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
        />

        {/* Center pulsing dot */}
        <motion.div
          className="rounded-full"
          style={{
            width: 14,
            height: 14,
            background: "linear-gradient(135deg, #FDE047, #F59E0B)",
            boxShadow: "0 0 12px 4px rgba(250,204,21,0.6)",
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
