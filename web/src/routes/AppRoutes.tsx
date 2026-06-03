import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { Placeholder } from '../pages/Placeholder';
import { Login } from '../pages/Login';
import { Professors } from '../pages/Professors';
import { Rooms } from '../pages/Rooms';
import { Feriados } from '../pages/Feriados';
import { Subjects } from '../pages/Subjects';
import { Turmas } from '../pages/Turmas';
import { Curriculum } from '../pages/Curriculum';
import { Aulas } from '../pages/Aulas';
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
          <Route path="turmas" element={<Turmas />} />
          <Route path="aulas" element={<Aulas />} />
          <Route path="matriz-curricular" element={<Curriculum />} />
          <Route path="matriculas" element={<Placeholder />} />
          <Route path="perfil" element={<Placeholder />} />
          <Route path="professores" element={<Professors />} />
          <Route path="salas" element={<Rooms />} />
          <Route path="feriados" element={<Feriados />} />
          <Route path="disciplinas" element={<Subjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
