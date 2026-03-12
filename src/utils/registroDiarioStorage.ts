import type { RegistroDiario } from "../types/RegistroDiario";

const CLAVE_REGISTROS_DIARIOS = "coreResetRegistrosDiarios";

export function guardarRegistrosDiarios(registros: RegistroDiario[]) {
    localStorage.setItem(CLAVE_REGISTROS_DIARIOS, JSON.stringify(registros));
}

export function obtenerRegistrosDiarios(): RegistroDiario[] {
    const registrosGuardados = localStorage.getItem(CLAVE_REGISTROS_DIARIOS);

    if (!registrosGuardados) {
        return [];
    }

    return JSON.parse(registrosGuardados);
}