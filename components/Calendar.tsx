"use client";

import { EventResponse, Organizer, organizations } from "@/types/event";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { JSX } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarComponentProps {
  events: EventResponse;
  value: Value;
  onDateSelect: (date: Date) => void;
}

const organizerLabelByKey: Record<keyof EventResponse, Organizer> = {
  ufcEvents: Organizer.UFC,
  pflEvents: Organizer.PFL,
  kswEvents: Organizer.KSW,
  hexagoneEvents: Organizer.HEXAGONE,
  cageWarriorsEvents: Organizer.CAGE_WARRIORS,
};

const getLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function CalendarComponent({
  events,
  value,
  onDateSelect,
}: CalendarComponentProps): JSX.Element {
  const getOrganizationsForDate = (date: Date) => {
    const formattedDate = getLocalDateKey(date);

    return (Object.keys(events) as Array<keyof EventResponse>).flatMap(
      (organizerKey) => {
        const organizerEvents = events[organizerKey];
        const hasEventThatDay = organizerEvents.some(
          (event) => getLocalDateKey(event.date) === formattedDate,
        );

        if (!hasEventThatDay) {
          return [];
        }

        return [organizerLabelByKey[organizerKey]];
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Calendar
        onChange={(nextValue) => {
          if (nextValue instanceof Date) {
            onDateSelect(nextValue);
          }
        }}
        value={value}
        minDetail="month"
        nextLabel={<ChevronRight className="w-6 h-6" />}
        prevLabel={<ChevronLeft className="w-6 h-6" />}
        next2Label={null}
        prev2Label={null}
        className="bg-foreground/10! rounded-2xl! border-none! py-4 px-2 w-full! md:w-auto! grid-cols-2"
        tileClassName="text-base! rounded-2xl! aspect-square hover:bg-inherit! flex! flex-col-reverse justify-start items-center p-0!"
        tileContent={({ date }) => {
          const organizationsForDate = getOrganizationsForDate(date);

          if (organizationsForDate.length === 0) {
            return null;
          }

          const visibleOrganizations =
            organizationsForDate.length > 2
              ? [organizationsForDate[0]]
              : organizationsForDate;

          const extraOrganizationCount = Math.max(
            0,
            organizationsForDate.length - visibleOrganizations.length,
          );

          return (
            <div className="flex">
              {visibleOrganizations.map((organizer) => (
                <div
                  key={organizer}
                  className="w-7 h-7 bg-foreground/20 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={
                      organizations.find((org) => org.name === organizer)
                        ?.logo || ""
                    }
                    alt={`${organizer} Logo`}
                    width={20}
                    height={20}
                  />
                </div>
              ))}
              {extraOrganizationCount > 0 ? (
                <div className="w-7 h-7 bg-foreground/20 rounded-full text-xs flex items-center justify-center">
                  +{extraOrganizationCount}
                </div>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
}
