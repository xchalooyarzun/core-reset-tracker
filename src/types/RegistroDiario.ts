import type { AlimentoProteico } from "./AlimentoProteico";

export type RegistroDiario = {
    id: string;
    fecha: string;
    proteinaConsumida: number;
    alimentosProteicos: AlimentoProteico[];
    aguaLitros: number;
    pesoMancuerna: number;
    tipoEntrenamiento: string;
    creatinaTomada: boolean;
    rutinaCompleta: boolean;
    energia: number;
    notas: string;
};