import { getUpcomingEvents } from "@/lib/event";
import EventsContent from "@/components/EventsContent";

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents();

  return (
    <EventsContent events={upcomingEvents} />

    // <div className="min-h-dvh flex flex-col flex-1 items-center justify-center gap-4 p-4 bg-zinc-50 font-sans dark:bg-black">
    //   {cageWarriorsUpcomingEvents.map((fight) => (
    //     <div
    //       key={fight.id}
    //       className="relative w-full flex flex-col gap-2 items-center"
    //     >
    //       <Image
    //         src={fight.imageUrl ?? "/images/cage-warriors.png"}
    //         alt={fight.name}
    //         width={400}
    //         height={200}
    //         loading="lazy"
    //         className="rounded-lg"
    //       />

    //       <div className="w-full flex flex-col">
    //         <h2 className="text-xl font-bold text-center">{fight.name}</h2>
    //         <p className="text-center">
    //           {format(fight.date, "EEEE dd MMM yyyy", { locale: fr })}
    //         </p>
    //         <p className="text-center">{fight.location}</p>
    //       </div>
    //     </div>
    //   ))}

    //   {hexagoneUpcomingEvents.map((fight) => (
    //     <div
    //       key={fight.id}
    //       className="relative w-full flex flex-col gap-2 items-center"
    //     >
    //       <Image
    //         src={fight.imageUrl ?? "/images/hexagone-mma.png"}
    //         alt={fight.name}
    //         width={400}
    //         height={200}
    //         loading="lazy"
    //         className="rounded-lg"
    //       />

    //       <div className="w-full flex flex-col">
    //         <h2 className="text-xl font-bold text-center">{fight.name}</h2>
    //         <p className="text-center">
    //           {format(fight.date, "EEEE dd MMM yyyy", { locale: fr })}
    //         </p>
    //         <p className="text-center">{fight.location}</p>
    //       </div>
    //     </div>
    //   ))}

    //   {kswUpcomingEvents.map((fight) => (
    //     <div
    //       key={fight.id}
    //       className="relative w-full flex flex-col gap-2 items-center"
    //     >
    //       <Image
    //         src={fight.imageUrl ?? "/images/ksw.png"}
    //         alt={fight.name}
    //         width={400}
    //         height={200}
    //         loading="lazy"
    //         className="rounded-lg"
    //       />

    //       <div className="w-full flex flex-col">
    //         <h2 className="text-xl font-bold text-center">{fight.name}</h2>
    //         <h3 className="text-lg font-semibold text-center">{fight.title}</h3>
    //         <p className="text-center">
    //           {format(fight.date, "EEEE dd MMM yyyy", { locale: fr })}
    //         </p>
    //         <p className="text-center">{fight.location}</p>
    //       </div>
    //     </div>
    //   ))}

    //   {pflUpcomingEvents.map((fight) => (
    //     <div
    //       key={fight.id}
    //       className="relative w-full flex flex-col gap-2 items-center"
    //     >
    //       <Image
    //         src={fight.imageUrl ?? "/images/pfl.png"}
    //         alt={fight.name}
    //         width={400}
    //         height={200}
    //         loading="lazy"
    //         className="rounded-lg"
    //       />

    //       <div className="w-full flex flex-col">
    //         <h2 className="text-xl font-bold text-center">{fight.name}</h2>
    //         <p className="text-center">
    //           {format(fight.date, "EEEE dd MMM yyyy", { locale: fr })}
    //         </p>
    //         <p className="text-center">{fight.location}</p>
    //       </div>
    //     </div>
    //   ))}

    //   {ufcUpcomingEvents.map((fight) => (
    //     <div
    //       key={fight.id}
    //       className="relative w-full flex flex-col gap-2 items-center"
    //     >
    //       <div className="relative flex h-32 w-full">
    //         {/* SVG */}
    //         <div
    //           dangerouslySetInnerHTML={{ __html: fight.svg }}
    //           className="logo-svg absolute top-1/2 -translate-y-1/2 w-20 h-auto fill-current text-white dark:text-black"
    //         ></div>
    //         <Image
    //           src={fight.redCornerImage}
    //           alt="Red Corner"
    //           width="205"
    //           height="128"
    //           loading="lazy"
    //           className="absolute w-auto h-32 top-0 right-1/2 translate-x-1/6"
    //         />
    //         <Image
    //           src={fight.blueCornerImage}
    //           alt="Blue Corner"
    //           width="205"
    //           height="128"
    //           loading="lazy"
    //           className="absolute w-auto h-32 top-0 left-1/2 -translate-x-1/6"
    //         />
    //       </div>

    //       <div className="w-full flex flex-col">
    //         <h2 className="text-xl font-bold text-center">{fight.name}</h2>
    //         <p className="text-center">
    //           {format(fight.date, "EEEE dd MMM yyyy, 'à' HH:mm", {
    //             locale: fr,
    //           })}
    //         </p>
    //         <p className="text-center">{fight.location}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
