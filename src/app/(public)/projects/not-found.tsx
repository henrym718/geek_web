import Link from "next/link"

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
         <h2 className="text-2xl font-bold mb-4">No se encontraron proyectos</h2>
         <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar proyectos para esta habilidad.</p>
         <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline">
            Volver al inicio
         </Link>
      </div>
   )
}
