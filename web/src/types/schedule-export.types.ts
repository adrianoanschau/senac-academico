export interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  status?: string;
  subject?: { name: string; code?: string; hours?: number };
  professor?: { name: string };
  room?: { name: string };
  classGroup?: { code: string; shift?: string };
}
