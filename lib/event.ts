import { EventResponse } from "@/types/event";
import { getUfcUpcomingEvents } from "./ufc";
import { getPflUpcomingEvents } from "./pfl";
import { getKswUpcomingEvents } from "./ksw";
import { getHexagoneUpcomingEvents } from "./hexagone";
import { getCageWarriorsUpcomingEvents } from "./cage-warriors";

export async function getUpcomingEvents(): Promise<EventResponse> {
  const [ufcEvents, pflEvents, kswEvents, hexagoneEvents, cageWarriorsEvents] =
    await Promise.all([
      getUfcUpcomingEvents(),
      getPflUpcomingEvents(),
      getKswUpcomingEvents(),
      getHexagoneUpcomingEvents(),
      getCageWarriorsUpcomingEvents(),
    ]);

  return {
    ufcEvents,
    pflEvents,
    kswEvents,
    hexagoneEvents,
    cageWarriorsEvents,
  };
}
