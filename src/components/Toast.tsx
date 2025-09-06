import React, { useState, useEffect } from "react";
import { ToastContext } from "../hooks";
import type { Toast } from "../types";

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: "success" | "error", message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, type, message };

    setToasts((prev) => [...prev, toast]);

    // Auto remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div
        className="fixed top-4 right-4 z-50 space-y-2"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`max-w-sm w-full shadow-2xl rounded-2xl pointer-events-auto ring-1 ring-black/5 overflow-hidden backdrop-blur-lg ${
          toast.type === "success"
            ? "bg-gradient-to-br from-emerald-50/95 to-green-50/95 border-l-4 border-emerald-500"
            : "bg-gradient-to-br from-red-50/95 to-rose-50/95 border-l-4 border-red-500"
        }`}
      >
        <div className="p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  toast.type === "success"
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/25"
                    : "bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/25"
                }`}
              >
                {toast.type === "success" ? (
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="ml-4 w-0 flex-1 pt-1">
              <p
                className={`text-sm font-semibold ${
                  toast.type === "success" ? "text-emerald-900" : "text-red-900"
                }`}
              >
                {toast.message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`rounded-xl inline-flex p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:scale-110 ${
                  toast.type === "success"
                    ? "text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100 focus:ring-emerald-500"
                    : "text-red-400 hover:text-red-600 hover:bg-red-100 focus:ring-red-500"
                }`}
                onClick={handleRemove}
                aria-label="Close notification"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className={`h-1 w-full ${toast.type === "success" ? "bg-emerald-200" : "bg-red-200"}`}>
          <div
            className={`h-full transition-all duration-[4000ms] ease-linear ${
              toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
            style={{ width: isVisible ? "0%" : "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
