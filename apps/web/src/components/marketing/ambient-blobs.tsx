export function AmbientBlobs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Gold blob — top right */}
      <div
        className="absolute -top-40 right-[-10%] h-[55vh] w-[55vh] rounded-full opacity-60 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 184, 0, 0.22), transparent 65%)",
          animation: "meshShift 22s ease-in-out infinite",
        }}
      />
      {/* Cyan blob — middle left */}
      <div
        className="absolute top-[40%] left-[-12%] h-[50vh] w-[50vh] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.16), transparent 65%)",
          animation: "meshShift 28s ease-in-out infinite reverse",
        }}
      />
      {/* Amber blob — bottom right */}
      <div
        className="absolute bottom-[-15%] right-[20%] h-[45vh] w-[45vh] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 140, 0, 0.16), transparent 65%)",
          animation: "meshShift 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}
