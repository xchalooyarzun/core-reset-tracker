import { useMemo, useState } from "react";
import type { AlimentoProteico } from "../types/AlimentoProteico";

type SumadorProteinaProps = {
    metaProteina: number;
    alimentos: AlimentoProteico[];
    alCambiarAlimentos: (alimentos: AlimentoProteico[]) => void;
};

const alimentosRapidos = [
    { nombre: "Leche", cantidad: "1 vaso", proteina: 8 },
    { nombre: "Huevos", cantidad: "2 unidades", proteina: 12 },
    { nombre: "Yogur griego", cantidad: "1 unidad", proteina: 15 },
    { nombre: "Atún", cantidad: "1 lata", proteina: 20 },
    { nombre: "Avena", cantidad: "1 porción", proteina: 5 },
    { nombre: "Scoop proteína", cantidad: "1 scoop", proteina: 24 },
];

export default function SumadorProteina({
    metaProteina,
    alimentos,
    alCambiarAlimentos,
}: SumadorProteinaProps) {
    const [nombreManual, setNombreManual] = useState("");
    const [cantidadManual, setCantidadManual] = useState("");
    const [proteinaManual, setProteinaManual] = useState("");

    const proteinaTotal = useMemo(() => {
        return alimentos.reduce((total, alimento) => total + alimento.proteina, 0);
    }, [alimentos]);

    const proteinaFaltante = Math.max(metaProteina - proteinaTotal, 0);

    function agregarAlimentoRapido(
        nombre: string,
        cantidad: string,
        proteina: number
    ) {
        const nuevoAlimento: AlimentoProteico = {
            id: crypto.randomUUID(),
            nombre,
            cantidad,
            proteina,
        };

        alCambiarAlimentos([...alimentos, nuevoAlimento]);
    }

    function agregarAlimentoManual(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!nombreManual || !cantidadManual || !proteinaManual) {
            return;
        }

        const nuevoAlimento: AlimentoProteico = {
            id: crypto.randomUUID(),
            nombre: nombreManual,
            cantidad: cantidadManual,
            proteina: Number(proteinaManual),
        };

        alCambiarAlimentos([...alimentos, nuevoAlimento]);

        setNombreManual("");
        setCantidadManual("");
        setProteinaManual("");
    }

    function eliminarAlimento(id: string) {
        const nuevosAlimentos = alimentos.filter((alimento) => alimento.id !== id);
        alCambiarAlimentos(nuevosAlimentos);
    }

    return (
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                Proteína del día
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
                Suma tu proteína fácilmente
            </h3>

            <p className="mt-2 text-zinc-400">
                Agrega alimentos rápidos o suma uno manualmente. La app recalcula sola.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                    <p className="text-sm text-zinc-400">Meta diaria</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                        {metaProteina} g
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                    <p className="text-sm text-zinc-400">Proteína acumulada</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                        {proteinaTotal} g
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                    <p className="text-sm text-zinc-400">Te faltan</p>
                    <p className="mt-2 text-2xl font-bold text-lime-400">
                        {proteinaFaltante} g
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-white">
                    Botones rápidos
                </p>

                <div className="flex flex-wrap gap-3">
                    {alimentosRapidos.map((alimento) => (
                        <button
                            key={`${alimento.nombre}-${alimento.cantidad}`}
                            type="button"
                            onClick={() =>
                                agregarAlimentoRapido(
                                    alimento.nombre,
                                    alimento.cantidad,
                                    alimento.proteina
                                )
                            }
                            className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
                        >
                            + {alimento.nombre} ({alimento.proteina} g)
                        </button>
                    ))}
                </div>
            </div>

            <form onSubmit={agregarAlimentoManual} className="mt-8 grid gap-4 md:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Alimento
                    </label>
                    <input
                        type="text"
                        value={nombreManual}
                        onChange={(e) => setNombreManual(e.target.value)}
                        placeholder="Ej: Quesillo"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Cantidad
                    </label>
                    <input
                        type="text"
                        value={cantidadManual}
                        onChange={(e) => setCantidadManual(e.target.value)}
                        placeholder="Ej: 1 porción"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-white">
                        Proteína aportada (g)
                    </label>
                    <input
                        type="number"
                        value={proteinaManual}
                        onChange={(e) => setProteinaManual(e.target.value)}
                        placeholder="Ej: 18"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none"
                    />
                </div>

                <div className="md:col-span-3">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-lime-400 px-4 py-3 font-bold text-black transition hover:bg-lime-300"
                    >
                        Sumar alimento manual
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <p className="mb-3 text-sm font-medium text-white">
                    Alimentos agregados hoy
                </p>

                {alimentos.length > 0 ? (
                    <div className="space-y-3">
                        {alimentos.map((alimento) => (
                            <div
                                key={alimento.id}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                            >
                                <div>
                                    <p className="font-semibold text-white">{alimento.nombre}</p>
                                    <p className="text-sm text-zinc-400">
                                        {alimento.cantidad} · {alimento.proteina} g de proteína
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => eliminarAlimento(alimento.id)}
                                    className="rounded-xl border border-red-500 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-zinc-400">
                        Aún no has agregado alimentos proteicos hoy.
                    </p>
                )}
            </div>
        </section>
    );
}