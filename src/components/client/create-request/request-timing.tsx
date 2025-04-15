"use client"
import { Box, Typography } from "@/components/ui"
import { InputRadio } from "@/components/ui/input-radio/input-radio"
import { Select } from "@/components/ui/select/select"
import { SelectContent } from "@/components/ui/select/select-content"
import SelectItem from "@/components/ui/select/select-item"
import { SelectTrigger } from "@/components/ui/select/select-trigger"
import { SelectValue } from "@/components/ui/select/select-value"
import React from "react"

export default function RequestTiming() {
   return (
      <div className="flex flex-col gap-4 w-1/2">
         <Typography variant="subtitulo2">
            Genial, estas en el ultimo paso, define el tipo de proyecto y la carga de trabajo, algunos campos son opcionales
         </Typography>

         <Box className="flex gap-4">
            <InputRadio
               name="project_type"
               value="unique">
               Proyecto único
            </InputRadio>
            <InputRadio
               name="project_type"
               value="recurrent">
               Proyecto recurrente
            </InputRadio>
         </Box>
         <Select
            onChange={() => {}}
            value={{ id: "", name: "" }}>
            <SelectTrigger>
               <SelectValue placeholder="Duración del proyecto" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="single_day">Solo por un día</SelectItem>
               <SelectItem value="few_days">Pocos días (2-3)</SelectItem>
               <SelectItem value="1_week">Menos de 1 semana</SelectItem>
               <SelectItem value="2_4_weeks">2-4 semanas</SelectItem>
               <SelectItem value="1_3_months">1 a 3 meses</SelectItem>
               <SelectItem value="3_6_months">3 a 6 meses</SelectItem>
               <SelectItem value="gt6_months">Más de 6 meses</SelectItem>
               <SelectItem value="indefinite">Sin duración definida</SelectItem>
            </SelectContent>
         </Select>
         <Select
            onChange={() => {}}
            value={{ id: "", name: "" }}>
            <SelectTrigger>
               <SelectValue placeholder="Carga de trabajo" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="lt10">Menos de 10 horas/semana</SelectItem>
               <SelectItem value="10_20">Entre 10 y 20 horas/semana</SelectItem>
               <SelectItem value="20_30">Entre 20 y 30 horas/semana</SelectItem>
               <SelectItem value="30_40">Entre 30 y 40 horas/semana</SelectItem>
               <SelectItem value="gt40">Más de 40 horas/semana</SelectItem>
               <SelectItem value="variable">Carga horaria variable semana a semana</SelectItem>
               <SelectItem value="flexible">Horario flexible / depende del avance del proyecto</SelectItem>
            </SelectContent>
         </Select>
      </div>
   )
}
