"use client"

import { ListFilter, X } from "lucide-react"
import { Box, Button, Divider, Typography } from "../ui"
import { Modal } from "../ui/modal/Modal"
import { ModalContent } from "../ui/modal/ModalContent"
import { ModalTrigger } from "../ui/modal/ModalTrigger"

export function FilterTalentForm() {
   return (
      <Modal>
         <ModalTrigger>
            <Button
               variant="outline"
               className="ml-auto">
               <ListFilter />
               Filtros
            </Button>
         </ModalTrigger>
         <ModalContent
            className="bg-black/25"
            classNameContent="rounded-4xl">
            {(close) => (
               <Box className="flex flex-col w-[600px] h-[750px] px-4 py-2">
                  <Box className="h-12 flex items-center justify-center relative">
                     <Typography
                        variant="parrafo"
                        className="font-extrabold text-sx">
                        Filtros
                     </Typography>
                     <X
                        className="absolute right-2 cursor-pointer"
                        onClick={close}
                        size={18}
                     />
                  </Box>
                  <Divider className="-mx-4  w-screen" />

                  <Box className="flex flex-grow flex-col overflow-y-auto pt-5">
                     <Box className="flex flex-col ite gap-2">
                        <Typography
                           variant="parrafo"
                           className="font-extrabold text-sx">
                           Ordenar Resultados
                        </Typography>
                        <Box className="flex w-full border border-black/20 rounded-xl gap-2 p-1">
                           <Button
                              variant="ghost"
                              className="flex-1"
                              size="md"
                              onClick={close}>
                              Relevancia
                           </Button>
                           <Button
                              variant="ghost"
                              className="flex-1"
                              size="md"
                              onClick={close}>
                              Nuevos Talentos
                           </Button>
                           <Button
                              variant="ghost"
                              className="flex-1"
                              size="md"
                              onClick={close}>
                              Talentos con Trayectoria
                           </Button>
                        </Box>
                     </Box>
                     <Divider className="-mx-4 w-screen mt-8" />
                  </Box>

                  <Box className="h-12 flex items-center justify-between">
                     <Button
                        variant="ghost"
                        onClick={close}>
                        Limpiar filtros
                     </Button>
                     <Button onClick={close}>Mostrar 100 resultados</Button>
                  </Box>
               </Box>
            )}
         </ModalContent>
      </Modal>
   )
}
