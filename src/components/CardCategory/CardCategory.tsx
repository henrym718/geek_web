import { Button } from "../ui"
import { useRouter } from "next/navigation"

interface Props {
   id: string
   title: string
}

export default function CardCategory({ id, title }: Readonly<Props>) {
   const router = useRouter()

   const handleSelectCategory = () => {
      router.push(`/talents?categoryId=${id}`)
   }

   return (
      <Button
         variant="subtle"
         rounded="full"
         size="md"
         onClick={handleSelectCategory}>
         {title}
      </Button>
   )
}
