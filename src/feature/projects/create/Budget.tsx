"use client"

import { Box, Typography, InputCurrency, Select, SelectOption, Checkbox } from "@/components/ui"
import { BUDGET_UNIT_OPTIONS } from "@/config/constants"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   setProject: (project: Partial<CreateRequestRequest>) => void
   budget: number
   budgetUnit: string
   quotation: boolean
}

export function Budget({ setProject, budget, budgetUnit, quotation }: Readonly<Props>) {
   const handleChangeCurrency = (value: string) => {
      setProject({ budget: Number(value) })
   }

   const handleChangeBudgetUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setProject({ budgetUnit: e.target.value })
   }

   const handleChangeQuotation = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setProject({ quotation: e.target.checked, budget: 0, budgetUnit: "" })
      } else {
         setProject({ quotation: e.target.checked, budget: 0, budgetUnit: BUDGET_UNIT_OPTIONS[0].value })
      }
   }

   return (
      <Box className="flex flex-col gap-2 w-4/7">
         <Typography variant="titulo3">Ya casi lo tienes, ahora establece un presupuesto y el alcance de la solicitud.</Typography>
         <Typography variant="parrafo">
            El presupuesto es el monto que estas dispuesto a pagar para realizar la solicitud, y el alcance permite mostrar tu necesidad a los
            profesionales con mayor claridad.
         </Typography>
         <Box className="relative">
            <InputCurrency
               value={budget.toFixed(2)}
               label="Presupuesto"
               onSelected={handleChangeCurrency}
               disabled={quotation}
            />
            <Typography
               data-visible={quotation}
               className="absolute data-[visible=false]:block hidden top-11 right-23 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-0"
               variant="parrafo">
               /
            </Typography>

            <Select
               data-visible={quotation}
               className="absolute data-[visible=false]:block hidden top-11 right-2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-0"
               name="currency"
               id="currency"
               value={budgetUnit}
               onChange={handleChangeBudgetUnit}>
               <SelectOption value={BUDGET_UNIT_OPTIONS[0].value}>{BUDGET_UNIT_OPTIONS[0].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[1].value}>{BUDGET_UNIT_OPTIONS[1].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[2].value}>{BUDGET_UNIT_OPTIONS[2].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[3].value}>{BUDGET_UNIT_OPTIONS[3].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[4].value}>{BUDGET_UNIT_OPTIONS[4].label}</SelectOption>
            </Select>
            <Checkbox
               checked={quotation}
               onChange={handleChangeQuotation}>
               Busco una cotización
            </Checkbox>
         </Box>
      </Box>
   )
}
