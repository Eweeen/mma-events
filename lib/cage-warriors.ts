"use server";

import { Event, Organizer } from "@/types/event";
import * as cheerio from "cheerio";
import { parseLongEnglishDate } from "./date";

const CAGE_WARRIORS_URL = "https://cagewarriors.com/cage-warriors-events/";

export async function getCageWarriorsUpcomingEvents() {
  const res = await fetch(CAGE_WARRIORS_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html);
}

function parseFights(html: string): Event[] {
  const $ = cheerio.load(html);
  const fights: Event[] = [];

  const $container = $("#upcoming").next();

  if ($container.length === 0) {
    return fights;
  }

  $container.find(".et_pb_row").each((_, articleEl) => {
    const $article = $(articleEl);

    const name = $article.find(".et_pb_text_inner h3").text().trim();
    const rawDate = $article.find(".et_pb_text_inner p").first().text().trim();
    const parsedDate = parseLongEnglishDate(rawDate) ?? new Date();
    const $locationEl = $article.find(".et_pb_text_inner p").eq(1).clone();
    $locationEl.find(".et-pb-icon").remove(); // retire l'icône avant d'extraire le texte
    const location = $locationEl.text().trim();
    const url =
      $article.find(".et_pb_button_alignment_right a").attr("href") ?? "";
    const imageUrl = $article.find("img").attr("src") ?? "";

    fights.push({
      id: parsedDate.getTime() + Math.floor(Math.random() * 1000),
      name,
      url,
      imageUrl,
      date: parsedDate,
      location,
      organizer: Organizer.CAGE_WARRIORS,
    });
  });

  return fights;
}
