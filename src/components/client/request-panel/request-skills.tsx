import { Badge } from "@/components/ui/badge"
import { Box } from "@/components/ui"
import { Skill } from "@/data/types/models/models"

interface Props {
   skills: Skill[]
}

export function RequestSkills({ skills }: Readonly<Props>) {
   return (
      <Box className="flex gap-2 pt-4 pb-4 flex-wrap">
         {skills.map((skill) => (
            <Badge key={skill.id}>{skill.name}</Badge>
         ))}
      </Box>
   )
}
