import type { RegistroDiario } from "../types/RegistroDiario";

type HistorialRegistrosDiariosProps = {
    registros: RegistroDiario[];
};

function formatearFecha(fechaIso: string) {
    return new Date(fechaIso).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default function HistorialRegistrosDiarios({
    registros,
}: HistorialRegistrosDiariosProps) {
    return (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-400 sm:text-sm">
                Historial diario
            </p>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                Tus registros del día
            </h2>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Aquí puedes revisar tus entrenamientos y hábitos guardados.
            </p>

            {registros.length > 0 ? (
                <div className="mt-6 space-y-4">
                    {registros.map((registro) => (
                        <div
                            key={registro.id}
                            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                                <p className="text-sm font-medium text-lime-400">
                                    {formatearFecha(registro.fecha)}
                                </p>

                                <p className="text-sm text-zinc-400">
                                    Energía: {registro.energia}/10
                                </p>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                <div>
                                    <p className="text-sm text-zinc-400">Proteína</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {registro.proteinaConsumida} g
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Agua</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {registro.aguaLitros} litros
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Mancuerna</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {registro.pesoMancuerna} kg
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Entrenamiento</p>
                                    <p className="mt-1 font-semibold text-white break-words">
                                        {registro.tipoEntrenamiento}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Creatina</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {registro.creatinaTomada ? "Sí" : "No"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Rutina completa</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {registro.rutinaCompleta ? "Sí" : "No"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-zinc-400">Notas</p>
                                <p className="mt-1 break-words text-white">
                                    {registro.notas || "Sin notas registradas"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-sm text-zinc-400 sm:text-base">
                    Aún no tienes historial diario registrado.
                </p>
            )}
        </section>
    );
}