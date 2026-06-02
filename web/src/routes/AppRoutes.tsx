import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Home } from '../pages/Home';
import { Placeholder } from '../pages/Placeholder';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="alunos" element={<Placeholder />} />
          <Route path="cursos" element={<Placeholder />} />
          <Route path="matriculas" element={<Placeholder />} />
          <Route path="perfil" element={<Placeholder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
