import React, { useState, useEffect } from 'react';
import { X, Info, HelpCircle } from 'lucide-react';

export type DialogType = 'alert' | 'confirm';

export interface DialogOptions {
  type: DialogType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const DialogComponent: React.FC<DialogOptions & { onResolve: (value: boolean) => void, close: () => void }> = ({
  type,
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancelar',
  onResolve,
  close
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Permite que o componente seja renderizado primeiro antes de aplicar a opacidade, acionando a animação CSS
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  const handleClose = (result: boolean) => {
    setIsOpen(false);
    setTimeout(() => {
      onResolve(result);
      close();
    }, 200); // Tempo da transição
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => handleClose(type !== 'confirm')}></div>
      <div className={`bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 transition-all duration-200 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {type === 'confirm' ? (
              <div className="p-2 bg-orange-50 text-[#f37021] rounded-xl shrink-0">
                <HelpCircle size={24} />
              </div>
            ) : (
              <div className="p-2 bg-blue-50 text-[#004a8d] rounded-xl shrink-0">
                <Info size={24} />
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-800">
              {title || (type === 'confirm' ? 'Confirmação' : 'Atenção')}
            </h3>
          </div>
          <button onClick={() => handleClose(type !== 'confirm')} className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full">
            <X size={18} />
          </button>
        </div>
        
        <div className="py-2 text-slate-600 mb-6 font-medium">
          {message}
        </div>

        <div className="flex justify-end gap-3">
          {type === 'confirm' && (
            <button 
              onClick={() => handleClose(false)}
              className="px-4 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button 
            onClick={() => handleClose(true)}
            className={`px-5 py-2 rounded-xl font-bold text-white transition-colors shadow-lg ${
              type === 'confirm' 
                ? 'bg-[#f37021] hover:bg-[#d96017] shadow-[0_4px_14px_rgb(243,112,33,0.3)]' 
                : 'bg-[#004a8d] hover:bg-[#00386b] shadow-[0_4px_14px_rgb(0,74,141,0.3)]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};