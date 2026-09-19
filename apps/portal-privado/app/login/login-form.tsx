"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-space-md">
      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Correo</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div>
        <label className="block font-label-md text-label-md text-on-surface mb-1">Contraseña</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            className="w-full h-11 px-3 pr-11 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-secondary hover:text-on-surface transition-colors"
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>
      {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-5 py-3 rounded-lg shadow-sm transition-all disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
