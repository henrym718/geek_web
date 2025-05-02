import Link from "next/link"
import { Button } from "../ui"

export function AddProfileButton() {
   return (
      <Link href="/talent/account/create-profile">
         <Button variant="secundary">Agregar perfil</Button>
      </Link>
   )
}
