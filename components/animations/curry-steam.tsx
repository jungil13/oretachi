"use client";

export function CurrySteam() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-steam absolute rounded-full bg-pure-white/20 blur-xl"
          style={{
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            left: `${15 + i * 18}%`,
            bottom: `${10 + i * 5}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}
