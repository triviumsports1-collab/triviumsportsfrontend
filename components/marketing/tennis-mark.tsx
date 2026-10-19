import Image from "next/image";

export function TriviumLogo({ className = "h-8 w-auto max-w-[210px] object-contain object-left sm:h-9 sm:max-w-[280px]" }: { className?: string }) {
  return (
    <Image
      src="/brand/trivium-logo.png"
      alt="Trivium Sports"
      width={505}
      height={58}
      className={className}
    />
  );
}

export function TennisMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 9c5 3 8 7 8 14M24 9c-5 3-8 7-8 14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CourtBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 800 560"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="800" height="560" fill="#0F1C16" />
      <rect x="80" y="48" width="640" height="464" fill="#1A3328" />
      <rect
        x="80"
        y="48"
        width="640"
        height="464"
        stroke="#5CB878"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <line
        x1="400"
        y1="48"
        x2="400"
        y2="512"
        stroke="#F4F7F4"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <rect
        x="200"
        y="120"
        width="400"
        height="320"
        stroke="#F4F7F4"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <line
        x1="200"
        y1="280"
        x2="600"
        y2="280"
        stroke="#F4F7F4"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <circle cx="400" cy="280" r="28" stroke="#5CB878" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  );
}
