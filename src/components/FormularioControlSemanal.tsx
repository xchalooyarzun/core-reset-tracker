import { useState } from "react";
import type { ControlSemanal } from "../types/ControlSemanal";

type FormularioControlSemanalProps = {
    alGuardar: (control: ControlSemanal) => void;
};

export default function FormularioControlSemanal({
    alGuardar,
}: FormularioControlSemanalProps) {
    const [peso, setPeso] = useState("");
    const [brazos, setBrazos] = useState("");
    const [piernas, setPiernas] = useState("");
    const [pectorales, setPectorales] = useState("");
    const [espalda, setEspalda] = useState("");
    const [cintura, setCintura] = useState("");

    function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nuevoControl: ControlSemanal = {
            id: crypto.randomUUID(),
            fecha: new Date().toISOString(),
            peso: Number(peso),
            brazos: Number(brazos),
            piernas: Number(piernas),
            pectorales: Number(pectorales),
            espalda: Number(espalda),
            cintura: Number(cintura),
        };

        alGuardar(nuevoControl);

        setPeso("");
        setBrazos("");
        setPiernas("");
        setPectorales("");
        setEspalda("");
        setCintura("");
    }

    return (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Control semanal
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
                Registra tu evolución corporal
            </h2>

            <p className="mt-2 text-zinc-400">
                Este formulario es para registrar tu peso y medidas una vez por semana.
            </p>

            <form onSubmit={manejarEnvio} className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Peso (kg)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="Ej: 63"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Brazos (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={brazos}
                        onChange={(e) => setBrazos(e.target.value)}
                        placeholder="Ej: 36"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Piernas (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={piernas}
                        onChange={(e) => setPiernas(e.target.value)}
                        placeholder="Ej: 56"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Pectorales (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={pectorales}
                        onChange={(e) => setPectorales(e.target.value)}
                        placeholder="Ej: 102"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Espalda (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={espalda}
                        onChange={(e) => setEspalda(e.target.value)}
                        placeholder="Ej: 110"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Cintura (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={cintura}
                        onChange={(e) => setCintura(e.target.value)}
                        placeholder="Ej: 80"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                        required
                    />
                </div>

                <div className="md:col-span-2 xl:col-span-3">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-lime-400 px-4 py-3 font-bold text-black transition hover:bg-lime-300"
                    >
                        Guardar control semanal
                    </button>
                </div>
            </form>
        </section>
    );
}