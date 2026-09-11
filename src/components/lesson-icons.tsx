/**
 * SVG-иконки для уроков — замена эмодзи на чистый современный дизайн.
 */

type IconProps = { size?: number; color?: string; className?: string };

const I = ({ size = 24, color = "currentColor", className = "", children }: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// Утилитарные иконки
export const IconCheck = (p: IconProps) => <I {...p}><path d="M20 6L9 17l-5-5" /></I>;
export const IconClose = (p: IconProps) => <I {...p}><path d="M18 6L6 18M6 6l12 12" /></I>;
export const IconArrow = (p: IconProps) => <I {...p}><path d="M5 12h14M12 5l7 7-7 7" /></I>;
export const IconBack = (p: IconProps) => <I {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></I>;
export const IconPlus = (p: IconProps) => <I {...p}><path d="M12 5v14M5 12h14" /></I>;
export const IconMinus = (p: IconProps) => <I {...p}><path d="M5 12h14" /></I>;
export const IconPlay = (p: IconProps) => <I {...p}><polygon points="5,3 19,12 5,21" fill="currentColor" /></I>;
export const IconPause = (p: IconProps) => <I {...p}><rect x="6" y="4" width="4" height="16" fill="currentColor" /><rect x="14" y="4" width="4" height="16" fill="currentColor" /></I>;
export const IconSearch = (p: IconProps) => <I {...p}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></I>;
export const IconSpeaker = (p: IconProps) => <I {...p}><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" /></I>;
export const IconHelp = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></I>;
export const IconHand = (p: IconProps) => <I {...p}><path d="M18 11V6a2 2 0 00-4 0v5M14 10V4a2 2 0 00-4 0v6M10 10.5V6a2 2 0 00-4 0v8" /><path d="M18 8a2 2 0 014 0v6a8 8 0 01-8 8h-2c-2.8 0-4.2-1.5-5.5-3l-3-5C2.7 12 4 11 5 11h.5" /></I>;
export const IconEye = (p: IconProps) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></I>;
export const IconLock = (p: IconProps) => <I {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></I>;
export const IconHome = (p: IconProps) => <I {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></I>;

// Тематические иконки
export const IconTshirt = (p: IconProps) => <I {...p}><path d="M6 4l3 1c1 2 5 2 6 0l3-1 3 4-3 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V10L3 8z" /></I>;
export const IconShirt = (p: IconProps) => <I {...p}><path d="M16 3l4 2-2 5h-2v11a2 2 0 01-2 2H10a2 2 0 01-2-2V10H6L4 5l4-2 2 2c1 1 3 1 4 0z" /></I>;
export const IconShoe = (p: IconProps) => <I {...p}><path d="M3 13v4a2 2 0 002 2h14a2 2 0 002-2v-2c0-1-1-2-3-2l-4-1-3-4-4-1c-2 0-4 2-4 6z" /></I>;
export const IconBottle = (p: IconProps) => <I {...p}><path d="M10 2v3M14 2v3M9 5h6v3l1 2v9a2 2 0 01-2 2h-4a2 2 0 01-2-2V10l1-2z" /></I>;
export const IconLabel = (p: IconProps) => <I {...p}><path d="M3 7l9-3 9 3v10l-9 3-9-3z" /><path d="M3 7l9 3 9-3M12 10v10" /></I>;
export const IconDroplet = (p: IconProps) => <I {...p}><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></I>;
export const IconSun = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></I>;
export const IconCloud = (p: IconProps) => <I {...p}><path d="M17 18a5 5 0 000-10 7 7 0 00-13.4 2.5A4.5 4.5 0 005 18z" /></I>;
export const IconSnow = (p: IconProps) => <I {...p}><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></I>;
export const IconHeadphones = (p: IconProps) => <I {...p}><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></I>;
export const IconWasher = (p: IconProps) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="13" r="5" /><circle cx="6.5" cy="6.5" r="0.7" fill="currentColor" /><circle cx="9" cy="6.5" r="0.7" fill="currentColor" /></I>;
export const IconBox = (p: IconProps) => <I {...p}><path d="M21 8L12 3 3 8v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></I>;
export const IconBowl = (p: IconProps) => <I {...p}><path d="M3 11h18a9 9 0 01-18 0z" /><path d="M12 4v2M9 5l1 2M15 5l-1 2" /></I>;
export const IconFork = (p: IconProps) => <I {...p}><path d="M9 2v6a3 3 0 006 0V2M12 11v11" /></I>;
export const IconKnife = (p: IconProps) => <I {...p}><path d="M14.5 2.5L7 10l4 4 7.5-7.5a4 4 0 00-4-4zM7 14l-5 5 3 3 5-5" /></I>;
export const IconBook = (p: IconProps) => <I {...p}><path d="M4 4h12a4 4 0 014 4v12a3 3 0 00-3-3H4z" /></I>;
export const IconWallet = (p: IconProps) => <I {...p}><path d="M3 7h18v12H3z" /><path d="M16 12h4M3 7l3-4h12l3 4" /></I>;
export const IconChart = (p: IconProps) => <I {...p}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></I>;
export const IconBus = (p: IconProps) => <I {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="7.5" cy="18" r="2" /><circle cx="16.5" cy="18" r="2" /><path d="M3 12h18M7 6v6" /></I>;
export const IconTrain = (p: IconProps) => <I {...p}><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16M9 22l3-3 3 3" /><circle cx="8.5" cy="15" r="1" fill="currentColor" /><circle cx="15.5" cy="15" r="1" fill="currentColor" /></I>;
export const IconTicket = (p: IconProps) => <I {...p}><path d="M3 9a2 2 0 011-2h16a2 2 0 011 2v3a2 2 0 00-2 2 2 2 0 002 2v3a2 2 0 01-1 2H4a2 2 0 01-1-2v-3a2 2 0 002-2 2 2 0 00-2-2z" /></I>;
export const IconPackage = (p: IconProps) => <I {...p}><path d="M16.5 9.4L7.5 4.21" /><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /></I>;
export const IconPhone = (p: IconProps) => <I {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></I>;
export const IconMessenger = (p: IconProps) => <I {...p}><path d="M21 11.5a8.4 8.4 0 01-9 8.5 9.4 9.4 0 01-4-1L3 21l1.5-4A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" /></I>;
export const IconShield = (p: IconProps) => <I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></I>;
export const IconThermometer = (p: IconProps) => <I {...p}><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4 4 0 105 0z" /></I>;
export const IconBuilding = (p: IconProps) => <I {...p}><rect x="4" y="2" width="16" height="20" /><path d="M9 22V12h6v10M9 7h.01M15 7h.01M9 10h.01M15 10h.01" /></I>;
export const IconAtm = (p: IconProps) => <I {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M7 14h4M7 17h2M14 14h3M14 17h3" /></I>;
export const IconCard = (p: IconProps) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></I>;
export const IconFile = (p: IconProps) => <I {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></I>;
export const IconTimer = (p: IconProps) => <I {...p}><circle cx="12" cy="13" r="8" /><path d="M9 2h6M12 9v4l2 2" /></I>;
export const IconList = (p: IconProps) => <I {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></I>;
export const IconUser = (p: IconProps) => <I {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></I>;
export const IconCalendar = (p: IconProps) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></I>;
export const IconClock = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></I>;
export const IconPin = (p: IconProps) => <I {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></I>;
export const IconSparkle = (p: IconProps) => <I {...p}><path d="M12 3v3M12 18v3M21 12h-3M6 12H3M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12M18.36 18.36l-2.12-2.12M7.76 7.76L5.64 5.64" /></I>;
export const IconSoap = (p: IconProps) => <I {...p}><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3M9 6c1-1 4-1 5 0" /></I>;

// Предметы гигиены
export const IconToothbrush = (p: IconProps) => <I {...p}><path d="M3 21l8-8" /><rect x="13" y="1" width="6" height="11" rx="1" transform="rotate(45 16 6.5)" /><path d="M16 4l-1 1M17.5 5.5l-1 1M19 7l-1 1" /></I>;
export const IconToothpaste = (p: IconProps) => <I {...p}><rect x="4" y="7" width="13" height="10" rx="2" /><path d="M17 9l3-2v8l-3-2" /><path d="M7 11h6" /></I>;
export const IconComb = (p: IconProps) => <I {...p}><rect x="2" y="9" width="20" height="6" rx="1" /><path d="M5 15v3M8 15v4M11 15v3M14 15v4M17 15v3M20 15v4" /></I>;
export const IconTowel = (p: IconProps) => <I {...p}><path d="M4 4h16v16H4z" /><path d="M4 4l4 4M8 4l4 4M12 4l4 4M16 4l4 4" /></I>;
export const IconMirror = (p: IconProps) => <I {...p}><rect x="5" y="2" width="14" height="18" rx="2" /><path d="M9 21h6M8 6l2 3M8 6l-1 4" /></I>;
export const IconScissors = (p: IconProps) => <I {...p}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></I>;
export const IconDeodorant = (p: IconProps) => <I {...p}><rect x="7" y="8" width="10" height="13" rx="2" /><path d="M9 8V5a3 3 0 016 0v3M11 3v1M13 3v1M12 2v1" /></I>;
export const IconBall = (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z" /></I>;
export const IconLipstick = (p: IconProps) => <I {...p}><path d="M9 2l6 0v8l-3 1-3-1z" /><rect x="7" y="10" width="10" height="12" rx="1" /></I>;
export const IconMug = (p: IconProps) => <I {...p}><path d="M4 8h12v10a3 3 0 01-3 3H7a3 3 0 01-3-3z" /><path d="M16 10h2a3 3 0 010 6h-2" /></I>;

// Эмодзи-замена через данные (мапит старое emoji-имя на компонент)
export const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  shirt: IconShirt,
  tshirt: IconTshirt,
  shoe: IconShoe,
  bottle: IconBottle,
  label: IconLabel,
  droplet: IconDroplet,
  sun: IconSun,
  cloud: IconCloud,
  snow: IconSnow,
  headphones: IconHeadphones,
  washer: IconWasher,
  box: IconBox,
  bowl: IconBowl,
  fork: IconFork,
  knife: IconKnife,
  book: IconBook,
  wallet: IconWallet,
  chart: IconChart,
  bus: IconBus,
  train: IconTrain,
  ticket: IconTicket,
  package: IconPackage,
  phone: IconPhone,
  messenger: IconMessenger,
  shield: IconShield,
  thermometer: IconThermometer,
  building: IconBuilding,
  atm: IconAtm,
  card: IconCard,
  file: IconFile,
  timer: IconTimer,
  list: IconList,
  user: IconUser,
  calendar: IconCalendar,
  clock: IconClock,
  pin: IconPin,
  sparkle: IconSparkle,
  soap: IconSoap,
  toothbrush: IconToothbrush,
  toothpaste: IconToothpaste,
  comb: IconComb,
  towel: IconTowel,
  mirror: IconMirror,
  scissors: IconScissors,
  deodorant: IconDeodorant,
  ball: IconBall,
  lipstick: IconLipstick,
  mug: IconMug,
};
