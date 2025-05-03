import { Button } from "../../ui"

interface Props {
   isActive: boolean
   onClick: () => void
   label: string
}

export function TabButton({ isActive, onClick, label }: Readonly<Props>) {
   return (
      <Button
         data-active={isActive}
         variant="ghost"
         size="md"
         className="hover:rounded-2xl font-light data-[active=true]:font-bold data-[active=true]:hover:bg-white transition-all duration-300"
         onClick={onClick}>
         {label}
      </Button>
   )
}
