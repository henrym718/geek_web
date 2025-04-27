import Link from "next/link"

export function VendorMenu() {
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
