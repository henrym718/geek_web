"use client"
import { Box, Button, Typography, Badge, Divider, TextArea } from "@/components/ui"
import { timeAgo } from "@/lib/utils/timeAgo"
import { IoAlertCircleOutline, IoPricetagOutline, IoTimeOutline } from "react-icons/io5"
import { TfiAnnouncement } from "react-icons/tfi"
import { IoIosArrowRoundBack } from "react-icons/io"
import { FieldValues, useForm } from "react-hook-form"
import { Category, City, ProformaRequest, Skill } from "@/data/types/models/models"
import { useState } from "react"
import { mutate } from "swr"
import { createProformaResponse } from "@/data/api/services/proforma-response.service"
import { sleep } from "@/lib/utils/sleep"
import { budgetUnitMap, projectLengthMap, projectTypeMap, projectWorkloadMap } from "@/config/constants"
import { MdOutlineCalendarToday } from "react-icons/md"
import { RiBuilding4Line } from "react-icons/ri"

interface Props {
   project: ProformaRequest
   skills: Skill[]
   category: Category
   city: City
   profileId: string
   exists: boolean
   closeModal: () => void
}

export function ProjectsResponseForm({ project, skills, city, profileId, exists, closeModal }: Readonly<Props>) {
   const { register, handleSubmit, formState: { errors } } = useForm() // prettier-ignore
   const [loading, setLoading] = useState(false)

   const onSubmit = async (values: FieldValues) => {
      setLoading(true)
      try {
         await sleep(1000)
         await createProformaResponse({
            message: values.message,
            profileVendorId: profileId,
            proformaRequestId: project.id,
         })
         mutate(["request-list", profileId], { revalidate: true })
         closeModal()
      } finally {
         setLoading(false)
      }
   }

   return (
      <main className="flex flex-col p-10 gap-4 cursor-default w-[700px] min-h-[100vh] overflow-y-auto">
         <header className="flex flex-col gap-4">
            <IoIosArrowRoundBack
               className="cursor-pointer hover:rounded-full hover:bg-gray-100"
               size={30}
               onClick={closeModal}
            />
            <Typography
               className="pb-2"
               variant="subtitulo1">
               {project.title}
            </Typography>
            <Box className="flex items-center gap-4 justify-between">
               <Typography variant="etiqueta">{`Publicado: ${timeAgo(project.createdAt ?? new Date())} - ${city.name}`}</Typography>
            </Box>
            <Box className="flex gap-4 pt-1">
               <TfiAnnouncement
                  size={24}
                  className="flex items-start"
               />
               <Typography variant="nota">
                  Los perfiles especializados pueden ayudarte a destacar mejor tu experiencia al presentar propuestas para puestos como estos,
                  esfuerzate en crear el mejor perfil para que te contraten.
               </Typography>
            </Box>
         </header>

         <Divider />

         <section>
            <Typography
               className="pb-4"
               variant="mensaje">
               {project.description}
            </Typography>
         </section>

         <Divider />

         <section className="grid grid-cols-2 gap-8">
            <article className="flex gap-2">
               <IoPricetagOutline size={22} />
               <Box className="flex flex-col">
                  <Typography variant="etiqueta">{`${
                     project.budget ? `$${project.budget.toFixed(2)}/${budgetUnitMap[project.budgetUnit]}` : "Solicita presupuesto: SI"
                  }`}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Presupuesto
                  </Typography>
               </Box>
            </article>

            <article className="flex gap-2">
               <MdOutlineCalendarToday size={20} />
               <Box className="flex flex-col">
                  <Typography variant="etiqueta">{projectLengthMap[project.projectLength]}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Duración
                  </Typography>
               </Box>
            </article>

            <article className="flex gap-2">
               <RiBuilding4Line size={20} />
               <Box className="flex flex-col">
                  <Typography variant="etiqueta">{projectTypeMap[project.projectType]}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Tipo de proyecto
                  </Typography>
               </Box>
            </article>

            <article className="flex gap-2">
               <IoTimeOutline size={22} />
               <Box className="flex flex-col">
                  <Typography variant="etiqueta">{projectWorkloadMap[project.projectWorkload]}</Typography>
                  <Typography
                     variant="etiqueta"
                     className="font-light">
                     Carga horaria
                  </Typography>
               </Box>
            </article>
         </section>

         <Divider />

         <section className="flex gap-2">
            <Typography
               variant="etiqueta"
               className="font-light">
               Propuestas recibidas:
            </Typography>
            <Typography variant="etiqueta">{project.countResponses}</Typography>
         </section>

         <Divider />

         <section>
            <Typography variant="subtitulo2">Hablidades y experiencia</Typography>
            <Box className="flex gap-2 pb-4">
               {skills.map((skill) => (
                  <Badge key={skill.id}>{skill.name}</Badge>
               ))}
            </Box>
         </section>

         <Divider />

         <footer>
            {exists ? (
               <Box className="flex h-2 items-center gap-2">
                  <IoAlertCircleOutline size={22} />
                  <Typography variant="nota">Ya has aplicado a esta soliciutd de trabajo</Typography>
               </Box>
            ) : (
               <section>
                  <Typography variant="subtitulo2">Aplica a esta propuesta</Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
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
                        disabled={loading}
                        isLoading={loading}>
                        Enviar propuesta
                     </Button>
                  </form>
               </section>
            )}
         </footer>
      </main>
   )
}
