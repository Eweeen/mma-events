import { getUpcomingEvents } from "@/lib/event";
import EventsContent from "@/components/EventsContent";

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();

  return <EventsContent events={upcomingEvents} />;
}
