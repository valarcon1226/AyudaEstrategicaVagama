"use client";

import { useActionState, useState, useTransition } from "react";
import type { PublicUser } from "@shared/permissions";
import { PERMISSION_MODULES, PERMISSION_LABELS } from "@shared/permissions";
import { createUserAction, deleteUserAction, togglePermissionAction, type CreateUserState } from "./actions";

export function UsersManager({ users, currentUserId }: { users: PublicUser[]; currentUserId: string }) {
  const [newOpen, setNewOpen] = useState(false);
  const [state, formAction, pending] = useActionState<CreateUserState, FormData>(createUserAction, null);
  const [, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <p className="font-body-md text-body-md text-on-surface-variant">
          {users.length} usuario(s) — los partners solo ven los módulos marcados abajo.
        </p>
        <button
          type="button"
          onClick={() => setNewOpen((v) => !v)}
          className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Nuevo Usuario
        </button>
      </div>

      {newOpen && (
        <form
          action={formAction}
          className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Nombre</label>
              <input name="name" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Correo</label>
              <input name="email" type="email" required className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Contraseña temporal</label>
              <input name="password" type="text" required minLength={8} className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none" placeholder="Mínimo 8 caracteres" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Rol</label>
              <select name="role" className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md focus:outline-none">
                <option value="partner">Partner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <span className="block font-label-md text-label-md text-on-surface mb-1">
              Permisos (se ignoran si el rol es Admin)
            </span>
            <div className="flex flex-wrap gap-3">
              {PERMISSION_MODULES.map((m) => (
                <label key={m} className="flex items-center gap-1.5 text-body-sm text-on-surface">
                  <input type="checkbox" name={`perm_${m}`} className="accent-primary" />
                  {PERMISSION_LABELS[m]}
                </label>
              ))}
            </div>
          </div>
          {state?.error && <p className="text-error font-body-sm text-body-sm">{state.error}</p>}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg shadow-sm transition-all disabled:opacity-60"
            >
              {pending ? "Creando..." : "Crear usuario"}
            </button>
            <button type="button" onClick={() => setNewOpen(false)} className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-space-sm">
        {users.map((u) => (
          <div key={u.id} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-headline-sm text-headline-sm text-on-surface">{u.name}</h4>
                <span className={u.role === "admin" ? "px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm" : "px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm"}>
                  {u.role === "admin" ? "Admin" : "Partner"}
                </span>
                {u.id === currentUserId && <span className="text-[11px] text-secondary">(tú)</span>}
              </div>
              <p className="font-body-sm text-body-sm text-secondary">{u.email}</p>
            </div>
            {u.role === "admin" ? (
              <span className="font-body-sm text-body-sm text-secondary">Acceso total</span>
            ) : (
              <div className="flex flex-wrap gap-3">
                {PERMISSION_MODULES.map((m) => (
                  <label key={m} className="flex items-center gap-1.5 text-body-sm text-on-surface">
                    <input
                      type="checkbox"
                      defaultChecked={u.permissions.includes(m)}
                      onChange={(e) =>
                        startTransition(() => {
                          togglePermissionAction(u.id, m, e.target.checked);
                        })
                      }
                      className="accent-primary"
                    />
                    {PERMISSION_LABELS[m]}
                  </label>
                ))}
              </div>
            )}
            {u.id !== currentUserId && (
              <button
                type="button"
                onClick={() => startTransition(() => deleteUserAction(u.id))}
                className="text-error text-[13px] font-medium hover:underline self-start sm:self-center"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
