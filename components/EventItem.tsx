import {
  Event,
  HexagoneEvent,
  KswEvent,
  UfcEvent,
  UfcFightCard,
} from "@/types/event";
import Image from "next/image";
import { JSX, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { getFightCard } from "@/lib/event";
import FightCardModal from "./FightCardModal";

interface EventItemProps {
  event: Event | UfcEvent | KswEvent | HexagoneEvent;
}

export default function EventItem({ event }: EventItemProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fightCardData, setFightCardData] = useState<UfcFightCard | null>(null);

  const handleClick = async () => {
    if (!event.url) {
      console.error("No URL available for this event");
      return;
    }

    const fightCard = await getFightCard(event.organizer, event.url);
    setFightCardData(fightCard);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="relative w-full flex flex-col gap-2 items-center"
        onClick={handleClick}
      >
        {"imageUrl" in event ? (
          <>
            <Image
              src={event.imageUrl}
              alt={event.name}
              width={400}
              height={200}
              loading="lazy"
              className="rounded-lg"
            />

            <div className="w-full flex flex-col">
              <h2 className="text-xl font-bold text-center">{event.name}</h2>
              {"title" in event && event.title && (
                <h3 className="text-lg font-semibold text-center">
                  {event.title}
                </h3>
              )}
              <p className="text-center">
                {format(event.date, "EEEE dd MMM yyyy", { locale: fr })}
              </p>
              <p className="text-center">{event.location}</p>
            </div>
          </>
        ) : (
          <>
            <div className="relative flex h-32 w-full">
              {/* SVG */}
              <div
                dangerouslySetInnerHTML={{ __html: event.svg }}
                className="logo-svg absolute top-6 left-1/2 -translate-x-1/2 w-20 h-auto fill-current text-white dark:text-black"
              ></div>
              <Image
                src={event.redCornerImage}
                alt="Red Corner"
                width="205"
                height="128"
                loading="lazy"
                className="absolute w-auto h-32 top-0 right-1/2 translate-x-1/6"
              />
              <Image
                src={event.blueCornerImage}
                alt="Blue Corner"
                width="205"
                height="128"
                loading="lazy"
                className="absolute w-auto h-32 top-0 left-1/2 -translate-x-1/6"
              />
            </div>

            <div className="w-full flex flex-col">
              <h2 className="text-xl font-bold text-center">{event.name}</h2>
              <p className="text-center">
                {format(event.date, "EEEE dd MMM yyyy, 'à' HH:mm", {
                  locale: fr,
                })}
              </p>
              <p className="text-center">{event.location}</p>
            </div>
          </>
        )}
      </button>

      <FightCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fightCardData={fightCardData}
      />
    </>
  );
}
