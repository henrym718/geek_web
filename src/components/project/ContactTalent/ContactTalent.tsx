"use client"

import { PhoneCall } from "lucide-react"
import { Box, Button, Typography } from "../../ui"
import { Modal } from "../../ui/modal/Modal"
import { ModalContent } from "../../ui/modal/ModalContent"
import { ModalTrigger } from "../../ui/modal/ModalTrigger"

interface Props {
   phone: string
}

export function ContactTalent({ phone }: Readonly<Props>) {
   return (
      <Modal>
         <ModalTrigger>
            <Button
               variant="outline"
               className="font-bold">
               Contactar
            </Button>
         </ModalTrigger>
         <ModalContent classNameContent="rounded-4xl">
            {(close) => (
               <Box className="flex flex-col gap-6 w-[400px] h-[200px] p-6 items-center">
                  <PhoneCall size={24} />
                  <Typography variant="subtitulo1">{phone}</Typography>
                  <Button onClick={close}>Cerrar</Button>
               </Box>
            )}
         </ModalContent>
      </Modal>
   )
}
