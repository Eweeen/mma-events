"use server";

import { Organizer, UfcEvent } from "@/types/event";
import * as cheerio from "cheerio";

const UFC_URL = "https://www.ufc.com";
const EVENTS_UPCOMING = `${UFC_URL}/events#events-list-upcoming`;
const EVENTS_PAST = `${UFC_URL}/events#events-list-past`;

export async function getUfcUpcomingEvents() {
  const res = await fetch(EVENTS_UPCOMING, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, false);
}

export async function getUfcPastEvents() {
  const res = await fetch(EVENTS_PAST, { next: { revalidate: 60 } });
  const html = await res.text();
  return parseFights(html, true);
}

function parseFights(html: string, isPast: boolean): UfcEvent[] {
  const $ = cheerio.load(html);
  const fights: UfcEvent[] = [];

  const $container = isPast
    ? $(".view-display-id-past").first()
    : $(".view-display-id-upcoming").first();

  if ($container.length === 0) {
    return fights;
  }

  $container.find("article.c-card-event--result").each((_, articleEl) => {
    const $article = $(articleEl);

    const $headlineLink = $article
      .find(".c-card-event--result__headline a")
      .first();
    const url = $headlineLink.attr("href") ?? "";
    const name = $headlineLink.text().trim();

    const $svgEl = $article.find(".c-card-event--result__logo svg").first();
    const svg = $svgEl.length ? $.html($svgEl) : "";

    const $dateEl = $article.find(".c-card-event--result__date").first();
    const timestamp = $dateEl.attr("data-main-card-timestamp");
    const date = timestamp
      ? new Date(parseInt(timestamp, 10) * 1000)
      : new Date(NaN);

    const place = $article
      .find(".c-card-event--result__location h5")
      .first()
      .text()
      .trim();

    const $addr = $article
      .find(".c-card-event--result__location p.address")
      .first();
    const address = $addr
      .find("span")
      .map((_, s) => $(s).text().trim())
      .get()
      .join(", ");

    // Combat principal affiché par défaut (premier fight-card-tickets trouvé)
    const $fight = $article.find(".fight-card-tickets").first();

    // On exclut les événements dont le combat principal n'est pas encore annoncé
    // (ex. "TBD vs TBD" dans l'attribut data-fight-label)
    const fightLabel = $fight.attr("data-fight-label") ?? "";
    if (/TBD/i.test(fightLabel)) {
      return;
    }

    const redCornerImage =
      $fight.find(".field--name-red-corner img").first().attr("src") ?? "";
    const blueCornerImage =
      $fight.find(".field--name-blue-corner img").first().attr("src") ?? "";

    fights.push({
      id: date.getTime() + Math.floor(Math.random() * 1000),
      url,
      name,
      svg,
      redCornerImage,
      blueCornerImage,
      date,
      location: place && address && `${place}, ${address}`,
      organizer: Organizer.UFC,
    });
  });

  return fights;
}
