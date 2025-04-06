import { Box, Typography } from "@/app/components/ui"

export default function AuthLayout({ children }: Readonly<React.PropsWithChildren>) {
   return (
      <Box>
         <header>
            <Typography variant="titulo3">GeekApp</Typography>
         </header>
         <main>{children}</main>
      </Box>
   )
}
