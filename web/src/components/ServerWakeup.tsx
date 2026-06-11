import React, { useState, useEffect } from 'react';
import { Loader2, Server } from 'lucide-react';
import api from '../services/api';

export const ServerWakeup: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAwake, setIsAwake] = useState(false);
  const [isTakingLong, setIsTakingLong] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const pingServer = async () => {
      try {
        // Fazemos uma requisição para garantir que a API saia da hibernação.
        await api.get('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Falhas como 401 (Não autorizado) também significam que o servidor já acordou
      } finally {
        if (isMounted) {
          setIsAwake(true);
        }
      }
    };

    // Se a resposta demorar mais de 3 segundos, exibimos a tela de hibernação
    const timer = setTimeout(() => {
      if (!isAwake && isMounted) {
        setIsTakingLong(true);
      }
    }, 3000);

    pingServer();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isAwake]);

  if (!isAwake) {
    if (isTakingLong) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
          <div className="relative mb-6">
            <Server className="w-16 h-16 text-slate-400" />
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin absolute -bottom-2 -right-2 bg-slate-50 rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Aguardando o Servidor...</h2>
          <p className="text-slate-500 max-w-md">
            A nossa API está hospedada em um serviço que entra em hibernação por inatividade.
            Isso pode levar cerca de 1 minuto. Por favor, aguarde, a aplicação carregará automaticamente em breve.
          </p>
        </div>
      );
    }
    
    // Loader discreto nos primeiros segundos enquanto verifica
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
