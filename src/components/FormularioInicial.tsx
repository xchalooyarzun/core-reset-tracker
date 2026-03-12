import { useState } from "react";
import type { PerfilUsuario } from "../types/PerfilUsuario";

type FormularioInicialProps = {
    alGuardar: (perfil: PerfilUsuario) => void;
};

export default function FormularioInicial({
    alGuardar,
}: FormularioInicialProps) {
    const [nombre, setNombre] = useState("");
    const [pesoInicial, setPesoInicial] = useState("");
    const [pesoMeta, setPesoMeta] = useState("");
    const [metaProteina, setMetaProteina] = useState("");

    function manejarEnvio(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const nuevoPerfil: PerfilUsuario = {
            nombre,
            pesoInicial: Number(pesoInicial),
            pesoActual: Number(pesoInicial),
            pesoMeta: Number(pesoMeta),
            metaProteina: Number(metaProteina),
            fechaCreacion: new Date().toISOString(),
            fechaUltimoControl: new Date().toISOString(),
        };

        alGuardar(nuevoPerfil);
    }

    return (
        <section className="min-h-screen bg-zinc-950 px-4 text-white flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                    CoreReset Tracker
                </p>

                <h1 className="mt-3 text-3xl font-bold">
                    Configura tu sistema personal
                </h1>

                <p className="mt-3 text-zinc-400">
                    Esta app será tu panel de evolución física, disciplina y progreso.
                </p>

                <form onSubmit={manejarEnvio} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Tu nombre
                        </label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ej: Gonzalo"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Peso inicial (kg)
                        </label>
                        <input
                            type="number"
                            value={pesoInicial}
                            onChange={(e) => setPesoInicial(e.target.value)}
                            placeholder="Ej: 62"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Peso meta (kg)
                        </label>
                        <input
                            type="number"
                            value={pesoMeta}
                            onChange={(e) => setPesoMeta(e.target.value)}
                            placeholder="Ej: 70"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Meta diaria de proteína (g)
                        </label>
                        <input
                            type="number"
                            value={metaProteina}
                            onChange={(e) => setMetaProteina(e.target.value)}
                            placeholder="Ej: 124"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-lime-400 px-4 py-3 font-bold text-black transition hover:bg-lime-300"
                    >
                        Guardar perfil
                    </button>
                </form>
            </div>
        </section>
    );
}