import { Box, Select, SelectOption, Typography } from "@/components/ui"
import { STATUS_REQUEST } from "@/config/constants"

export function ProjectStatusSelector() {
   return (
      <Box className="flex gap-2 pt-4">
         <Typography variant="label">Estado de la solicitud:</Typography>
         <Select className="w-1/3">
            <SelectOption value={STATUS_REQUEST.ACTIVE}>Activo</SelectOption>
            <SelectOption value={STATUS_REQUEST.ANNULLED}>Anular</SelectOption>
         </Select>
      </Box>
   )
}
