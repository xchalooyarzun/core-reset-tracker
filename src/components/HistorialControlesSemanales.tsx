import type { ControlSemanal } from "../types/ControlSemanal";

type HistorialControlesSemanalesProps = {
    controles: ControlSemanal[];
};

function formatearFecha(fechaIso: string) {
    return new Date(fechaIso).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export default function HistorialControlesSemanales({
    controles,
}: HistorialControlesSemanalesProps) {
    return (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-400 sm:text-sm">
                Historial semanal
            </p>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                Tus controles corporales
            </h2>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Aquí puedes revisar cómo han cambiado tus medidas y tu peso.
            </p>

            {controles.length > 0 ? (
                <div className="mt-6 space-y-4">
                    {controles.map((control) => (
                        <div
                            key={control.id}
                            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5"
                        >
                            <p className="text-sm font-medium text-lime-400">
                                {formatearFecha(control.fecha)}
                            </p>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                <div>
                                    <p className="text-sm text-zinc-400">Peso</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.peso} kg
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Brazos</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.brazos} cm
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Piernas</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.piernas} cm
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Pectorales</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.pectorales} cm
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Espalda</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.espalda} cm
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">Cintura</p>
                                    <p className="mt-1 font-semibold text-white">
                                        {control.cintura} cm
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-4 text-sm text-zinc-400 sm:text-base">
                    Aún no tienes historial semanal registrado.
                </p>
            )}
        </section>
    );
}