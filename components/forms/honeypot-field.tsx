/**
 * Off-screen honeypot. Must stay out of the visual layout (no space-y sibling).
 * Bots that fill `website` are dropped silently on the client and in Spring.
 */
export const HONEYPOT_NAME = "website";

export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
      }}
    >
      <label htmlFor="trivium-website">Website</label>
      <input
        id="trivium-website"
        name={HONEYPOT_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

export function honeypotFilled(data: FormData): boolean {
  return String(data.get(HONEYPOT_NAME) ?? "").trim().length > 0;
}
