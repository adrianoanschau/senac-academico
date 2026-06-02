import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { Placeholder } from '../pages/Placeholder';
import { Login } from '../pages/Login';
import { Professores } from '../pages/Professores';
import { Salas } from '../pages/Salas';
import { Feriados } from '../pages/Feriados';
import { Disciplinas } from '../pages/Disciplinas';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="alunos" element={<Placeholder />} />
          <Route path="cursos" element={<Placeholder />} />
          <Route path="matriculas" element={<Placeholder />} />
          <Route path="perfil" element={<Placeholder />} />
          <Route path="professores" element={<Professores />} />
          <Route path="salas" element={<Salas />} />
          <Route path="feriados" element={<Feriados />} />
          <Route path="disciplinas" element={<Disciplinas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
