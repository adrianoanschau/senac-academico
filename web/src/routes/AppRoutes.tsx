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
          <Route path="alunos" element={<Placeholder />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="turmas" element={<ClassGroups />} />
          <Route path="cronograma" element={<Schedule />} />
          <Route path="matriz-curricular" element={<Curriculums />} />
          <Route path="matriculas" element={<Placeholder />} />
          <Route path="perfil" element={<Placeholder />} />
          <Route path="professores" element={<Professors />} />
          <Route path="salas" element={<Rooms />} />
          <Route path="feriados" element={<CalendarReserves />} />
          <Route path="disciplinas" element={<Subjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
