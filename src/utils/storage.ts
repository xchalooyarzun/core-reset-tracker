import type { PerfilUsuario } from "../types/PerfilUsuario";

const CLAVE_PERFIL = "coreResetPerfil";

export function guardarPerfil(perfil: PerfilUsuario) {
  localStorage.setItem(CLAVE_PERFIL, JSON.stringify(perfil));
}

export function obtenerPerfil(): PerfilUsuario | null {
  const perfilGuardado = localStorage.getItem(CLAVE_PERFIL);

  if (!perfilGuardado) {
    return null;
  }

  return JSON.parse(perfilGuardado);
}

export function eliminarPerfil() {
  localStorage.removeItem(CLAVE_PERFIL);
}