"use client"

import { Box, InputSearch, Typography } from "@/components/ui"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"
import { useForm } from "react-hook-form"
import { useCreateRequestFormDataStore } from "@/stores/use-create-request-form-data.store"
import useSWR from "swr"
import { fetchAllCities } from "@/data/api/services/city.service"

export function RequestScope() {
   const { setRequestData } = useCreateRequestUserDataStore((state) => state)
   const { selectedScope, setSelectedScope } = useCreateRequestFormDataStore((state) => state)

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
      setRequestData({ city: option.id })
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
