"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

function stripScripts(html: string): string {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

function needsInstagramEmbed(html: string, platform: string): boolean {
  return (
    platform.toLowerCase() === "instagram" ||
    html.includes("instagram-media") ||
    html.includes("instagram.com")
  );
}

let instagramScriptPromise: Promise<void> | null = null;

function loadInstagramScript(): Promise<void> {
  if (instagramScriptPromise) return instagramScriptPromise;

  instagramScriptPromise = new Promise((resolve) => {
    if (window.instgrm) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      if (window.instgrm) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return instagramScriptPromise;
}

function processInstagramEmbeds() {
  window.instgrm?.Embeds.process();
}

interface SocialEmbedProps {
  embedCode: string;
  platform: string;
}

export function SocialEmbed({ embedCode, platform }: SocialEmbedProps) {
  const sanitizedHtml = stripScripts(embedCode);

  useEffect(() => {
    if (!needsInstagramEmbed(embedCode, platform)) return;

    let cancelled = false;

    const init = async () => {
      await loadInstagramScript();
      if (cancelled) return;

      processInstagramEmbeds();

      // Re-process after stagger animations settle
      const timer = window.setTimeout(() => {
        if (!cancelled) processInstagramEmbeds();
      }, 1200);

      return () => window.clearTimeout(timer);
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [embedCode, platform]);

  return (
    <div
      className="w-full flex justify-center [&_iframe]:max-w-full [&_blockquote]:max-w-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
