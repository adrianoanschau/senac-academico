import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { Placeholder } from '../pages/Placeholder';
import { Login } from '../pages/Login';
import { Professors } from '../pages/Professors';
import { Rooms } from '../pages/Rooms';
import { CalendarReserves } from '../pages/CalendarReserves';
import { Subjects } from '../pages/Subjects';
import { ClassGroups } from '../pages/ClassGroups';
import { Curriculums } from '../pages/Curriculums';
import { Schedule } from '../pages/Schedule';
import { Courses } from '../pages/Courses';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Placeholder />} />
          <Route path="courses" element={<Courses />} />
          <Route path="class-groups" element={<ClassGroups />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="curriculums" element={<Curriculums />} />
          <Route path="enrollments" element={<Placeholder />} />
          <Route path="profile" element={<Placeholder />} />
          <Route path="professors" element={<Professors />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="calendar-reserves" element={<CalendarReserves />} />
          <Route path="subjects" element={<Subjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
