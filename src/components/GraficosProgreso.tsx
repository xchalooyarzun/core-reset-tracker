import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import type { ControlSemanal } from "../types/ControlSemanal";
import type { RegistroDiario } from "../types/RegistroDiario";

type GraficosProgresoProps = {
    controles: ControlSemanal[];
    registros: RegistroDiario[];
};

function formatearFechaCorta(fechaIso: string) {
    return new Date(fechaIso).toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
    });
}

export default function GraficosProgreso({
    controles,
    registros,
}: GraficosProgresoProps) {
    const datosPeso = [...controles].reverse().map((control) => ({
        fecha: formatearFechaCorta(control.fecha),
        valor: control.peso,
    }));

    const datosBrazos = [...controles].reverse().map((control) => ({
        fecha: formatearFechaCorta(control.fecha),
        valor: control.brazos,
    }));

    const datosCintura = [...controles].reverse().map((control) => ({
        fecha: formatearFechaCorta(control.fecha),
        valor: control.cintura,
    }));

    const datosProteina = [...registros].reverse().map((registro) => ({
        fecha: formatearFechaCorta(registro.fecha),
        valor: registro.proteinaConsumida,
    }));

    return (
        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-lime-400 sm:text-sm">
                Estadísticas
            </p>

            <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                Gráficos de progreso
            </h2>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Aquí puedes ver visualmente cómo va cambiando tu cuerpo y tus hábitos.
            </p>

            <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                    <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                        Evolución del peso
                    </p>

                    {datosPeso.length > 0 ? (
                        <div className="h-64 sm:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={datosPeso}>
                                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="valor" stroke="#84cc16" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-400">
                            Aún no hay suficientes controles semanales para mostrar este gráfico.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                    <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                        Evolución de brazos
                    </p>

                    {datosBrazos.length > 0 ? (
                        <div className="h-64 sm:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={datosBrazos}>
                                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="valor" stroke="#22c55e" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-400">
                            Aún no hay suficientes controles semanales para mostrar este gráfico.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                    <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                        Evolución de cintura
                    </p>

                    {datosCintura.length > 0 ? (
                        <div className="h-64 sm:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={datosCintura}>
                                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="valor" stroke="#f59e0b" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-400">
                            Aún no hay suficientes controles semanales para mostrar este gráfico.
                        </p>
                    )}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
                    <p className="mb-4 text-base font-semibold text-white sm:text-lg">
                        Proteína diaria
                    </p>

                    {datosProteina.length > 0 ? (
                        <div className="h-64 sm:h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={datosProteina}>
                                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" stroke="#a1a1aa" />
                                    <YAxis stroke="#a1a1aa" />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="valor" stroke="#38bdf8" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-400">
                            Aún no hay suficientes registros diarios para mostrar este gráfico.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}