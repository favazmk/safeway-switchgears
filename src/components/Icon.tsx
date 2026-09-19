const paths: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.3-4.4" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5.5L11 3v18M11 8h9v13M2.5 21h19" />
      <path d="M7 8h1M7 12h1M7 16h1M14.5 12h1M14.5 16h1M17.5 12h.5M17.5 16h.5" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" />,
  pulse: <path d="M2 12h4l2.5-6 4 12 3-9 2 3H22" />,
  drop: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="M12 8.5s-2.8 3-2.8 4.8a2.8 2.8 0 0 0 5.6 0c0-1.8-2.8-4.8-2.8-4.8Z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" fill="currentColor" />
      <circle cx="15" cy="12" r="2" fill="currentColor" />
      <circle cx="8" cy="18" r="2" fill="currentColor" />
    </>
  ),
  cabinet: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M12 3v18M9.5 11v2M14.5 11v2" />
    </>
  ),
  mount: (
    <>
      <rect x="5" y="4" width="14" height="14" rx="1.5" />
      <rect x="8.5" y="7.5" width="7" height="7" rx="1" />
      <path d="M7 21h10" />
    </>
  ),
  thermo: (
    <>
      <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9v7" />
    </>
  ),
  cable: (
    <>
      <path d="M8 21v-4h8v4M9 17V9M12 17V6M15 17V9" />
      <path d="M9 9a3 3 0 0 1-2-5M15 9a3 3 0 0 0 2-5M12 6V2" />
    </>
  ),
  mcc: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M12 3v18M6 7h3M15 7h3M6 11h3M15 11h3" />
    </>
  ),
  plc: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M8 3v18M13.5 3v18" />
    </>
  ),
  vfd: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="2" />
      <rect x="8" y="5.5" width="8" height="5" rx="0.8" />
      <circle cx="9" cy="14" r=".9" fill="currentColor" />
      <circle cx="12" cy="14" r=".9" fill="currentColor" />
      <circle cx="15" cy="14" r=".9" fill="currentColor" />
      <circle cx="9" cy="17.5" r=".9" fill="currentColor" />
      <circle cx="12" cy="17.5" r=".9" fill="currentColor" />
      <circle cx="15" cy="17.5" r=".9" fill="currentColor" />
    </>
  ),
  pump: (
    <>
      <circle cx="9" cy="13" r="5" />
      <circle cx="9" cy="13" r="1.8" />
      <path d="M14 11h4v4h-4M18 9.5v7M9 8V4.5M6.5 4.5h5M4 21h10" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 10.5c-.5-3 .5-5 3-5.5M13.4 12.6c2.8 1.2 4 3.1 3 5.4M10.6 12.7c-2.4 1.9-4.6 2-6.2.2" />
    </>
  ),
  ro: (
    <>
      <path d="M3 5h18M5 5v14M19 5v14" />
      <rect x="7.5" y="7" width="3" height="12" rx="1.5" />
      <rect x="13.5" y="7" width="3" height="12" rx="1.5" />
      <path d="M3 21h18" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4.3-2 1.5a12 12 0 0 0 6.1 6.1l1.5-2 4.3 1.4v2.6a2 2 0 0 1-2.1 2 16.5 16.5 0 0 1-13.8-13.8 2 2 0 0 1 2-2.1Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6a6 6 0 0 1-7.6 1.9l-6.8 6.8a2 2 0 0 1-2.9-2.9l6.8-6.8A6 6 0 0 1 12.4 4l1.3 1.3-1 1Z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

export default function Icon({ name, className = "size-6" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.bolt}
    </svg>
  );
}
