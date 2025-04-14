"use client"

import { Box, Typography } from "@/components/ui"
import { InputCurrency } from "@/components/ui/iInput-currency"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

export function RequestBudget() {
   const { setRequestData, requestData } = useCreateRequestUserDataStore((state) => state)

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Ya casi lo tienes, ahora establece un presupuesto y el alcance de la solicitud.</Typography>
         <Typography variant="parrafo">
            El presupuesto es el monto que estas dispuesto a pagar para realizar la solicitud, y el alcance permite mostrar tu necesidad a los
            profesionales con mayor claridad.
         </Typography>
         <InputCurrency
            value={requestData.budget.toFixed(2)}
            onSelected={(value) => setRequestData({ budget: +value })}
            label="Presupuesto"
         />
      </Box>
   )
}
