import { useEffect, useState } from 'react';

import api from '../services/api';
import type { ClassGroup, Course, Curriculum } from '../types/entities';
import { extractListData } from '../utils/apiResponse';

interface DashboardStats {
  courses: number;
  classGroups: number;
  professors: number;
  rooms: number;
}

interface ShiftData {
  Manhã: number;
  Tarde: number;
  Noite: number;
}

interface TopCourse {
  name: string;
  count: number;
}

const emptyShifts = (): ShiftData => ({ Manhã: 0, Tarde: 0, Noite: 0 });

function computeTopCourses(
  classGroups: ClassGroup[],
  curriculums: Curriculum[],
  courses: Course[],
): TopCourse[] {
  const courseCounts: Record<string, number> = {};

  classGroups.forEach((classGroup) => {
    let courseName = 'Não atribuído';

    if (classGroup.curriculumId) {
      const curriculum = curriculums.find(
        (c) => c.id === classGroup.curriculumId,
      );

      if (curriculum?.course?.name) {
        courseName = curriculum.course.name;
      } else if (curriculum) {
        const course = courses.find((item) => item.id === curriculum.courseId);
        if (course) courseName = course.name;
      }
    }

    courseCounts[courseName] = (courseCounts[courseName] || 0) + 1;
  });

  return Object.entries(courseCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    courses: 0,
    classGroups: 0,
    professors: 0,
    rooms: 0,
  });
  const [shiftData, setShiftData] = useState<ShiftData>(emptyShifts);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          coursesRes,
          classGroupsRes,
          professorsRes,
          roomsRes,
          curriculumsRes,
        ] = await Promise.all([
          api.get('/courses').catch(() => ({ data: [] })),
          api.get('/class-groups').catch(() => ({ data: [] })),
          api.get('/professors').catch(() => ({ data: [] })),
          api.get('/rooms').catch(() => ({ data: [] })),
          api.get('/curriculums').catch(() => ({ data: [] })),
        ]);

        const courses = extractListData<Course>(coursesRes);
        const classGroups = extractListData<ClassGroup>(classGroupsRes);
        const professors = extractListData<{ id: string }>(professorsRes);
        const rooms = extractListData<{ id: string }>(roomsRes);
        const curriculums = extractListData<Curriculum>(curriculumsRes);

        setStats({
          courses: courses.length,
          classGroups: classGroups.length,
          professors: professors.length,
          rooms: rooms.length,
        });

        const shifts = emptyShifts();
        classGroups.forEach((classGroup) => {
          if (classGroup.shift === 'Manhã') shifts.Manhã++;
          if (classGroup.shift === 'Tarde') shifts.Tarde++;
          if (classGroup.shift === 'Noite') shifts.Noite++;
        });
        setShiftData(shifts);
        setTopCourses(computeTopCourses(classGroups, curriculums, courses));
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  return { stats, shiftData, topCourses, isLoading };
}
