"use client"

import React from "react"
import { useModal } from "./context"

interface Props {
   children: React.ReactElement<{ onClick: () => void; className?: string }>
}

export function ModalTrigger({ children }: Readonly<Props>) {
   const { openModal } = useModal()

   return React.cloneElement(children, {
      onClick: openModal,
      className: `${children.props.className} outline-none focus:outline-none`,
   })
}
