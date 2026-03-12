import { useEffect, useState } from "react";

type BannerMotivacionalProps = {
    nombre: string;
    pesoActual: number;
    pesoMeta: number;
    pesoInicial: number;
};

const slides = [
    {
        etiqueta: "Disciplina",
        titulo: "No negocies con tu disciplina",
        texto:
            "Cada día que registras, entrenas y te cuidas, construyes una versión más fuerte de ti.",
    },
    {
        etiqueta: "Progreso",
        titulo: "El cambio físico se gana con constancia",
        texto:
            "Tu evolución real no depende de un día perfecto, depende de repetir hábitos sólidos muchas veces.",
    },
    {
        etiqueta: "CoreReset",
        titulo: "Tu mejor versión ya está en construcción",
        texto:
            "Esta app no solo mide tu progreso. También protege tu enfoque y tu amor propio.",
    },
];

export default function BannerMotivacional({
    nombre,
    pesoActual,
    pesoMeta,
    pesoInicial,
}: BannerMotivacionalProps) {
    const [indiceSlide, setIndiceSlide] = useState(0);

    const progreso = pesoActual - pesoInicial;
    const kilosFaltantes = pesoMeta - pesoActual;

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndiceSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    const slideActual = slides[indiceSlide];

    return (
        <section className="mb-8 overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="p-5 sm:p-6 lg:p-8">
                    <p className="text-xs uppercase tracking-[0.35em] text-lime-400 sm:text-sm">
                        CoreReset Tracker
                    </p>

                    <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                        Hola, {nombre}
                    </h1>

                    <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.3em] text-lime-400">
                            {slideActual.etiqueta}
                        </p>

                        <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                            {slideActual.titulo}
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
                            {slideActual.texto}
                        </p>

                        <div className="mt-5 flex gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setIndiceSlide(index)}
                                    className={`h-2.5 rounded-full transition-all ${indiceSlide === index
                                            ? "w-8 bg-lime-400"
                                            : "w-2.5 bg-zinc-600"
                                        }`}
                                    aria-label={`Ir al mensaje ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-800 bg-zinc-950/80 p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-8">
                    <p className="text-sm font-medium text-zinc-400">
                        Estado actual
                    </p>

                    <div className="mt-5 space-y-4">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-sm text-zinc-400">Peso actual</p>
                            <p className="mt-1 text-xl font-semibold text-white">
                                {pesoActual} kg
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-sm text-zinc-400">Peso meta</p>
                            <p className="mt-1 text-xl font-semibold text-white">
                                {pesoMeta} kg
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-sm text-zinc-400">Progreso desde inicio</p>
                            <p className="mt-1 text-xl font-semibold text-lime-400">
                                {progreso >= 0 ? "+" : ""}
                                {progreso} kg
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-sm text-zinc-400">Faltan para la meta</p>
                            <p className="mt-1 text-xl font-semibold text-white">
                                {kilosFaltantes} kg
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}