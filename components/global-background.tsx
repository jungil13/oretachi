import "./background.css";

/**
 * GlobalBackground – lightweight CSS-driven orbs.
 * Uses pre-blurred radial-gradient backgrounds instead of filter:blur()
 * to avoid expensive GPU compositor layers on every orb.
 */
export function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden bg-[#050505] pointer-events-none"
      aria-hidden="true"
    >
      {/* Orb 1 – top-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          top: "-5%",
          left: "0%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.10) 0%, rgba(250,204,21,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Orb 2 – top-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          top: "5%",
          right: "0%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.07) 0%, rgba(250,204,21,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Orb 3 – center */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "35%",
          left: "35%",
          background:
            "radial-gradient(circle, rgba(234,179,8,0.06) 0%, rgba(234,179,8,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Orb 4 – bottom-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          bottom: "0%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.08) 0%, rgba(250,204,21,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Orb 5 – bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: 440,
          height: 440,
          bottom: "0%",
          right: "5%",
          background:
            "radial-gradient(circle, rgba(250,204,21,0.07) 0%, rgba(250,204,21,0.02) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}
