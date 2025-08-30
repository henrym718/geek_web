import { Icon } from "@/components/icon"
import { StatsCard } from "./components/StatsCard"
import { ActionTitle } from "./components/ActionTitle"

export default function TalentDasboardPage() {
   const stats = {
      activeApplications: 12,
      completionRate: 85,
      monthlyEarnings: 2450,
      profileViews: 180,
   }

   return (
      <main className="px-4 sm:px-6 lg:px-8 py-8">
         {/* Welcome Section */}
         <div className="mb-8">
            <div className="flex items-center justify-between">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900">¡Hola, {" Henry Profesional"}!</h1>
                  <p className="text-gray-600 mt-2">Gestiona tu carrera profesional desde tu dashboard personalizado</p>
               </div>
               <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Icon
                     name="Calendar"
                     size={16}
                     className="text-gray-400"
                  />
                  <span className="text-sm text-gray-600">
                     {new Date()?.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                     })}
                  </span>
               </div>
            </div>
         </div>

         {/* Stats Cards */}
         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
               title="Solicitudes Activas"
               value={stats?.activeApplications}
               icon="FileText"
               trend="+3 esta semana"
               color="blue"
            />
            <StatsCard
               title="Tasa de Éxito"
               value={`${stats?.completionRate}%`}
               icon="Target"
               trend="+5% este mes"
               color="green"
            />
            <StatsCard
               title="Ingresos Mensuales"
               value={`€${stats?.monthlyEarnings}`}
               icon="Euro"
               trend="+12% vs mes anterior"
               color="purple"
            />
            <StatsCard
               title="Vistas del Perfil"
               value={stats?.profileViews}
               icon="Eye"
               trend="+23 esta semana"
               color="orange"
            />
         </section>

         {/* Action Tiles */}
         <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ActionTitle
               title="Proyectos Disponibles"
               description="Explora nuevas oportunidades"
               icon="Search"
               link="/talent/available-projects"
               badge="15 nuevos"
               color="primary"
            />

            <ActionTitle
               title="Mis Solicitudes"
               description="Gestiona tus aplicaciones"
               icon="FileText"
               link="/my-applications"
               badge="3 pendientes"
               color="blue"
            />

            <ActionTitle
               title="Mi Perfil"
               description="Crea o actualiza tus perfiles"
               icon="User"
               link="/talent/profiles"
               badge="90% completo"
               color="green"
            />

            <ActionTitle
               title="Mensajes"
               description="Comunicación con clientes"
               icon="MessageCircle"
               link="/messages"
               badge="5 sin leer"
               color="orange"
            />

            <ActionTitle
               title="Historial de Ingresos"
               description="Revisa tus ganancias"
               icon="TrendingUp"
               link="/earnings"
               badge="+12% este mes"
               color="purple"
            />
         </section>
      </main>
   )
}
