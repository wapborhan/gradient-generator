import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900/95 border border-slate-700/80 text-white shadow-2xl backdrop-blur-md text-sm font-medium animate-bounce-short pointer-events-auto transition-all"
          >
            {toast.type === 'success' ? (
              <FaCheckCircle className="text-emerald-400 text-base" />
            ) : (
              <FaInfoCircle className="text-sky-400 text-base" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: (msg) => console.log(msg) };
  }
  return context;
};

