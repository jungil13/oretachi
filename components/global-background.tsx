import "./background.css";

/**
 * GlobalBackground – lightweight CSS-driven orbs.
 * Yellow (#FACC15) accent on deep black background.
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
          width: 340,
          height: 340,
          top: "5%",
          left: "8%",
          background: "radial-gradient(circle, rgba(250,204,21,0.10) 0%, transparent 70%)",
          filter: "blur(50px)",
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
          background: "radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      {/* Orb 3 – center */}
      <div
        className="bg-orb orb-3 absolute"
        style={{
          width: 420,
          height: 420,
          top: "40%",
          left: "42%",
          background: "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
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
          background: "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
          filter: "blur(45px)",
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
          background: "radial-gradient(circle, rgba(250,204,21,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Orb 6 – mid-left accent */}
      <div
        className="bg-orb orb-6 absolute"
        style={{
          width: 200,
          height: 200,
          top: "55%",
          left: "5%",
          background: "radial-gradient(circle, rgba(250,204,21,0.06) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
    </div>
  );
}
