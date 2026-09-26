import { EventResponse } from "@/types/event";
import { getUfcFightCard, getUfcUpcomingEvents } from "./organizations/ufc";
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

export async function getFightCard(organizer: string, url: string) {
  switch (organizer) {
    case "UFC":
      return await getUfcFightCard(url);
    // case "PFL":
    //   return await getPflFightCard(url);
    // case "KSW":
    //   return await getKswFightCard(url);
    // case "Hexagone MMA":
    //   return await getHexagoneFightCard(url);
    // case "Cage Warriors":
    //   return await getCageWarriorsFightCard(url);
    // case "ARES FC":
    //   return await getAresFightCard(url);
    default:
      throw new Error(`Unknown organizer: ${organizer}`);
  }
}
