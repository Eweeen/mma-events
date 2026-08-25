/**
 * Parse une date au format "Saturday, September 26th, 2026".
 * Le jour de la semaine est ignoré, et le suffixe ordinal (st/nd/rd/th)
 * est retiré car il fait échouer le parsing natif de Date.
 */
export function parseLongEnglishDate(rawDate: string): Date | null {
  if (!rawDate) return null;

  // Retire le suffixe ordinal : "26th" -> "26", "1st" -> "1", etc.
  const cleaned = rawDate.replace(/(\d+)(st|nd|rd|th)/i, "$1");

  const date = new Date(cleaned);

  return isNaN(date.getTime()) ? null : date;
}

/**
 * Transforme "Fri, Oct 2" en objet Date.
 * Le HTML ne fournit pas l'année, donc on la déduit selon le contexte :
 * - "future" (events à venir) : on avance d'année en année tant que la
 *   date reste dans le passé (au-delà d'une marge de tolérance).
 * - "past" (events passés) : on recule d'année en année tant que la
 *   date reste dans le futur.
 */
export function parseEventDate(
  rawDate: string,
  direction: "past" | "future",
): Date | null {
  if (!rawDate) return null;

  // "Fri, Oct 2" -> "Oct 2"
  const cleaned = rawDate.split(",").pop()?.trim();
  if (!cleaned) return null;

  const now = new Date();
  let year = now.getFullYear();
  let candidate = new Date(`${cleaned} ${year}`);

  if (isNaN(candidate.getTime())) {
    return null;
  }

  if (direction === "future") {
    // marge de tolérance : un event "à venir" peut être daté
    // jusqu'à 2 mois dans le passé avant qu'on ne le pousse à l'année suivante
    const tolerance = new Date(now);
    tolerance.setMonth(tolerance.getMonth() - 2);

    // sécurité anti-boucle infinie
    let guard = 0;
    while (candidate < tolerance && guard < 20) {
      year += 1;
      candidate = new Date(`${cleaned} ${year}`);
      guard += 1;
    }
  } else {
    // direction === "past"
    let guard = 0;
    while (candidate > now && guard < 20) {
      year -= 1;
      candidate = new Date(`${cleaned} ${year}`);
      guard += 1;
    }
  }

  return candidate;
}

/**
 * Transforme "19-09-2026" (jj-mm-aaaa) en objet Date.
 * On ne peut pas utiliser new Date(rawDate) directement : selon le
 * moteur JS, "19-09-2026" peut être mal interprété (voire donner
 * Invalid Date), donc on parse les segments manuellement.
 */
export function parseKswDate(rawDate: string): Date | null {
  if (!rawDate) return null;

  const match = rawDate.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;

  const date = new Date(
    Number(year),
    Number(month) - 1, // les mois sont 0-indexés en JS
    Number(day),
  );

  return isNaN(date.getTime()) ? null : date;
}

/**
 * Parse une date au format jj/mm/aaaa ou jj/mm/aa (ex: "28/07/2026" ou "22/02/26").
 * Retourne null si le format ne correspond pas.
 */
export function parseFrenchDate(rawDate: string): Date | null {
  const match = rawDate.match(/^(\d{2})\/(\d{2})\/(\d{2}|\d{4})$/);
  if (!match) return null;

  const [, day, month, yearRaw] = match;

  // Si l'année est sur 2 chiffres, on suppose qu'elle est en 20xx
  const year = yearRaw.length === 2 ? Number(`20${yearRaw}`) : Number(yearRaw);

  const date = new Date(year, Number(month) - 1, Number(day));

  return isNaN(date.getTime()) ? null : date;
}
