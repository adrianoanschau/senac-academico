import React from 'react';
import { Link } from 'react-router-dom';

interface ClassGroupNotFoundProps {
  backHref?: string;
  backLabel?: string;
}

export const ClassGroupNotFound: React.FC<ClassGroupNotFoundProps> = ({
  backHref = '/class-groups',
  backLabel = 'Retornar para a lista de turmas',
}) => (
  <div className="text-center py-12">
    <p className="text-slate-600 font-medium mb-4">Turma não encontrada.</p>
    <Link to={backHref} className="text-senac-blue font-bold hover:underline">
      {backLabel}
    </Link>
  </div>
);
