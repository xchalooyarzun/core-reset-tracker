import type { ControlSemanal } from "../types/ControlSemanal";

const CLAVE_CONTROLES_SEMANALES = "coreResetControlesSemanales";

export function guardarControlesSemanales(controles: ControlSemanal[]) {
    localStorage.setItem(CLAVE_CONTROLES_SEMANALES, JSON.stringify(controles));
}

export function obtenerControlesSemanales(): ControlSemanal[] {
    const controlesGuardados = localStorage.getItem(CLAVE_CONTROLES_SEMANALES);

    if (!controlesGuardados) {
        return [];
    }

    return JSON.parse(controlesGuardados);
}