import { Link } from "@/lib/router";
import { House, ArrowLeft } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#E0F2F1] to-white px-6"
      data-testid="page-not-found"
    >
      <div className="text-center max-w-lg" data-testid="card-not-found">
        <p
          className="text-8xl font-bold text-[#0097A7] mb-4"
          data-testid="text-not-found-code"
        >
          404
        </p>
        <h1
          className="text-3xl font-bold text-[#0A2540] mb-3"
          data-testid="text-not-found-title"
        >
          Página no encontrada
        </h1>
        <p
          className="text-gray-600 text-lg mb-8"
          data-testid="text-not-found-body"
        >
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            data-testid="link-go-home"
          >
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0097A7] hover:bg-[#00838F] text-white font-semibold rounded-full transition-colors"
              data-testid="button-go-home"
            >
              <House size={20} weight="bold" />
              Ir al inicio
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0097A7] text-[#0097A7] hover:bg-[#E0F2F1] font-semibold rounded-full transition-colors"
            data-testid="button-go-back"
          >
            <ArrowLeft size={20} weight="bold" />
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}
