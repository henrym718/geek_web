import { Montserrat, Lato, Roboto, Open_Sans } from "next/font/google"

export const montserrat = Montserrat({
   subsets: ["latin"],
   display: "swap",
})

export const lato = Lato({
   subsets: ["latin"],
   weight: ["400", "700"],
   display: "swap",
})

export const roboto = Roboto({
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "700"],
})

export const openSans = Open_Sans({
   subsets: ["latin"],
   display: "swap",
   weight: ["400", "500", "700"],
})
