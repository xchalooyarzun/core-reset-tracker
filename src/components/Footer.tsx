export default function Footer() {
    const añoActual = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t border-zinc-800 bg-zinc-950 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <p className="text-sm text-zinc-400">
                    CoreReset Tracker · {añoActual}
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                    Aplicación creada por{" "}
                    <span className="font-semibold text-lime-400">
                        Gonzalo Oyarzun
                    </span>
                </p>

                <p className="mt-2 text-xs text-zinc-600">
                    Proyecto personal de seguimiento físico, disciplina y progreso.
                </p>
            </div>
        </footer>
    );
}