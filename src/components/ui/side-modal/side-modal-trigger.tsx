import React from "react"
import { useSideModal } from "./side-modal-context"

interface TriggerSideModalProps {
   children: React.ReactElement<{ onClick: () => void }>
}

export function SideModalTrigger({ children }: Readonly<TriggerSideModalProps>) {
   const { open } = useSideModal()
   return React.cloneElement(children, { onClick: open })
}
