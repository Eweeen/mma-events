export enum Organizer {
  UFC = "UFC",
  PFL = "PFL",
  KSW = "KSW",
  HEXAGONE = "Hexagone MMA",
  CAGE_WARRIORS = "Cage Warriors",
  ARES = "ARES FC",
}

export const organizations = [
  { name: Organizer.UFC, logo: "/images/ufc.png" },
  { name: Organizer.PFL, logo: "/images/pfl.png" },
  { name: Organizer.HEXAGONE, logo: "/images/hexagone-mma.png" },
  { name: Organizer.KSW, logo: "/images/ksw.png" },
  { name: Organizer.ARES, logo: "/images/ares.png" },
  {
    name: Organizer.CAGE_WARRIORS,
    logo: "/images/cage-warriors.png",
    className: "invert-0 dark:invert",
  },
];

export interface EventResponse {
  ufcEvents: UfcEvent[];
  pflEvents: Event[];
  kswEvents: KswEvent[];
  hexagoneEvents: HexagoneEvent[];
  cageWarriorsEvents: Event[];
  aresEvents: Event[];
}

export interface Event {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  date: Date;
  location: string;
  organizer: Organizer;
}

export interface UfcEvent extends Omit<Event, "imageUrl"> {
  svg: string;
  redCornerImage: string;
  blueCornerImage: string;
}

export interface KswEvent extends Event {
  title: string;
}

export interface HexagoneEvent extends Event {
  fightCardImage: string;
}
