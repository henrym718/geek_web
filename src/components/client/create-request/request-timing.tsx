"use client"
import {
   Box,
   Typography,
   InputRadio,
   SelectButton,
   SelectButtonContent,
   SelectButtonItem,
   SelectButtonTrigger,
   SelectButtonValue,
} from "@/components/ui"
import React from "react"

export function RequestTiming() {
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
         <SelectButton
            onChange={() => {}}
            value={{ id: "", name: "" }}>
            <SelectButtonTrigger>
               <SelectButtonValue placeholder="Duración del proyecto" />
            </SelectButtonTrigger>
            <SelectButtonContent>
               <SelectButtonItem value="single_day">Solo por un día</SelectButtonItem>
               <SelectButtonItem value="few_days">Pocos días (2-3)</SelectButtonItem>
               <SelectButtonItem value="1_week">Menos de 1 semana</SelectButtonItem>
               <SelectButtonItem value="2_4_weeks">2-4 semanas</SelectButtonItem>
               <SelectButtonItem value="1_3_months">1 a 3 meses</SelectButtonItem>
               <SelectButtonItem value="3_6_months">3 a 6 meses</SelectButtonItem>
               <SelectButtonItem value="gt6_months">Más de 6 meses</SelectButtonItem>
               <SelectButtonItem value="indefinite">Sin duración definida</SelectButtonItem>
            </SelectButtonContent>
         </SelectButton>
         <SelectButton
            onChange={() => {}}
            value={{ id: "", name: "" }}>
            <SelectButtonTrigger>
               <SelectButtonValue placeholder="Carga de trabajo" />
            </SelectButtonTrigger>
            <SelectButtonContent>
               <SelectButtonItem value="lt10">Menos de 10 horas/semana</SelectButtonItem>
               <SelectButtonItem value="10_20">Entre 10 y 20 horas/semana</SelectButtonItem>
               <SelectButtonItem value="20_30">Entre 20 y 30 horas/semana</SelectButtonItem>
               <SelectButtonItem value="30_40">Entre 30 y 40 horas/semana</SelectButtonItem>
               <SelectButtonItem value="gt40">Más de 40 horas/semana</SelectButtonItem>
               <SelectButtonItem value="variable">Carga horaria variable semana a semana</SelectButtonItem>
               <SelectButtonItem value="flexible">Horario flexible / depende del avance del proyecto</SelectButtonItem>
            </SelectButtonContent>
         </SelectButton>
      </div>
   )
}
