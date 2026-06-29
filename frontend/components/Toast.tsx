"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

export type ToastKind = "info" | "success" | "error";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastInput = {
  id?: string;
  kind?: ToastKind;
  title: string;
  message?: string;
  action?: ToastAction;
  durationMs?: number;
};

type Toast = Required<Omit<ToastInput, "action" | "message">> & {
  message?: string;
  action?: ToastAction;
};

type ToastContextValue = {
  push: (t: ToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      push: () => "",
      dismiss: () => undefined,
    };
  }
  return ctx;
}

let _idSeq = 0;
function nextId() {
  _idSeq += 1;
  return `toast-${Date.now()}-${_idSeq}`;
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const handle = timers.current[id];
    if (handle) {
      clearTimeout(handle);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (t: ToastInput) => {
      const id = t.id ?? nextId();
      const toast: Toast = {
        id,
        kind: t.kind ?? "info",
        title: t.title,
        message: t.message,
        action: t.action,
        durationMs: t.durationMs ?? 8000,
      };
      setToasts((prev) => [...prev, toast]);
      timers.current[id] = setTimeout(() => dismiss(id), toast.durationMs);
      return id;
    },
    [dismiss],
  );

  useEffect(
    () => () => {
      Object.values(timers.current).forEach((h) => clearTimeout(h));
    },
    [],
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={clsx(
              "pointer-events-auto w-full max-w-sm animate-fade-in rounded-xl border p-4 shadow-card backdrop-blur",
              t.kind === "error" &&
                "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-900/60 dark:text-red-50",
              t.kind === "success" &&
                "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-50",
              t.kind === "info" &&
                "border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.message && <p className="mt-1 text-sm opacity-90">{t.message}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                className="rounded p-1 text-current opacity-60 hover:opacity-100"
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {t.action && (
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick();
                    dismiss(t.id);
                  }}
                  className="rounded-lg bg-current/10 px-3 py-1 text-xs font-medium hover:bg-current/20"
                >
                  {t.action.label}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}