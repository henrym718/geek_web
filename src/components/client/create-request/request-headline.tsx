"use client"
import { Box, InputField, Typography } from "@/components/ui"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

export function RequestHeadline() {
   const { setRequestData, requestData } = useCreateRequestUserDataStore((state) => state)

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Lo tengo, Ahora, agrega un titulo para decirle a todos lo que haces</Typography>
         <Typography variant="parrafo">
            Es lo primero que ven los clientes, asi que haz que cuente. Destaca describiendo tu experiencia en tus propias palabras.
         </Typography>
         <Typography
            className="pt-6 mb-[-15px]"
            variant="label">
            Titulo de la solicitud
         </Typography>
         <InputField
            placeholder="Ingeniero en desarrollo web con enfasis en frontend y backend"
            className="mt-4"
            type="search"
            onChange={(e) => setRequestData({ title: e.target.value })}
            value={requestData.title}
         />
      </Box>
   )
}
