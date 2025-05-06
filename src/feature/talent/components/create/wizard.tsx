"use client"
import { CategorySelector } from "./CategorySelector"
import { AboutMe } from "./AbouMe"
import { Headline } from "./Headline"
import { Banner } from "./Banner"
import { SkillsSelector } from "./SkillSelector"
import { useCreateProfileSteps } from "@/feature/talent/stores/useCreateProfileSteps"
import { useCreateProfileRecoveryData } from "@/feature/talent/stores/useCreateProfileRecoveryData"
import { Footer } from "./Footer"
import { Box } from "@/components/ui"
import useSWR from "swr"
import { fetchAllGroups } from "@/data/api/services/group.service"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"
import { fetchSkillsByCategoryId } from "@/data/api/services/skill.service"
import { useCloudinary } from "@/lib/hooks/cloudinary/useCloudinary"
import { useRouter } from "next/navigation"
import { createVendorProfile } from "@/data/api/services/vendor-profile.service"
import { useState } from "react"
import { sleep } from "@/lib/utils/sleep"
import { Toaster, toast } from "sonner"
import { useCreateProfileData } from "../../stores/useCreateProfileData"

export function Wizard() {
   const [isPendingCreateProfile, setIsPendingCreateProfile] = useState(false)

   //Router para redireccionar al usuario
   const router = useRouter()

   //Store de steps
   const { step, previousStep, nextStep } = useCreateProfileSteps((state) => state)

   //Store de datos del usuario
   const { vendorProfile, setVendorProfile, bannerImage, setBannerImage, addSkill, removeSkill } = useCreateProfileData((state) => state)

   //Store de datos
   const {
      // Groups
      groups,
      selectedGroupId,
      setGroups,
      setSelectedGroupId,

      // Categories
      categories,
      setCategories,

      // Tags/Skills
      optionsTags,
      setOptionsTags,
      addOptionsTag,
      removeOptionsTag,
      selectedTags,
      addSelectedTag,
      removeSelectedTag,
      cleanSelectedTags,

      // Banner image
      bannerImagePreview,
      setBannerImagePreview,
   } = useCreateProfileRecoveryData((state) => state)

   //Hook para subir imagenes a cloudinary
   const { uploadImage } = useCloudinary({ file: bannerImage })

   //Fetching de groups al iniciar el wizard
   const { isLoading: isLoadingGroups } = useSWR(["groups"], fetchAllGroups, {
      onSuccess: (data) => {
         if (data.success) {
            setGroups(data.data)
         }
      },
   })

   //Fetching de categories al seleccionar un grupo
   const { isLoading: isLoadingCategories } = useSWR(
      selectedGroupId ? ["categories", selectedGroupId] : null,
      () => fetchCategoriesByGroupId(selectedGroupId),
      {
         onSuccess: (data) => {
            if (data.success) {
               setCategories(data.data)
            }
         },
      }
   )

   //Fetching de skills al seleccionar una categoria
   useSWR(
      vendorProfile.categoryId ? [vendorProfile.categoryId, "skills"] : null,
      () => fetchSkillsByCategoryId({ categoryId: vendorProfile.categoryId }),
      {
         onSuccess: (data) => {
            if (data.success) {
               setOptionsTags(data.data)
            }
         },
      }
   )

   //Funcion para crear el perfil
   const handleCreateProfile = async () => {
      try {
         setIsPendingCreateProfile(true)
         await sleep(1000)
         const bannerImageUrl = await uploadImage()
         if (!bannerImageUrl) return

         const response = await createVendorProfile({
            ...vendorProfile,
            bannerImage: bannerImageUrl,
         })
         if (response.success) {
            router.push(`/talent/account/profiles`)
         } else {
            toast.error("Error al crear el perfil")
         }
      } finally {
         setIsPendingCreateProfile(false)
      }
   }

   //Funcion para verificar si el boton de step esta deshabilitado
   const isDisabledStepButton = () => {
      if (step === 1 && !vendorProfile.categoryId) return true
      if (step === 2 && !vendorProfile.skills.length) return true
      if (step === 3 && !vendorProfile.title) return true
      if (step === 4 && !vendorProfile.aboutme) return true
      return false
   }

   //Funcion para verificar si el boton de crear perfil esta deshabilitado
   const isDisabledCreateProfileButton = () => {
      if (isPendingCreateProfile) return true
      if (step === 5 && !bannerImage) return true
      return false
   }

   //Renderizado del wizard segun el step, incluyendo el footer
   return (
      <Box className="flex flex-col h-screen w-4/6 mx-auto pt-28">
         <Box className="flex-grow">
            {/* Step 1: Category Selector */}
            {step === 1 && (
               <CategorySelector
                  groups={groups}
                  categories={categories}
                  vendorProfile={vendorProfile}
                  isLoadingGroups={isLoadingGroups}
                  isLoadingCategories={isLoadingCategories}
                  setVendorProfile={setVendorProfile}
                  setSelectedGroupId={setSelectedGroupId}
                  cleanSelectedTags={cleanSelectedTags}
               />
            )}

            {/* Step 2: Skills Selector */}
            {step === 2 && (
               <SkillsSelector
                  categoryId={vendorProfile.categoryId}
                  optionsTags={optionsTags}
                  selectedTags={selectedTags}
                  addSkill={addSkill}
                  removeSkill={removeSkill}
                  addSelectedTag={addSelectedTag}
                  removeSelectedTag={removeSelectedTag}
                  addOptionsTag={addOptionsTag}
                  removeOptionsTag={removeOptionsTag}
               />
            )}

            {/* Step 3: Headline */}
            {step === 3 && (
               <Headline
                  vendorProfile={vendorProfile}
                  setVendorProfile={setVendorProfile}
               />
            )}

            {/* Step 4: About Me */}
            {step === 4 && (
               <AboutMe
                  vendorProfile={vendorProfile}
                  setVendorProfile={setVendorProfile}
               />
            )}

            {/* Step 5: Banner Image */}
            {step === 5 && (
               <Banner
                  bannerImagePreview={bannerImagePreview}
                  setBannerImagePreview={setBannerImagePreview}
                  setBannerImage={setBannerImage}
               />
            )}
         </Box>

         {/* Footer */}
         <footer className="w-screen ml-[-50vw] left-1/2 relative">
            <Footer
               totalSteps={5}
               step={step}
               isDisabledStepButton={isDisabledStepButton()}
               isDisabledCreateProfileButton={isDisabledCreateProfileButton()}
               handleCreateProfile={handleCreateProfile}
               previousStep={previousStep}
               nextStep={nextStep}
               isPendingCreateProfile={isPendingCreateProfile}
            />
         </footer>
         <Toaster />
      </Box>
   )
}
