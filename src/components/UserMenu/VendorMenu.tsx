import Link from "next/link"

interface Props {
   closeMenu: () => void
}

export function VendorMenu({ closeMenu }: Readonly<Props>) {
   return (
      <ul>
         <li>
            <Link href="/login">Login</Link>
         </li>
         <li>
            <Link href="/register">Register</Link>
         </li>

         <Link href="/">
            <li onClick={closeMenu}>Logout</li>
         </Link>
      </ul>
   )
}
