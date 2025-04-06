import FooterCreateProfile from "@/app/components/features/vendor/create-profile/FooterCreateProfile"
import { Box } from "@/app/components/ui"
import { PropsWithChildren } from "react"

export default function CreatedProfileLayoud({ children }: PropsWithChildren) {
   return (
      <Box className="flex flex-col h-screen ">
         <header className="p-4">
            <h1 className="text-2xl font-bold">Create Profile</h1>
         </header>

         <main className="flex-grow w-4/6 mx-auto pt-20">{children}</main>

         <footer>
            <FooterCreateProfile />
         </footer>
      </Box>
   )
}
