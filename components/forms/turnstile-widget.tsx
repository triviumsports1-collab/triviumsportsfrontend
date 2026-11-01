"use client";

import { useEffect, useRef } from "react";
import { isTurnstileEnabled, TURNSTILE_SITE_KEY } from "@/lib/spam/turnstile";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.turnstile) {
    return Promise.resolve();
  }
  const existing = document.querySelector<HTMLScriptElement>(
    'script[src^="https://challenges.cloudflare.com/turnstile"]',
  );
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(script);
  });
}

/**
 * Managed Turnstile with appearance=interaction-only.
 *
 * Do not use size=invisible. That loads Cloudflare's `invisible?lang=auto`
 * challenge document, whose own iframe CSP omits `data:` and logs
 * "Connecting to 'data:,' violates connect-src" — a Cloudflare-side probe,
 * not a missing header on triviumsports.com (this app does not set CSP).
 *
 * interaction-only stays visually hidden unless a challenge is required,
 * so the form layout is unchanged for typical visitors.
 */
export function TurnstileWidget({
  onToken,
  resetSignal = 0,
}: {
  onToken: (token: string) => void;
  resetSignal?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!isTurnstileEnabled() || !hostRef.current) {
      return;
    }
    let cancelled = false;
    void loadScript()
      .then(() => {
        if (cancelled || !hostRef.current || !window.turnstile || widgetIdRef.current) {
          return;
        }
        widgetIdRef.current = window.turnstile.render(hostRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          size: "flexible",
          appearance: "interaction-only",
          theme: "light",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch(() => {
        onTokenRef.current("");
      });
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (resetSignal === 0 || !widgetIdRef.current || !window.turnstile) {
      return;
    }
    onTokenRef.current("");
    window.turnstile.reset(widgetIdRef.current);
  }, [resetSignal]);

  if (!isTurnstileEnabled()) {
    return null;
  }

  return <div ref={hostRef} />;
}
