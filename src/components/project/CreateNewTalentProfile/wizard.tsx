"use client"
import { useWizardCreateProfileFormDataStore } from "@/stores/use-create-profile-form-data.store"
import { CategorySelector } from "./category-selector"
import { ProfileAboutMe } from "./profile-aboutme"
import { ProfileHeadline } from "./profile-headline"
import { ProfileBannerImage } from "./ProfileBannerImage"
import { SkillsSelector } from "./skills-selector"
import { useWizardCreateProfileStepHandlerStore } from "@/stores/use-create-profile-step-handler.store"
import { useWizardUserDataStore } from "@/stores/use-create-profile-user-data.store"
import { WizardFooter } from "./wizard-footer"
import { Box } from "@/components/ui"
import useSWR from "swr"
import { fetchAllGroups } from "@/data/api/services/group.service"
import { fetchCategoriesByGroupId } from "@/data/api/services/category.service"
import { fetchSkillsByCategoryId } from "@/data/api/services/skill.service"

export function Wizard() {
   //Store de steps
   const { step } = useWizardCreateProfileStepHandlerStore((state) => state)

   //Store de datos del usuario
   const { vendorProfile, setVendorProfile, setBannerImage } = useWizardUserDataStore((state) => state)

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
      selectedTags,
      addSelectedTag,
      removeSelectedTag,
      cleanSelectedTags,
      setOptionsTags,
      addOptionsTag,
      removeOptionsTag,

      // Banner image
      bannerImagePreview,
      setBannerImagePreview,
   } = useWizardCreateProfileFormDataStore((state) => state)

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
                  setVendorProfile={setVendorProfile}
                  addSelectedTag={addSelectedTag}
                  removeSelectedTag={removeSelectedTag}
                  addOptionsTag={addOptionsTag}
                  removeOptionsTag={removeOptionsTag}
               />
            )}

            {/* Step 3: Headline */}
            {step === 3 && (
               <ProfileHeadline
                  vendorProfile={vendorProfile}
                  setVendorProfile={setVendorProfile}
               />
            )}

            {/* Step 4: About Me */}
            {step === 4 && (
               <ProfileAboutMe
                  vendorProfile={vendorProfile}
                  setVendorProfile={setVendorProfile}
               />
            )}

            {/* Step 5: Banner Image */}
            {step === 5 && (
               <ProfileBannerImage
                  bannerImagePreview={bannerImagePreview}
                  setBannerImagePreview={setBannerImagePreview}
                  setBannerImage={setBannerImage}
               />
            )}
         </Box>

         {/* Footer */}
         <footer className="w-screen ml-[-50vw] left-1/2 relative">
            <WizardFooter />
         </footer>
      </Box>
   )
}
