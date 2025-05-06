"use client"
import {
   Box,
   Typography,
   InputRadio,
   SelectButton,
   SelectButtonContent,
   SelectButtonItem,
   SelectButtonTrigger,
   SelectButtonValue,
} from "@/components/ui"
import {
   PROJECT_LENGTH_OPTIONS,
   PROJECT_TYPE_OPTIONS,
   PROJECT_WORKLOAD_OPTIONS,
   ProjectLengthType,
   ProjectType,
   ProjectWorkloadType,
} from "@/config/constants"
import { CreateRequestRequest } from "@/data/types/api/request.types"

interface Props {
   projectType: string
   selectedProjectLength: { id: string; name: string }
   selectedProjectWorkload: { id: string; name: string }
   setProject: (project: Partial<CreateRequestRequest>) => void
   setSelectedProjectLength: (id: string, name: string) => void
   setSelectedProjectWorkload: (id: string, name: string) => void
}

export function Timing(props: Readonly<Props>) {
   const { setProject, projectType, selectedProjectLength, setSelectedProjectLength, selectedProjectWorkload, setSelectedProjectWorkload } = props

   const handleProjectType = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProject({ projectType: e.target.value as ProjectType })
   }

   const handleSelectedProjectLength = (value: { id: string; name: string }) => {
      setSelectedProjectLength(value.id, value.name)
      setProject({ projectLength: value.id as ProjectLengthType })
   }

   const handleSelectedProjectWorkload = (value: { id: string; name: string }) => {
      setSelectedProjectWorkload(value.id, value.name)
      setProject({ projectWorkload: value.id as ProjectWorkloadType })
   }

   return (
      <div className="flex flex-col gap-4 w-1/2">
         <Typography variant="subtitulo2">
            Genial, estas en el ultimo paso, define el tipo de proyecto y la carga de trabajo, algunos campos son opcionales
         </Typography>

         <Box className="flex gap-4">
            <InputRadio
               name="project_type"
               checked={projectType === PROJECT_TYPE_OPTIONS[0].value}
               value={PROJECT_TYPE_OPTIONS[0].value}
               onChange={handleProjectType}>
               {PROJECT_TYPE_OPTIONS[0].label}
            </InputRadio>
            <InputRadio
               name="project_type"
               checked={projectType === PROJECT_TYPE_OPTIONS[1].value}
               value={PROJECT_TYPE_OPTIONS[1].value}
               onChange={handleProjectType}>
               {PROJECT_TYPE_OPTIONS[1].label}
            </InputRadio>
         </Box>
         <SelectButton
            onChange={handleSelectedProjectLength}
            selected={selectedProjectLength}>
            <SelectButtonTrigger>
               <SelectButtonValue placeholder="Duración del proyecto" />
            </SelectButtonTrigger>
            <SelectButtonContent>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[0].value}>{PROJECT_LENGTH_OPTIONS[0].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[1].value}>{PROJECT_LENGTH_OPTIONS[1].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[2].value}>{PROJECT_LENGTH_OPTIONS[2].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[3].value}>{PROJECT_LENGTH_OPTIONS[3].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[4].value}>{PROJECT_LENGTH_OPTIONS[4].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[5].value}>{PROJECT_LENGTH_OPTIONS[5].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[6].value}>{PROJECT_LENGTH_OPTIONS[6].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_LENGTH_OPTIONS[7].value}>{PROJECT_LENGTH_OPTIONS[7].label}</SelectButtonItem>
            </SelectButtonContent>
         </SelectButton>
         <SelectButton
            onChange={handleSelectedProjectWorkload}
            selected={selectedProjectWorkload}>
            <SelectButtonTrigger>
               <SelectButtonValue placeholder="Carga de trabajo" />
            </SelectButtonTrigger>
            <SelectButtonContent>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[0].value}>{PROJECT_WORKLOAD_OPTIONS[0].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[1].value}>{PROJECT_WORKLOAD_OPTIONS[1].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[2].value}>{PROJECT_WORKLOAD_OPTIONS[2].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[3].value}>{PROJECT_WORKLOAD_OPTIONS[3].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[4].value}>{PROJECT_WORKLOAD_OPTIONS[4].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[5].value}>{PROJECT_WORKLOAD_OPTIONS[5].label}</SelectButtonItem>
               <SelectButtonItem value={PROJECT_WORKLOAD_OPTIONS[6].value}>{PROJECT_WORKLOAD_OPTIONS[6].label}</SelectButtonItem>
            </SelectButtonContent>
         </SelectButton>
      </div>
   )
}
