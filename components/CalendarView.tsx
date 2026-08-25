"use client";

import { EventResponse } from "@/types/event";
import { format } from "date-fns";
import { JSX } from "react";
import EventItem from "./EventItem";
import CalendarComponent from "./Calendar";

interface CalendarViewProps {
  events: EventResponse;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const formatDateKey = (date: Date) => format(date, "yyyy-MM-dd");

export default function CalendarView({
  events,
  selectedDate,
  onDateSelect,
}: CalendarViewProps): JSX.Element {
  const allEvents = Object.values(events).flat();
  const selectedEvents = allEvents.filter(
    (event) => formatDateKey(event.date) === formatDateKey(selectedDate),
  );

  return (
    <div className="flex flex-col gap-4">
      <CalendarComponent
        events={events}
        value={selectedDate}
        onDateSelect={onDateSelect}
      />

      <div className="flex flex-col gap-4">
        {selectedEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full flex flex-col gap-2 items-center"
          >
            <EventItem event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
