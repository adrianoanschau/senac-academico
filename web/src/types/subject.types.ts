export interface Course {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  hours: number;
  curriculums?: CurriculumSubjectLink[];
}

export interface CurriculumSubjectLink {
  id: string;
  module: number;
  subjectId?: string;
  curriculum?: {
    id: string;
    name: string;
    course?: Course;
  };
}

export interface CurriculumSubject {
  id: string;
  subjectId: string;
  module: number;
  subject?: Subject;
}

export interface Curriculum {
  id: string;
  name: string;
  active: boolean;
  courseId: string;
  subjects?: CurriculumSubject[];
  course?: Course;
}
