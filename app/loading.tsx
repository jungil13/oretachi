"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer glowing ring */}
        <div className="absolute h-24 w-24 animate-[spin_3s_linear_infinite] rounded-full border-b-2 border-t-2 border-[#FACC15] opacity-80 shadow-[0_0_15px_rgba(250,204,21,0.5)]"></div>
        {/* Inner pulsing ring */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-[#FACC15]/20"></div>
        {/* Core dot */}
        <div className="h-4 w-4 animate-pulse rounded-full bg-[#FACC15] shadow-[0_0_10px_#FACC15]"></div>
      </motion.div>
    </div>
  );
}
