import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <header className="header">
        <h1 className="header-logo">Senac Acadêmico</h1>
        <nav className="header-nav">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
        </nav>
      </header>

      <div className="layout-body">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/" end>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/alunos">Alunos</NavLink>
            </li>
            <li>
              <NavLink to="/cursos">Cursos</NavLink>
            </li>
            <li>
              <NavLink to="/matriculas">Matrículas</NavLink>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          {/* O Outlet renderiza os componentes de página dependendo da rota atual */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
