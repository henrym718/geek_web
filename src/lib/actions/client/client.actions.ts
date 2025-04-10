"use server"
export async function createClientAction(previosState: any, formData: FormData) {
   const firstName = formData.get("firstName") as string
   const lastName = formData.get("lastName") as string
   const city = formData.get("city") as string

   if (firstName === "hola") {
      return { error: "First name is required", firstName, lastName, city }
   }

   return { firstName, lastName, city }
}
