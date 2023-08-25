import { template_station, template_track, template_timetableFont, template_rgb, template_displayProperty, template_trainType } from './Entity/Entity';

export function isStation(value: any): value is template_station {
  return typeof value == "object" && "customTimetableStyle" in value;
}

export function isTimetableFont(value: any): value is template_timetableFont {
  return typeof value == "object" && "height" in value && "family" in value && "bold" in value && "italic" in value;
}

export function isRgb(value: any): value is template_rgb {
  return value !== null && typeof value == "object" && "r" in value && "g" in value && "b" in value;
}

export function RgbConverter(value: template_rgb): string {
  return `#${value.r.toString(16).padStart(2, "0")}${value.g.toString(16).padStart(2, "0")}${value.b.toString(16).padStart(2, "0")}`;
}

export function HexConverter(value: string): template_rgb {
  if (value.slice(0, 1) == "#") {value = value.slice(1)}

	return {r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16)}
}

export function TimeConverter(value: number): string {
	return (`${Math.floor(value / 3600).toString().padStart(2, " ")}-${Math.floor(value % 3600 / 60).toString().padStart(2, "0")}-${Math.floor(value % 60).toString().padStart(2, "0")}`)
}

export function SecondsConverter(value: string): number {
  for (let i = 0; i <= 9; i += 3) {
    value.substring(i, i + 2)
  }
  
  
  const values = value.split("-")
  const time: number = Number(values[0].trim()) * 3600 % 86400 + Number(values[1].trim()) * 60 + Number(values[2].trim())
  if (isNaN(time)) {return 0}
	return time
}