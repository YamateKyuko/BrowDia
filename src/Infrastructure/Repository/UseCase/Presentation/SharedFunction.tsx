import { template_station, template_track, template_timetableFont, template_rgb, template_displayProperty } from "./Entity/Entity";

export function isStation(value: template_station | template_track): value is template_station {
  return "customTimetableStyle" in value;
}

export function isTimetableFont(value: template_displayProperty[keyof template_displayProperty]): value is template_timetableFont {
  return typeof value == "object" && "height" in value && "family" in value && "bold" in value && "italic" in value;
}

export function isRgb(value: any): value is template_rgb {
  return value !== null && typeof value == "object" && "r" in value && "g" in value && "b" in value;
}

export function RgbConverter(value: template_rgb): string {
  return `#${value.r.toString(16).padStart(2, "0")}${value.g.toString(16).padStart(2, "0")}${value.b.toString(16).padStart(2, "0")}`;
}