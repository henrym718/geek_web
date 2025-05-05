import Link from "next/link"
import { Button } from "../../ui"

export function AddProfileButton() {
   return (
      <Link href="/talent/account/create">
         <Button variant="secundary">Agregar perfil</Button>
      </Link>
   )
}
