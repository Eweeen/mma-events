"use client";

import {
  Event,
  EventResponse,
  HexagoneEvent,
  KswEvent,
  organizations,
  Organizer,
  UfcEvent,
} from "@/types/event";
import { JSX, useState } from "react";
import { Tabs } from "./Tabs";
import EventItem from "./EventItem";

interface ListViewProps {
  events: EventResponse;
}

export default function ListView({ events }: ListViewProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<Organizer>(
    organizations[0].name,
  );

  let filteredEvents: Array<Event | UfcEvent | KswEvent | HexagoneEvent>;

  switch (selectedTab) {
    case Organizer.PFL:
      filteredEvents = events.pflEvents;
      break;
    case Organizer.KSW:
      filteredEvents = events.kswEvents;
      break;
    case Organizer.HEXAGONE:
      filteredEvents = events.hexagoneEvents;
      break;
    case Organizer.CAGE_WARRIORS:
      filteredEvents = events.cageWarriorsEvents;
      break;
    case Organizer.UFC:
    default:
      filteredEvents = events.ufcEvents;
      break;
  }

  return (
    <>
      <Tabs
        tabs={organizations}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />

      <div className="flex flex-col gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full flex flex-col gap-2 items-center"
          >
            <EventItem event={event} />
          </div>
        ))}
      </div>
    </>
  );
}
