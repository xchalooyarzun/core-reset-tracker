import { useEffect, useMemo, useState } from "react";
import BannerMotivacional from "../components/BannerMotivacional";
import EncabezadoDashboard from "../components/EncabezadoDashboard";
import Footer from "../components/Footer";
import FormularioControlSemanal from "../components/FormularioControlSemanal";
import FormularioInicial from "../components/FormularioInicial";
import FormularioRegistroDiario from "../components/FormularioRegistroDiario";
import GraficosProgreso from "../components/GraficosProgreso";
import HistorialControlesSemanales from "../components/HistorialControlesSemanales";
import HistorialRegistrosDiarios from "../components/HistorialRegistrosDiarios";
import TarjetaResumen from "../components/TarjetaResumen";
import type { ControlSemanal } from "../types/ControlSemanal";
import type { PerfilUsuario } from "../types/PerfilUsuario";
import type { RegistroDiario } from "../types/RegistroDiario";
import {
    guardarControlesSemanales,
    obtenerControlesSemanales,
} from "../utils/controlSemanalStorage";
import {
    guardarRegistrosDiarios,
    obtenerRegistrosDiarios,
} from "../utils/registroDiarioStorage";
import { guardarPerfil, obtenerPerfil } from "../utils/storage";

function calcularDiasDesde(fechaIso: string) {
    const ahora = new Date();
    const fecha = new Date(fechaIso);

    const diferenciaMs = ahora.getTime() - fecha.getTime();
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return diferenciaDias;
}

export default function Inicio() {
    const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
    const [registrosDiarios, setRegistrosDiarios] = useState<RegistroDiario[]>([]);
    const [controlesSemanales, setControlesSemanales] = useState<ControlSemanal[]>([]);

    useEffect(() => {
        const perfilGuardado = obtenerPerfil();
        const registrosGuardados = obtenerRegistrosDiarios();
        const controlesGuardados = obtenerControlesSemanales();

        setPerfil(perfilGuardado);
        setRegistrosDiarios(registrosGuardados);
        setControlesSemanales(controlesGuardados);
    }, []);

    function manejarGuardarPerfil(nuevoPerfil: PerfilUsuario) {
        guardarPerfil(nuevoPerfil);
        setPerfil(nuevoPerfil);
    }

    function manejarGuardarRegistro(nuevoRegistro: RegistroDiario) {
        const nuevosRegistros = [nuevoRegistro, ...registrosDiarios];
        setRegistrosDiarios(nuevosRegistros);
        guardarRegistrosDiarios(nuevosRegistros);
    }

    function manejarGuardarControl(nuevoControl: ControlSemanal) {
        const nuevosControles = [nuevoControl, ...controlesSemanales];
        setControlesSemanales(nuevosControles);
        guardarControlesSemanales(nuevosControles);

        if (perfil) {
            const perfilActualizado: PerfilUsuario = {
                ...perfil,
                pesoActual: nuevoControl.peso,
                fechaUltimoControl: nuevoControl.fecha,
            };

            guardarPerfil(perfilActualizado);
            setPerfil(perfilActualizado);
        }
    }

    const ultimoRegistro = useMemo(() => {
        if (registrosDiarios.length === 0) {
            return null;
        }

        return registrosDiarios[0];
    }, [registrosDiarios]);

    const ultimoControl = useMemo(() => {
        if (controlesSemanales.length === 0) {
            return null;
        }

        return controlesSemanales[0];
    }, [controlesSemanales]);

    if (!perfil) {
        return <FormularioInicial alGuardar={manejarGuardarPerfil} />;
    }

    const kilosFaltantes = perfil.pesoMeta - perfil.pesoActual;
    const proteinaActual = ultimoRegistro ? ultimoRegistro.proteinaConsumida : 0;
    const proteinaFaltante = Math.max(perfil.metaProteina - proteinaActual, 0);
    const diasDesdeUltimoControl = calcularDiasDesde(perfil.fechaUltimoControl);
    const tocaControlSemanal = diasDesdeUltimoControl >= 7;
    const cambioPesoDesdeInicio = perfil.pesoActual - perfil.pesoInicial;

    return (
        <main className="min-h-screen bg-zinc-950 px-3 py-6 text-white sm:px-4 sm:py-8 lg:py-10">
            <div className="mx-auto max-w-6xl">
                <EncabezadoDashboard nombre={perfil.nombre} />

                <BannerMotivacional
                    nombre={perfil.nombre}
                    pesoActual={perfil.pesoActual}
                    pesoMeta={perfil.pesoMeta}
                    pesoInicial={perfil.pesoInicial}
                />

                <section className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <TarjetaResumen
                        titulo="Peso actual"
                        valor={`${perfil.pesoActual} kg`}
                        subtitulo="Tu peso registrado actual"
                    />

                    <TarjetaResumen
                        titulo="Peso meta"
                        valor={`${perfil.pesoMeta} kg`}
                        subtitulo="Tu objetivo físico principal"
                    />

                    <TarjetaResumen
                        titulo="Meta de proteína"
                        valor={`${perfil.metaProteina} g`}
                        subtitulo="Meta diaria estimada"
                    />

                    <TarjetaResumen
                        titulo="Te faltan"
                        valor={`${kilosFaltantes} kg`}
                        subtitulo="Para llegar a tu meta"
                    />
                </section>

                <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <TarjetaResumen
                        titulo="Proteína de hoy"
                        valor={`${proteinaActual} g`}
                        subtitulo="Según tu último registro diario"
                    />

                    <TarjetaResumen
                        titulo="Te faltan"
                        valor={`${proteinaFaltante} g`}
                        subtitulo="Para llegar a tu meta diaria"
                    />

                    <TarjetaResumen
                        titulo="Creatina"
                        valor={ultimoRegistro?.creatinaTomada ? "Sí" : "No"}
                        subtitulo="Según tu último registro"
                    />

                    <TarjetaResumen
                        titulo="Rutina completa"
                        valor={ultimoRegistro?.rutinaCompleta ? "Sí" : "No"}
                        subtitulo="Cumplimiento del entrenamiento"
                    />
                </section>

                <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                    <TarjetaResumen
                        titulo="Cambio desde el inicio"
                        valor={`${cambioPesoDesdeInicio >= 0 ? "+" : ""}${cambioPesoDesdeInicio} kg`}
                        subtitulo="Comparado con tu peso inicial"
                    />

                    <TarjetaResumen
                        titulo="Días desde último control"
                        valor={`${diasDesdeUltimoControl} días`}
                        subtitulo="Tiempo desde tu última medición"
                    />

                    <TarjetaResumen
                        titulo="Estado semanal"
                        valor={tocaControlSemanal ? "Toca medir" : "Al día"}
                        subtitulo="Seguimiento corporal semanal"
                    />
                </section>

                <FormularioRegistroDiario
                    metaProteina={perfil.metaProteina}
                    alGuardar={manejarGuardarRegistro}
                />

                <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-lime-400 sm:text-sm">
                        Último registro
                    </p>

                    <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                        Resumen del día
                    </h2>

                    {ultimoRegistro ? (
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Entrenamiento</p>
                                <p className="mt-2 break-words text-lg font-semibold text-white">
                                    {ultimoRegistro.tipoEntrenamiento}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Peso de mancuerna</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoRegistro.pesoMancuerna} kg
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Agua consumida</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoRegistro.aguaLitros} litros
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Energía del día</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoRegistro.energia}/10
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:col-span-2">
                                <p className="text-sm text-zinc-400">Notas</p>
                                <p className="mt-2 break-words text-lg font-semibold text-white">
                                    {ultimoRegistro.notas || "Sin notas registradas"}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:col-span-2">
                                <p className="text-sm text-zinc-400">Alimentos proteicos del día</p>

                                {ultimoRegistro.alimentosProteicos.length > 0 ? (
                                    <div className="mt-3 space-y-2">
                                        {ultimoRegistro.alimentosProteicos.map((alimento) => (
                                            <div
                                                key={alimento.id}
                                                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                                            >
                                                <p className="font-semibold text-white">
                                                    {alimento.nombre}
                                                </p>
                                                <p className="text-sm text-zinc-400 break-words">
                                                    {alimento.cantidad} · {alimento.proteina} g de proteína
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-2 text-white">No se agregaron alimentos.</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-zinc-400 sm:text-base">
                            Aún no tienes registros diarios guardados.
                        </p>
                    )}
                </section>

                <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 shadow-2xl sm:p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-lime-400 sm:text-sm">
                        Estado del control semanal
                    </p>

                    <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                        Seguimiento corporal
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                        {tocaControlSemanal
                            ? "Ya pasaron 7 días o más. Te toca registrar un nuevo control corporal."
                            : "Tu control semanal está al día por ahora."}
                    </p>

                    {ultimoControl ? (
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Peso</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.peso} kg
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Brazos</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.brazos} cm
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Piernas</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.piernas} cm
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Pectorales</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.pectorales} cm
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Espalda</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.espalda} cm
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                                <p className="text-sm text-zinc-400">Cintura</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {ultimoControl.cintura} cm
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-zinc-400 sm:text-base">
                            Aún no has registrado ningún control semanal.
                        </p>
                    )}
                </section>

                <FormularioControlSemanal alGuardar={manejarGuardarControl} />

                <GraficosProgreso
                    controles={controlesSemanales}
                    registros={registrosDiarios}
                />

                <HistorialRegistrosDiarios registros={registrosDiarios} />

                <HistorialControlesSemanales controles={controlesSemanales} />

                <Footer />
            </div>
        </main>
    );
}