"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
  }
}

export function ChatbaseWidget() {
  useEffect(() => {
    // 1. Initialize chatbase object / queue
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        },
      });
    }

    // 2. Load the script tag
    const scriptId = "m6J2h6OmJPjh4wn4a0kYH";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = scriptId;
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    }

    // 3. Identify user if logged in
    const identifyUser = async () => {
      try {
        const res = await fetch("/api/chatbase-token");
        const data = await res.json();
        if (data && data.token) {
          window.chatbase("identify", { token: data.token });
        }
      } catch (err) {
        console.error("Failed to identify user with Chatbase:", err);
      }
    };
    identifyUser();
  }, []);

  return null;
}
