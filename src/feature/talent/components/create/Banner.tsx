/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@/components/ui"
import { Plus } from "lucide-react"
import { useState } from "react"

interface Props {
   bannerImagePreview: string
   setBannerImage: (file: File | null) => void
   setBannerImagePreview: (bannerImagePreview: string) => void
}

export function Banner({ bannerImagePreview, setBannerImagePreview, setBannerImage }: Readonly<Props>) {
   const [error, setError] = useState<string | null>(null)

   const handleFileReader = (file: File) => {
      const reader = new FileReader()

      reader.onload = (e) => {
         const imageUrl = e.target?.result as string

         const img = new Image()

         img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight

            if (width < height) {
               setError("La imagen debe ser horizontal, intenta nuevamente")
            } else {
               setError(null)
               setBannerImagePreview(imageUrl)
               setBannerImage(file)
            }
         }

         img.src = imageUrl
      }

      reader.readAsDataURL(file)
   }

   const handleUploadBannerImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBannerImagePreview("")
      setBannerImage(null)
      setError(null)
      const file = e.target.files?.[0]
      if (!file) return
      handleFileReader(file)
   }

   return (
      <Box className="flex flex-col gap-2 w-4/7 ">
         <Typography variant="titulo3">Ahora, agrega una imagen que sera tu banner</Typography>
         <Typography variant="parrafo">Esto ayudara a que tu perfil sea mas atractivo y memorable para los usuarios.</Typography>
         <Box className="relative h-[250px] w-[415px] overflow-hidden border border-dashed bg-gray-200 rounded-lg">
            <input
               type="file"
               accept="image/*"
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
               onChange={handleUploadBannerImage}
            />

            {bannerImagePreview ? (
               <img
                  src={bannerImagePreview}
                  alt="Banner"
                  className="h-[250px] w-[415px] object-cover"
               />
            ) : (
               <p className="absolute top-1/2 left-1/2 -translate-1/2">
                  <Plus className="w-8 h-8" />
               </p>
            )}
         </Box>
         {error && <p className="text-red-500 text-sm">{error}</p>}
      </Box>
   )
}
