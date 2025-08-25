export type ScheduleItem = {
  time: string;
  host: string;
  content: string;
  prepare?: string;
  participants?: string;
  location?: string;
};

export type DaySchedule = {
  title: string;
  items: ScheduleItem[];
};

export type Schedule = {
  week: string;
  note?: string;
  days: DaySchedule[];
};
