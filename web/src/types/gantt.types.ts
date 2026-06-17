export interface GanttSession {
  startTime: string;
  endTime: string;
}

export interface GanttConflict {
  type: 'PROFESSOR' | 'ROOM' | 'CLASS_GROUP';
  message: string;
  taskIds: string[];
  sessionStart: string;
  sessionEnd: string;
}

export interface GanttBlueprintTask {
  id: string;
  curriculumSubjectId: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  hours: number;
  dependsOnId: string | null;
  daysOfWeek: number[];
  professorId?: string;
  roomId?: string;
  start: string;
  end: string;
  sessions: GanttSession[];
}

export interface GanttBlueprintResult {
  blueprintId: string;
  classGroupId: string;
  moduleNumber: number;
  startTimeStr: string;
  endTimeStr: string;
  tasks: GanttBlueprintTask[];
  conflicts: GanttConflict[];
  canPublish: boolean;
}

export interface ModuleSubject {
  id: string;
  subjectId: string;
  dependsOnId: string | null;
  subject: {
    id: string;
    code: string;
    name: string;
    hours: number;
  };
}

export interface SubjectConfig {
  curriculumSubjectId: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  hours: number;
  daysOfWeek: number[];
  startDate: string;
  dependsOnId: string;
  isPriority: boolean;
  professorId: string;
  roomId: string;
}

export interface GanttSubjectPayload {
  curriculumSubjectId: string;
  subjectId: string;
  daysOfWeek: number[];
  startDate?: string;
  dependsOnId?: string | null;
  isPriority?: boolean;
  professorId?: string;
  roomId?: string;
}
