import React from "react"
import { Box } from "../ui"
import { CardGroup } from "../CardGroup/CardGroup"
import { ChartCandlestick, Forklift, Speech, Wrench, MonitorSmartphone, HeartHandshake } from "lucide-react"

const GroupList = [
   {
      title: "Tecnología y Servicios Digitales",
      icon: MonitorSmartphone,
   },
   {
      title: "Diseño, Creatividad y Comunicación",
      icon: Speech,
   },
   {
      title: "Consultoría y Asesoramiento Profesional",
      icon: ChartCandlestick,
   },
   {
      title: "Construcción, Oficios y Mantenimiento",
      icon: Wrench,
   },
   {
      title: "Bienestar y Servicios Personales",
      icon: HeartHandshake,
   },
   {
      title: "Eventos y Logística",
      icon: Forklift,
   },
]
export function CardListGroup() {
   return (
      <Box className="flex gap-4 flex-wrap w-full justify-center">
         {GroupList.map((group) => (
            <CardGroup
               key={group.title}
               title={group.title}
               Icon={group.icon}
            />
         ))}
      </Box>
   )
}
