interface Props {
   file: File | null
}

export function useCloudinary({ file }: Props) {
   const uploadImage = async (): Promise<string> => {
      if (!file) return ""
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "unsigned_preset")
      formData.append("cloud_name", "dpozbstsz")

      const response = await fetch("https://api.cloudinary.com/v1_1/dpozbstsz/image/upload", {
         method: "POST",
         body: formData,
      })
      const data = await response.json()
      return data.secure_url
   }

   return {
      uploadImage,
   }
}
