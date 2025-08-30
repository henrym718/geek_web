"use client"
import { Icon } from "@/components/icon"
import { Button, InputField, Typography } from "@/components/ui"
import { cn } from "@/lib/utils/cn"
import React, { useState } from "react"

interface State {
   filterOptSelected: "All" | "Active" | "Inactive" | "Completed" | "Incompleted"
}

export default function ProfilesPage() {
   const [filterOptSelected, setFilterOptSelected] = useState<State["filterOptSelected"]>("All")
   return (
      <div className="min-h-screen">
         <Typography variant="titulo2">Mis perfiles Profesionales</Typography>
         <Typography variant="label">Gestiona y edita todos tus perfiles desde un solo lugar</Typography>

         <div className="pt-5">
            <InputField
               type="search"
               placeholder="Buscar por titulo, descripcion o habilidades"
            />
         </div>

         <div className="flex gap-x-2 pt-4">
            <Button
               className={cn(filterOptSelected === "All" && "bg-blue-700 text-white hover:bg-blue-700", "rounded-none [&_svg]:size-3.5")}
               onClick={() => setFilterOptSelected("All")}
               variant="outline">
               <span className="flex items-center gap-2">
                  <Icon name="Circle" />
                  Todos
               </span>
            </Button>

            <Button
               className={cn(filterOptSelected === "Active" && "bg-blue-700 text-white hover:bg-blue-700", "rounded-none [&_svg]:size-3.5")}
               onClick={() => setFilterOptSelected("Active")}
               variant="outline">
               <span className="flex items-center gap-3 ">
                  <Icon name="Play" />
                  Activos
               </span>
            </Button>
            <Button
               className={cn(filterOptSelected === "Inactive" && "bg-blue-700 text-white hover:bg-blue-700", "rounded-none [&_svg]:size-3.5")}
               onClick={() => setFilterOptSelected("Inactive")}
               variant="outline">
               <span className="flex items-center gap-3 ">
                  <Icon name="ActivitySquare" />
                  Inactivos
               </span>
            </Button>
            <Button
               className={cn(filterOptSelected === "Completed" && "bg-blue-600 text-white hover:bg-blue-700", "rounded-none [&_svg]:size-3.5")}
               onClick={() => setFilterOptSelected("Completed")}
               variant="outline">
               <span className="flex items-center gap-3 ">
                  <Icon name="CheckCheck" />
                  Completos
               </span>
            </Button>
            <Button
               className={cn(filterOptSelected === "Incompleted" && "bg-blue-700 text-white hover:bg-blue-700", "rounded-none [&_svg]:size-3.5")}
               onClick={() => setFilterOptSelected("Incompleted")}
               variant="outline">
               <span className="flex items-center gap-3 ">
                  <Icon name="CheckSquare2" />
                  Incompletos
               </span>
            </Button>
         </div>

         <div className="pt-2">
            <Typography variant="label">Mostrando 4 de 4 perfiles</Typography>
         </div>
      </div>
   )
}
