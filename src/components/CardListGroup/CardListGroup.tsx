"use client"

import React from "react"
import { Box } from "../ui"
import { CardGroup } from "../CardGroup/CardGroup"
import { ChartCandlestick, Forklift, Speech, Wrench, MonitorSmartphone, HeartHandshake } from "lucide-react"

const GroupList = [
   {
      id: "b22ed7f6-bbbf-415d-bcdd-108a8596601b",
      title: "Tecnología y Servicios Digitales",
      icon: MonitorSmartphone,
   },
   {
      id: "f4f94706-491c-408c-8bea-992512d28e67",
      title: "Diseño, Creatividad y Comunicación",
      icon: Speech,
   },
   {
      id: "6b2971ea-e1f4-4787-8a85-060b36a6cc72",
      title: "Consultoría y Asesoramiento Profesional",
      icon: ChartCandlestick,
   },
   {
      id: "aec9f472-d1ce-467f-ae3f-4cf895c122b6",
      title: "Construcción, Oficios y Mantenimiento",
      icon: Wrench,
   },
   {
      id: "3f5c27fa-86a8-4ab1-85aa-0b23365ab1dd",
      title: "Bienestar y Servicios Personales",
      icon: HeartHandshake,
   },
   {
      id: "451a4a7c-0cdb-45eb-93b0-83804a42363c",
      title: "Eventos y Logística",
      icon: Forklift,
   },
]
export function CardListGroup() {
   return (
      <Box className="flex gap-4 flex-wrap w-full justify-center">
         {GroupList.map((group) => (
            <CardGroup
               key={group.id}
               title={group.title}
               Icon={group.icon}
               id={group.id}
            />
         ))}
      </Box>
   )
}
