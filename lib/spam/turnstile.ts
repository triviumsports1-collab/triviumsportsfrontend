export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function isTurnstileEnabled(): boolean {
  return TURNSTILE_SITE_KEY.length > 0;
}

export type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      size?: "normal" | "compact" | "flexible" | "invisible";
      appearance?: "always" | "execute" | "interaction-only";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}
