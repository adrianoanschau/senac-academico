import { createRoot, type Root } from 'react-dom/client';
import { DialogComponent, type DialogOptions } from '../components/DialogComponent';

let dialogRoot: Root | null = null;
let dialogContainer: HTMLDivElement | null = null;

const mountDialog = (options: DialogOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!dialogContainer) {
      dialogContainer = document.createElement('div');
      document.body.appendChild(dialogContainer);
    }
    if (!dialogRoot) dialogRoot = createRoot(dialogContainer);
    const close = () => {
      dialogRoot?.unmount();
      dialogRoot = null;
      if (dialogContainer?.parentNode) {
        dialogContainer.parentNode.removeChild(dialogContainer);
        dialogContainer = null;
      }
    };
    dialogRoot.render(<DialogComponent {...options} onResolve={resolve} close={close} />);
  });
};

export const confirmDialog = (message: string, title?: string): Promise<boolean> => mountDialog({ type: 'confirm', message, title });
export const alertDialog = (message: string, title?: string): Promise<boolean> => mountDialog({ type: 'alert', message, title });