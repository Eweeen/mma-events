import { UfcFight } from "@/types/event";
import Image from "next/image";
import { JSX } from "react";

export default function FightItem({ fight }: { fight: UfcFight }): JSX.Element {
  return (
    <div className="bg-foreground/10 p-2 rounded-md mb-4">
      <div className="flex justify-center items-center mb-1 gap-4">
        <p>{fight.redCorner.rank}</p>
        <p className="text-blue font-semibold text-center">
          {fight.weightClass}
        </p>
        <p>{fight.blueCorner.rank}</p>
      </div>

      <div className="flex justify-between">
        <div>
          <div className="relative flex h-28 w-20">
            <Image
              src={fight.redCorner.imageUrl}
              alt={fight.redCorner.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>

          {fight.redCorner.countryFlagUrl && (
            <div className="flex items-center mt-1">
              <Image
                src={fight.redCorner.countryFlagUrl}
                alt={fight.redCorner.country}
                width={24}
                height={24}
                className="inline-block mr-1"
              />
              <span className="text-xs">{fight.redCorner.country}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-6">
          <p className="text-center">{fight.redCorner.name}</p>
          <p>VS</p>
          <p className="text-center">{fight.blueCorner.name}</p>
        </div>

        <div>
          <div className="relative flex h-28 w-20">
            <Image
              src={fight.blueCorner.imageUrl}
              alt={fight.blueCorner.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
          </div>

          {fight.blueCorner.countryFlagUrl && (
            <div className="flex items-center justify-end mt-1">
              <span className="text-xs">{fight.blueCorner.country}</span>
              <Image
                src={fight.blueCorner.countryFlagUrl}
                alt={fight.blueCorner.country}
                width={24}
                height={24}
                className="inline-block ml-1"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
