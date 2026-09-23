"use server";

import { Event, Organizer } from "@/types/event";
import * as cheerio from "cheerio";
import { parseAresDate } from "../date";

const ARES_URL = "https://www.aresfighting.com/fr/events/";
const ARES_UPCOMING_URL = `${ARES_URL}?filter=upcoming`;
const ARES_PAST_URL = `${ARES_URL}?filter=past`;

export async function getAresUpcomingEvents() {
  const res = await fetch(ARES_UPCOMING_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html);
}

export async function getAresPastEvents() {
  const res = await fetch(ARES_PAST_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html);
}

function parseFights(html: string): Event[] {
  const $ = cheerio.load(html);
  const fights: Event[] = [];

  const $container = $(".events-block").first();

  if ($container.length === 0) {
    return fights;
  }

  $container.find("div.competition-resume").each((_, divEl) => {
    const $div = $(divEl);

    const name = $div.attr("title") ?? "";
    const rawUrl = $div.find("a").last().attr("href") ?? "";
    const url = rawUrl.includes("competition") ? ARES_URL + rawUrl : "";

    const style = $div.find("div.inner").attr("style") ?? "";
    const match = style.match(/url\((['"]?)(.*?)\1\)/);
    const imageUrl = match ? match[2] : "";

    const dateDiv = $div.find("div.date").first();
    const date = parseAresDate(dateDiv.text()) ?? new Date();

    fights.push({
      id: date.getTime() + Math.floor(Math.random() * 1000),
      name,
      url,
      imageUrl,
      date,
      location: "",
      organizer: Organizer.ARES,
    });
  });

  return fights;
}
