import React, { type SelectHTMLAttributes, forwardRef, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className = '', wrapperClassName = '', value, defaultValue, ...props }, ref) => {
    const hasWFull = className.includes('w-full');
    const hasFlex1 = className.includes('flex-1');
    
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const nativeSelectRef = useRef<HTMLSelectElement | null>(null);

    // Mantém a sincronização interna do valor selecionado para renderização
    const [internalValue, setInternalValue] = useState<string>(
      value !== undefined ? String(value) : (defaultValue !== undefined ? String(defaultValue) : '')
    );

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(String(value));
      }
    }, [value]);

    const setRefs = (element: HTMLSelectElement | null) => {
      nativeSelectRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // Clique fora do componente para fechar o dropdown
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Extrair opções renderizadas como `children` do Select
    const options: { value: string; label: React.ReactNode }[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === 'option') {
        const optProps = child.props as React.OptionHTMLAttributes<HTMLOptionElement> & { children?: React.ReactNode };
        options.push({
          value: optProps.value !== undefined ? String(optProps.value) : String(optProps.children ?? ''),
          label: optProps.children ?? ''
        });
      }
    });

    const handleOptionClick = (optValue: string) => {
      if (value === undefined) {
        setInternalValue(optValue);
      }
      setIsOpen(false);
      
      // Aciona silenciosamente o evento nativo para que o react-hook-form capture a alteração
      if (nativeSelectRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, "value")?.set;
        nativeInputValueSetter?.call(nativeSelectRef.current, optValue);
        const event = new Event('change', { bubbles: true });
        nativeSelectRef.current.dispatchEvent(event);
      }
    };

    const handleNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const selectedOption = options.find(opt => opt.value === internalValue);
    const displayLabel = selectedOption ? selectedOption.label : (options.length > 0 ? options[0].label : '');

    const derivedWrapperClass = [
      'relative inline-block',
      hasWFull ? 'w-full' : '',
      hasFlex1 ? 'flex-1' : '',
      wrapperClassName
    ].filter(Boolean).join(' ');

    return (
      <div className={derivedWrapperClass} ref={containerRef}>
        {/* Select original escondido para cuidar dos formulários nativamente */}
        <select
          ref={setRefs}
          className="hidden"
          value={value}
          defaultValue={defaultValue}
          {...props}
          onChange={handleNativeChange}
        >
          {children}
        </select>
        
        {/* Interface Visual */}
        <div
          onClick={() => { if (!props.disabled) setIsOpen(!isOpen); }}
          className={`${className} flex items-center justify-between select-none appearance-none ${isOpen ? 'ring-2' : ''} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          tabIndex={props.disabled ? -1 : 0}
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown size={18} className={`text-slate-400 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Opções do Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-60 overflow-y-auto py-2 custom-scrollbar left-0">
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleOptionClick(opt.value)}
                className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${internalValue === opt.value ? 'bg-blue-50 text-[#004a8d] font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';