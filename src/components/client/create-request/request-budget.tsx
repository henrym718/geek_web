"use client"

import { Box, Typography, InputCurrency, Select, SelectOption, Checkbox } from "@/components/ui"
import { BUDGET_UNIT_OPTIONS, BudgetType } from "@/config/constants"
import { useCreateRequestUserDataStore } from "@/stores/use-create-request-user-data.store"

export function RequestBudget() {
   const { setRequestData, requestData } = useCreateRequestUserDataStore((state) => state)

   const handleChangeCurrency = (value: string) => {
      setRequestData({ budget: Number(value) })
   }

   const handleChangeBudgetUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRequestData({ budgetUnit: e.target.value as BudgetType })
   }

   const handleChangeQuotation = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         setRequestData({ quotation: e.target.checked, budget: 0, budgetUnit: null })
      } else {
         setRequestData({ quotation: e.target.checked, budget: 0, budgetUnit: BUDGET_UNIT_OPTIONS[0].value })
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
               value={requestData.budget.toFixed(2)}
               label="Presupuesto"
               onSelected={handleChangeCurrency}
               disabled={requestData.quotation}
            />
            <Typography
               data-visible={requestData.quotation}
               className="absolute data-[visible=false]:block hidden top-11 right-23 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-0"
               variant="parrafo">
               /
            </Typography>

            <Select
               data-visible={requestData.quotation}
               className="absolute data-[visible=false]:block hidden top-11 right-2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-0"
               name="currency"
               id="currency"
               value={requestData.budgetUnit ?? ""}
               onChange={handleChangeBudgetUnit}>
               <SelectOption value={BUDGET_UNIT_OPTIONS[0].value}>{BUDGET_UNIT_OPTIONS[0].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[1].value}>{BUDGET_UNIT_OPTIONS[1].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[2].value}>{BUDGET_UNIT_OPTIONS[2].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[3].value}>{BUDGET_UNIT_OPTIONS[3].label}</SelectOption>
               <SelectOption value={BUDGET_UNIT_OPTIONS[4].value}>{BUDGET_UNIT_OPTIONS[4].label}</SelectOption>
            </Select>
            <Checkbox
               checked={requestData.quotation}
               onChange={handleChangeQuotation}>
               Busco una cotización
            </Checkbox>
         </Box>
      </Box>
   )
}
