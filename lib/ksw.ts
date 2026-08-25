import { KswEvent, Organizer } from "@/types/event";
import * as cheerio from "cheerio";
import { parseKswDate } from "./date";

const BASE_URL = "https://www.kswmma.com";
const KSW_URL = "https://www.kswmma.com/en/events";

export async function getKswUpcomingEvents() {
  const res = await fetch(KSW_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  const fights = parseFights(html);
  return fights.filter((fight) => fight.date >= new Date());
}

export async function getKswPastEvents() {
  const res = await fetch(KSW_URL, { next: { revalidate: 60 } });
  const html = await res.text();
  const fights = parseFights(html);
  return fights.filter((fight) => fight.date < new Date());
}

function parseFights(html: string): KswEvent[] {
  const $ = cheerio.load(html);
  const fights: KswEvent[] = [];

  const $container = $("#events-page-content");

  if ($container.length === 0) {
    return fights;
  }

  $container.find(".col-md-6").each((_, articleEl) => {
    const $article = $(articleEl);
    const $link = $article.find("a").first();

    const id = extractEventId($link.attr("onclick"));
    const url = $link.attr("href") ?? "";

    const name = $article
      .find(".row")
      .eq(0)
      .find(".col-sm-6")
      .first()
      .text()
      .trim();

    const rawDate = $article
      .find(".row")
      .eq(0)
      .find(".col-sm-6")
      .eq(1)
      .text()
      .trim();

    const title = $article
      .find(".row")
      .eq(1)
      .find("h2")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const location = $article
      .find(".row")
      .eq(2)
      .find(".col-sm-12")
      .first()
      .text()
      .trim();

    const rawImageUrl = $article.find("img.swipper-img").attr("src");
    const date = parseKswDate(rawDate);

    // On exclut la carte si une donnée essentielle manque ou est invalide,
    // puisque KswFight n'accepte pas null pour id / date / imageUrl.
    if (id === null || !name || !date || !rawImageUrl) {
      return;
    }

    const imageUrl = rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${BASE_URL}${rawImageUrl}`;

    fights.push({
      id,
      name,
      title,
      url,
      location,
      date,
      imageUrl,
      organizer: Organizer.KSW,
    });
  });

  return fights;
}

/**
 * Extrait l'id numérique depuis un attribut onclick="getEvent(132)".
 */
function extractEventId(onclick: string | undefined): number | null {
  if (!onclick) return null;

  const match = onclick.match(/getEvent\((\d+)\)/);
  if (!match) return null;

  return Number(match[1]);
}
