import React from "react"
import { useSideModal } from "./context-modal"

interface TriggerSideModalProps {
   children: React.ReactElement<{ onClick: () => void }>
}

export function TriggerSideModal({ children }: Readonly<TriggerSideModalProps>) {
   const { open } = useSideModal()
   return React.cloneElement(children, { onClick: open })
}
