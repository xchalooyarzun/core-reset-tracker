import { useMemo, useState } from "react";
import SumadorProteina from "./SumadorProteina";
import type { AlimentoProteico } from "../types/AlimentoProteico";
import type { RegistroDiario } from "../types/RegistroDiario";

type FormularioRegistroDiarioProps = {
    metaProteina: number;
    alGuardar: (registro: RegistroDiario) => void;
};

export default function FormularioRegistroDiario({
    metaProteina,
    alGuardar,
}: FormularioRegistroDiarioProps) {
    const [alimentosProteicos, setAlimentosProteicos] = useState<AlimentoProteico[]>([]);
    const [aguaLitros, setAguaLitros] = useState("");
    const [pesoMancuerna, setPesoMancuerna] = useState("");
    const [tipoEntrenamiento, setTipoEntrenamiento] = useState("");
    const [creatinaTomada, setCreatinaTomada] = useState(false);
    const [rutinaCompleta, setRutinaCompleta] = useState(false);
    const [energia, setEnergia] = useState("");
    const [notas, setNotas] = useState("");

    const proteinaConsumida = useMemo(() => {
        return alimentosProteicos.reduce(
            (total, alimento) => total + alimento.proteina,
            0
        );
    }, [alimentosProteicos]);

    function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nuevoRegistro: RegistroDiario = {
            id: crypto.randomUUID(),
            fecha: new Date().toISOString(),
            proteinaConsumida,
            alimentosProteicos,
            aguaLitros: Number(aguaLitros),
            pesoMancuerna: Number(pesoMancuerna),
            tipoEntrenamiento,
            creatinaTomada,
            rutinaCompleta,
            energia: Number(energia),
            notas,
        };

        alGuardar(nuevoRegistro);

        setAlimentosProteicos([]);
        setAguaLitros("");
        setPesoMancuerna("");
        setTipoEntrenamiento("");
        setCreatinaTomada(false);
        setRutinaCompleta(false);
        setEnergia("");
        setNotas("");
    }

    return (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Registro diario
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
                Registra tu día
            </h2>

            <p className="mt-2 text-zinc-400">
                Aquí dejarás guardado tu progreso diario, disciplina y entrenamiento.
            </p>

            <div className="mt-8">
                <SumadorProteina
                    metaProteina={metaProteina}
                    alimentos={alimentosProteicos}
                    alCambiarAlimentos={setAlimentosProteicos}
                />
            </div>

            <form onSubmit={manejarEnvio} className="mt-8 grid gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Agua tomada (litros)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={aguaLitros}
                        onChange={(e) => setAguaLitros(e.target.value)}
                        placeholder="Ej: 2.5"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Peso de mancuerna (kg)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={pesoMancuerna}
                        onChange={(e) => setPesoMancuerna(e.target.value)}
                        placeholder="Ej: 15"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Tipo de entrenamiento
                    </label>
                    <input
                        type="text"
                        value={tipoEntrenamiento}
                        onChange={(e) => setTipoEntrenamiento(e.target.value)}
                        placeholder="Ej: Pecho, hombros y abdomen"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Energía del día (1 a 10)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={energia}
                        onChange={(e) => setEnergia(e.target.value)}
                        placeholder="Ej: 8"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                        Notas del día
                    </label>
                    <textarea
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                        placeholder="Ej: Buen bombeo de pecho, me sentí fuerte"
                        rows={4}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
                    <input
                        id="creatina"
                        type="checkbox"
                        checked={creatinaTomada}
                        onChange={(e) => setCreatinaTomada(e.target.checked)}
                        className="h-4 w-4 accent-lime-400"
                    />
                    <label htmlFor="creatina" className="text-sm text-white">
                        Tomé creatina
                    </label>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3">
                    <input
                        id="rutina"
                        type="checkbox"
                        checked={rutinaCompleta}
                        onChange={(e) => setRutinaCompleta(e.target.checked)}
                        className="h-4 w-4 accent-lime-400"
                    />
                    <label htmlFor="rutina" className="text-sm text-white">
                        Completé la rutina
                    </label>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-lime-400 px-4 py-3 font-bold text-black transition hover:bg-lime-300"
                    >
                        Guardar registro diario
                    </button>
                </div>
            </form>
        </section>
    );
}