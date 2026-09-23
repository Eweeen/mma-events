import { EventResponse } from "@/types/event";
import { getUfcUpcomingEvents } from "./organizations/ufc";
import { getPflUpcomingEvents } from "./organizations/pfl";
import { getKswUpcomingEvents } from "./organizations/ksw";
import { getHexagoneUpcomingEvents } from "./organizations/hexagone";
import { getCageWarriorsUpcomingEvents } from "./organizations/cage-warriors";
import { getAresUpcomingEvents } from "./organizations/ares";

export async function getUpcomingEvents(): Promise<EventResponse> {
  const [
    ufcEvents,
    pflEvents,
    kswEvents,
    hexagoneEvents,
    cageWarriorsEvents,
    aresEvents,
  ] = await Promise.all([
    getUfcUpcomingEvents(),
    getPflUpcomingEvents(),
    getKswUpcomingEvents(),
    getHexagoneUpcomingEvents(),
    getCageWarriorsUpcomingEvents(),
    getAresUpcomingEvents(),
  ]);

  return {
    ufcEvents,
    pflEvents,
    kswEvents,
    hexagoneEvents,
    cageWarriorsEvents,
    aresEvents,
  };
}
