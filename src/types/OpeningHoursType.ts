export type DayOptions =
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

export type Weekdays =
  | "Lundi"
  | "Mardi"
  | "Mercredi"
  | "Jeudi"
  | "Vendredi"
  | "Samedi"
  | "Dimanche";

export type Day = {
  pos: number;
  day: Weekdays;
  open?: DayOptions;
  close?: DayOptions;
  closed: boolean;
};

export type OpeningHoursType = Day[];

export default OpeningHoursType;
