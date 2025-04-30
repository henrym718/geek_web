import { CardTalent } from "../CardTalent/CardTalent"
import { Box } from "../ui"

interface Props {
   talents: {
      id: string
      firstName: string
      lastName: string
      photo: string
      city: string
      title: string
   }[]
}

export function CardListTalent({ talents }: Readonly<Props>) {
   return (
      <Box className="grid grid-cols-4 gap-x-4 w-full h-full place-items-center">
         {talents.map((talent) => (
            <CardTalent
               key={talent.id}
               firstName={talent.firstName}
               lastName={talent.lastName}
               photo={talent.photo}
               city={talent.city}
               title={talent.title}
            />
         ))}
      </Box>
   )
}
