import type { Course, Curriculum } from './subject.types';

export interface EntityId {
  id?: string | number;
}

export interface CrudCourse extends EntityId {
  name: string;
  code: string;
}

export interface Professor extends EntityId {
  name: string;
  email: string;
  degree: string;
}

export interface Room extends EntityId {
  name: string;
  type: string;
  capacity: number;
}

export interface ClassGroup extends EntityId {
  code: string;
  startDate: string;
  endDate: string;
  shift: string;
  curriculumId: string;
  curriculum?: Pick<Curriculum, 'id' | 'name'>;
}

export interface ClassGroupInfo {
  id: string;
  code: string;
  shift?: string;
  curriculum?: { name: string };
}

export interface CurriculumForm {
  id?: string;
  name: string;
  active: boolean;
  courseId: string;
}

export interface ScheduleOverride {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type: string;
}

export type { Course, Curriculum };
