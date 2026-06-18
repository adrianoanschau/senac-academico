export interface ScheduleCalendarFilters {
  search?: string;
  status?: string[] | string;
  subjectId?: string;
  roomId?: string;
  professorId?: string;
  classGroupId?: string;
}

export function buildScheduleCalendarQueryParams(
  range: { startStr: string; endStr: string },
  filters?: ScheduleCalendarFilters | null,
): URLSearchParams {
  const params = new URLSearchParams();
  params.append("start", range.startStr);
  params.append("end", range.endStr);

  if (filters?.search) {
    params.append("search", filters.search);
  }

  if (filters?.status) {
    if (Array.isArray(filters.status)) {
      filters.status.forEach((status) => params.append("status", status));
    } else if (filters.status !== "all") {
      params.append("status", String(filters.status));
    }
  }

  if (filters?.subjectId) {
    params.append("subjectId", filters.subjectId);
  }

  if (filters?.roomId) {
    params.append("roomId", filters.roomId);
  }

  if (filters?.professorId) {
    params.append("professorId", filters.professorId);
  }

  if (filters?.classGroupId) {
    params.append("classGroupId", filters.classGroupId);
  }

  return params;
}
