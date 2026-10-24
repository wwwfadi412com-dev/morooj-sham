import type { Area } from "./types";
import generated from "./generated/areas.json";

/** Areas are edited in /admin (content/areas/), sorted by their "order" field. */
export const areas = generated as unknown as Area[];

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}
