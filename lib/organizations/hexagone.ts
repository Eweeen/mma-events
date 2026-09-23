"use server";

import { HexagoneEvent, Organizer } from "@/types/event";
import * as cheerio from "cheerio";
import { parseFrenchDate } from "../date";

const HEXAGONE_URL = "https://hexagonemma.fr/evenements";

export async function getHexagoneUpcomingEvents() {
  const res = await fetch(HEXAGONE_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, false);
}

export async function getHexagonePastEvents() {
  const res = await fetch(HEXAGONE_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, true);
}

function parseFights(html: string, isPast: boolean): HexagoneEvent[] {
  const $ = cheerio.load(html);
  const fights: HexagoneEvent[] = [];

  const $container = isPast
    ? $(".bde-tabs__panel-content").last()
    : $(".bde-tabs__panel-content").first();

  if ($container.length === 0) {
    return fights;
  }

  $container.find(".bde-loop-item").each((_, articleEl) => {
    const $article = $(articleEl);

    const name = $article.find(".bde-heading").text().trim();
    const imageUrl = $article.find("img").attr("src") ?? "";
    const fightCardImage =
      $article.find("[data-type='lightbox']").attr("href") ?? "";
    const text = $article.find(".bde-text").text().trim();
    const rawDate = text.split("–")[0].trim();
    const date = parseFrenchDate(rawDate);
    const location = text.split("–")[1]?.trim() ?? "";

    fights.push({
      id: date
        ? date.getTime() + Math.floor(Math.random() * 1000)
        : Math.random(),
      name,
      url: "",
      fightCardImage,
      imageUrl,
      date: date ?? new Date(),
      location,
      organizer: Organizer.HEXAGONE,
    });
  });

  return fights;
}
