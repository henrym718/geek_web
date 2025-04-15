"use client"
import { Box, Button, Typography, Badge, Divider, TextArea } from "@/components/ui"
import { GetRequestByProfileIdResponse } from "@/data/dtos/get-request-by-vendor-profile-id"
import { timeAgo } from "@/lib/utils/timeAgo"
import { IoAlertCircleOutline, IoLocationOutline, IoPricetagOutline, IoTimeOutline } from "react-icons/io5"
import { TfiAnnouncement } from "react-icons/tfi"
import { IoIosArrowRoundBack } from "react-icons/io"
import { useForm } from "react-hook-form"
import useSubmitRequestResponse from "@/lib/hooks/auth/vendor/use-submit-proforma-response"

interface Props {
   request: GetRequestByProfileIdResponse
   profileId: string
   exists: boolean
   closeModal: () => void
}

export function RequestResponseForm({ request, profileId, exists, closeModal }: Props) {
   const { register, handleSubmit, formState: { errors } } = useForm() // prettier-ignore

   const { onSubmitHandler, state, pending } = useSubmitRequestResponse(request.id, profileId, closeModal)

   return (
      <Box className="flex flex-col p-10 gap-4 cursor-default w-[700px] min-h-[100vh] overflow-y-auto">
         <IoIosArrowRoundBack size={30} />
         <Typography
            className="pb-2"
            variant="subtitulo1">
            {request.title}
         </Typography>
         <Box className="flex items-center gap-4">
            <Typography variant="etiqueta">{`Publicado: ${timeAgo(request.createdAt ?? new Date())}`}</Typography>
            <Box className="flex gap-1 items-center">
               <IoLocationOutline size={20} />
               <Typography variant="label">{request.scope}</Typography>
            </Box>
         </Box>
         <Box className="flex gap-4">
            <TfiAnnouncement
               size={24}
               className="flex items-start"
            />
            <Typography variant="nota">
               Los perfiles especializados pueden ayudarte a destacar mejor tu experiencia al presentar propuestas para puestos como estos, esfuerzate
               en crear el mejor perfil para que te contraten.
            </Typography>
         </Box>
         <Divider />
         <Typography
            className="pb-4"
            variant="mensaje">
            {request.description}
         </Typography>
         <Divider />
         <Box className="flex gap-36">
            <Box className="flex gap-1">
               <IoPricetagOutline size={22} />
               <Box className="flex flex-col items-center">
                  <Typography variant="etiqueta">{`$${request.budget.toFixed(2)}`}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Presupuesto
                  </Typography>
               </Box>
            </Box>
            <Box className="flex gap-1">
               <IoTimeOutline size={22} />
               <Box className="flex flex-col items-center">
                  <Typography variant="etiqueta">10 a 20 días</Typography>
                  <Typography
                     variant="etiqueta"
                     className="text-center font-light">
                     Duración <br /> del proyecto
                  </Typography>
               </Box>
            </Box>
         </Box>
         <Divider />
         <Typography variant="subtitulo2">Hablidades y experiencia</Typography>
         <Box className="flex gap-2 pb-4">
            {request.skills.map((skill) => (
               <Badge key={skill.id}>{skill.name}</Badge>
            ))}
         </Box>
         <Divider />
         {exists ? (
            <Box className="flex h-2 items-center gap-2">
               <IoAlertCircleOutline size={22} />
               <Typography variant="nota">Ya has aplicado a esta soliciutd de trabajo</Typography>
            </Box>
         ) : (
            <>
               <Typography variant="subtitulo2">Aplica a esta propuesta</Typography>
               <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <TextArea
                     rows={5}
                     error={errors.message?.message as string}
                     register={register("message", {
                        required: "El mensaje es requerido",
                        minLength: {
                           value: 10,
                           message: "El mensaje debe tener al menos 10 caracteres",
                        },
                     })}
                  />
                  <Button
                     className="mt-4 w-full"
                     variant="primary"
                     size="lg"
                     type="submit"
                     disabled={pending}
                     isLoading={pending}>
                     Enviar propuesta
                  </Button>
               </form>
               {state.error && (
                  <Box className="flex h-2 items-center gap-2">
                     <IoAlertCircleOutline size={22} />
                     <Typography variant="nota">{state.error}</Typography>
                  </Box>
               )}
            </>
         )}
      </Box>
   )
}
