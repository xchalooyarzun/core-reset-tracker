type TarjetaResumenProps = {
    titulo: string;
    valor: string;
    subtitulo?: string;
};

export default function TarjetaResumen({
    titulo,
    valor,
    subtitulo,
}: TarjetaResumenProps) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
            <p className="text-sm text-zinc-400">{titulo}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{valor}</h3>
            {subtitulo ? (
                <p className="mt-2 text-sm text-zinc-500">{subtitulo}</p>
            ) : null}
        </div>
    );
}