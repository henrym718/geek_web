import { CreateRequestRequest } from "@/data/dtos/create-request.type"
import { create } from "zustand"

interface CreateRequestUserDataStore {
   requestData: CreateRequestRequest
   setRequestData: (requestData: Partial<CreateRequestRequest>) => void
}

export const useCreateRequestUserDataStore = create<CreateRequestUserDataStore>((set) => ({
   requestData: {
      title: "",
      description: "",
      budget: 0,
      budgetUnit: "project",
      quotation: false,
      scope: "",
      clientId: "",
      categoryId: "",
      skills: [],
   },
   setRequestData: (requestData: Partial<CreateRequestRequest>) => set((state) => ({ requestData: { ...state.requestData, ...requestData } })),
}))
