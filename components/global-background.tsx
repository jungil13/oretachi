import "./background.css";

/**
 * GlobalBackground – lightweight CSS-driven orbs.
 *
 * Performance notes vs. the previous implementation:
 *  - Removed framer-motion entirely (no JS animation loop)
 *  - Only 6 orbs instead of 12
 *  - Animations use `transform` only → browser composites on GPU, zero layout/paint cost
 *  - blur-[40px] instead of blur-[80px] → much cheaper filter pass
 *  - `will-change: transform` on each orb → browser pre-promotes to its own layer
 *  - Static positions (no random Math.random on each render)
 */
export function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden bg-[#050505] pointer-events-none"
      aria-hidden="true"
    >
      {/* Orb 1 – top-left */}
      <div
        className="bg-orb orb-1 absolute"
        style={{
          width: 320,
          height: 320,
          top: "5%",
          left: "8%",
          background: "radial-gradient(circle, rgba(230,193,143,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orb 2 – top-right */}
      <div
        className="bg-orb orb-2 absolute"
        style={{
          width: 280,
          height: 280,
          top: "10%",
          right: "10%",
          background: "radial-gradient(circle, rgba(230,193,143,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orb 3 – center */}
      <div
        className="bg-orb orb-3 absolute"
        style={{
          width: 400,
          height: 400,
          top: "40%",
          left: "45%",
          background: "radial-gradient(circle, rgba(180,140,90,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Orb 4 – bottom-left */}
      <div
        className="bg-orb orb-4 absolute"
        style={{
          width: 260,
          height: 260,
          bottom: "12%",
          left: "15%",
          background: "radial-gradient(circle, rgba(230,193,143,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Orb 5 – bottom-right */}
      <div
        className="bg-orb orb-5 absolute"
        style={{
          width: 300,
          height: 300,
          bottom: "8%",
          right: "12%",
          background: "radial-gradient(circle, rgba(210,170,100,0.08) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      {/* Orb 6 – mid-left (accent) */}
      <div
        className="bg-orb orb-6 absolute"
        style={{
          width: 200,
          height: 200,
          top: "55%",
          left: "5%",
          background: "radial-gradient(circle, rgba(230,193,143,0.08) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
    </div>
  );
}
