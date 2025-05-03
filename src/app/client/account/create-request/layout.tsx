import { WizardFooter } from "@/components/project/client/create-request/wizard-footer"
import { Box } from "@/components/ui"

export default function CreateRequestLayout({ children }: Readonly<React.PropsWithChildren>) {
   return (
      <Box className="flex flex-col h-screen">
         <header className="p-4">
            <h1 className="text-2xl font-bold">Create Request</h1>
         </header>
         <main className="flex-grow w-4/6 mx-auto pt-20">{children}</main>
         <footer>
            <WizardFooter />
         </footer>
      </Box>
   )
}
