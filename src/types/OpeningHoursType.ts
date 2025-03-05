type DayOptions =
  | 1
  | 2
  | 3
  | 4
  | 5
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
  | 22
  | 23
  | 0;
type Day = {
  open: DayOptions;
  close: DayOptions;
};

type OpeningHoursType = {
  Sunday: Day;
  Monday: Day;
  Tuesday: Day;
  Wednesday: Day;
  Thursday: Day;
  Friday: Day;
  Saturday: Day;
};

export default OpeningHoursType;
