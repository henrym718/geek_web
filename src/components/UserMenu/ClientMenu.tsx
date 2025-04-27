import Link from "next/link"

export function ClientMenu() {
   return (
      <ul>
         <li>
            <Link href="/login">Login</Link>
         </li>
         <li>
            <Link href="/register">Register</Link>
         </li>
      </ul>
   )
}
