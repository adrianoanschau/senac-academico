import React from 'react';

export const Home: React.FC = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ color: '#64748b' }}>Bem-vindo ao sistema acadêmico do Senac.</p>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', flex: '1 1 200px', backgroundColor: '#f8fafc' }}>
          <h3 style={{ margin: 0, color: '#475569', fontSize: '1rem' }}>Total de Alunos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0', color: '#0f172a' }}>1.204</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', flex: '1 1 200px', backgroundColor: '#f8fafc' }}>
          <h3 style={{ margin: 0, color: '#475569', fontSize: '1rem' }}>Cursos Ativos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0', color: '#0f172a' }}>32</p>
        </div>
        <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', flex: '1 1 200px', backgroundColor: '#f8fafc' }}>
          <h3 style={{ margin: 0, color: '#475569', fontSize: '1rem' }}>Novas Matrículas</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0 0', color: '#0f172a' }}>150</p>
        </div>
      </div>
    </div>
  );
};
