"use client";

import { JSX } from "react";
import Image from "next/image";
import { Organizer } from "@/types/event";

interface TabsProps {
  tabs: {
    name: Organizer;
    logo: string;
    className?: string;
  }[];
  selectedTab: Organizer;
  onTabSelect: (tabName: Organizer) => void;
}

export function Tabs({
  tabs,
  selectedTab,
  onTabSelect,
}: TabsProps): JSX.Element {
  return (
    <div className="flex gap-1 p-1 bg-foreground/10 rounded-2xl w-full md:w-auto justify-center">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.name}
            className={`w-full rounded-xl p-1.5 flex items-center justify-center ${tab.name === selectedTab && "bg-foreground/20"}`}
            onClick={() => onTabSelect(tab.name)}
          >
            <Image
              src={tab.logo}
              alt={`${tab.name} Logo`}
              width={80}
              height={80}
              className={`object-contain ${tab.className ?? ""}`}
            />
          </button>
        );
      })}
    </div>
  );
}
