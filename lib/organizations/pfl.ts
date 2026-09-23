"use server";

import { Event, Organizer } from "@/types/event";
import * as cheerio from "cheerio";
import { parseEventDate } from "../date";

const PFL_URL = "https://pflmma.com/events";

export async function getPflUpcomingEvents() {
  const res = await fetch(PFL_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, false);
}

export async function getPflPastEvents() {
  const res = await fetch(PFL_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, true);
}

function parseFights(html: string, isPast: boolean): Event[] {
  const $ = cheerio.load(html);
  const fights: Event[] = [];

  const $container = isPast ? $("#nav-past") : $("#nav-upcoming");

  if ($container.length === 0) {
    return fights;
  }

  $container.find(".event-hub").each((_, articleEl) => {
    const $article = $(articleEl);

    const rawDate = $article.find("h6").first().text().trim();
    const parsedDate =
      parseEventDate(rawDate, isPast ? "past" : "future") ?? new Date();
    const name = $article.find("h3").first().text().trim();
    const location = $article.find("p").first().text().trim();
    const imageUrl =
      $article.find("img.event-hub-bg").attr("src")?.trim() ?? "";
    const matchupsUrl =
      $article.find('a[href*="/event/"]').attr("href")?.trim() ?? "";

    fights.push({
      id: parsedDate.getTime() + Math.floor(Math.random() * 1000),
      name,
      location,
      date: parsedDate,
      url: matchupsUrl,
      imageUrl,
      organizer: Organizer.PFL,
    });
  });

  return fights;
}
