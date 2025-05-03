import { Typography } from "@/components/ui"
import { budgetUnitMap } from "@/config/constants"

interface Props {
   quotation: boolean
   budget: number
   budgetUnit: string
}

export function ProjectBudgetInfo({ quotation, budget, budgetUnit }: Readonly<Props>) {
   return (
      <>
         {quotation ? (
            <Typography
               className="mb-8"
               variant="etiqueta">
               {`Solicita presupuesto: SI`}
            </Typography>
         ) : (
            <Typography
               className="mb-8"
               variant="etiqueta">
               {`Presupuesto: $${budget.toFixed(2)} / ${budgetUnitMap[budgetUnit]}`}
            </Typography>
         )}
      </>
   )
}
