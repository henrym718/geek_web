"use client"

import { Box, InputSearch, Typography } from "@/components/ui"
import { useForm } from "react-hook-form"
import useSWR from "swr"
import { fetchAllCities } from "@/data/api/services/city.service"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   setProject: (project: Partial<CreateRequestRequest>) => void
   selectedScope: string
   setSelectedScope: (scope: string) => void
}

export function Scope(props: Readonly<Props>) {
   const { setProject, selectedScope, setSelectedScope } = props

   //Obtenemos las ciudades
   const { data: response } = useSWR(["cities"], fetchAllCities)

   //Validamos si la respuesta es exitosa
   const cities = response?.success ? response.data : []

   //Parseamos las ciudades
   const citiesOptions = cities.map((city) => ({
      id: city.id,
      label: city.name,
   }))

   const { control } = useForm()

   const handleScopeSelected = (option: { id: string; label: string }) => {
      setProject({ city: option.id })
      setSelectedScope(option.label)
   }

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Es momento de definir el alcance de la solicitud.</Typography>
         <Typography variant="parrafo">El alcance permite mostrar tu necesidad a los profesionales que se encuentran en la zona.</Typography>
         <InputSearch
            label="Alcance"
            placeholder="Describe el alcance de la solicitud"
            options={citiesOptions}
            name="scope"
            control={control}
            onSelected={handleScopeSelected}
            value={selectedScope}
         />
      </Box>
   )
}
