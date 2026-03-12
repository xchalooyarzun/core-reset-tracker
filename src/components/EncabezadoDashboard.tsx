type EncabezadoDashboardProps = {
    nombre: string;
};

export default function EncabezadoDashboard({
    nombre,
}: EncabezadoDashboardProps) {
    return (
        <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-400">
                CoreReset Tracker
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
                Hola, {nombre}
            </h1>

            <p className="mt-2 text-zinc-400">
                Este es tu panel personal de evolución física.
            </p>
        </div>
    );
}