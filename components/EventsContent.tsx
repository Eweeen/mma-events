"use client";

import { EventResponse } from "@/types/event";
import { CalendarDays, List } from "lucide-react";
import { JSX, useState } from "react";
import ListView from "./ListView";
import CalendarView from "./CalendarView";

interface EventsContentProps {
  events: EventResponse;
}

export default function EventsContent({
  events,
}: EventsContentProps): JSX.Element {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="min-h-dvh flex flex-col gap-4 p-4 bg-zinc-50 font-sans dark:bg-black">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Événements MMA</h1>

        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 rounded-xl p-2 ${view === "list" ? "bg-blue" : "bg-foreground/30"}`}
            onClick={() => setView("list")}
          >
            <List width={24} height={24} color="currentColor" />
          </button>
          <button
            className={`flex items-center gap-2 rounded-xl p-2 ${view === "calendar" ? "bg-blue" : "bg-foreground/30"}`}
            onClick={() => setView("calendar")}
          >
            <CalendarDays width={24} height={24} color="currentColor" />
          </button>
        </div>
      </header>

      {view === "list" ? (
        <ListView events={events} />
      ) : (
        <CalendarView
          events={events}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
    </div>
  );
}
