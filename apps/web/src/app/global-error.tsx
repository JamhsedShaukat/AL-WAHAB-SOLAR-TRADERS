"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// global-error replaces the root layout, so it must include html + body.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#05080f",
          color: "#e7ecf5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "5rem",
            fontWeight: 700,
            lineHeight: 1,
            color: "#FF8C00",
            margin: 0,
          }}
        >
          500
        </p>
        <h1
          style={{ fontSize: "1.5rem", fontWeight: 600, margin: "0.75rem 0 0" }}
        >
          Critical error
        </h1>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "#94a3b8",
            margin: "0.5rem 0 2rem",
            maxWidth: 380,
          }}
        >
          A fatal error occurred and the application could not recover. Our team
          has been notified.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.75rem",
            background: "linear-gradient(to right, #FF8C00, #FFB800)",
            color: "#05080f",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
