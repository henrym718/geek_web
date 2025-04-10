import { Box } from "@/components/ui"
import { WizardFooter } from "@/components/vendor/create-profile/wizard-footer"

export default function CreatedProfileLayout({ children }: React.PropsWithChildren) {
   return (
      <Box className="flex flex-col h-screen ">
         <header className="p-4">
            <h1 className="text-2xl font-bold">Create Profile</h1>
         </header>

         <main className="flex-grow w-4/6 mx-auto pt-20">{children}</main>

         <footer>
            <WizardFooter />
         </footer>
      </Box>
   )
}
