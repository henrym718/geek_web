/**
 * 🧩 InputTag component
 *
 * Este componente permite al usuario buscar, seleccionar y deseleccionar habilidades (tags) dentro de una categoría específica.
 * Funciona como un input tipo "tag selector" con soporte para:
 * - Filtro dinámico a partir del input
 * - Teclado (navegación con flechas y selección con Enter)
 * - Sincronización con estados globales del formulario y perfil del vendor
 *
 * Reglas:
 * - No se pueden seleccionar más tags de los permitidos (`maxSelectedTags`)
 * - Tags seleccionados se excluyen automáticamente del dropdown
 * - Tags eliminados vuelven a estar disponibles en la lista de opciones
 */

// 📦 Imports
import { cn } from "@/app/lib/utils/cn"
import { getSkillsByCategoryId } from "@/app/services/skill/skill.services"
import { useWizardCreateProfileFormDataStore } from "@/app/stores/vendor/wizard-create-profile-form-data.store"
import { useWizardUserDataStore } from "@/app/stores/vendor/wizard-create-profile-user-data.store"
import { GetSkillsByCategoryIdResponse } from "@/app/types/dtos/get-skills-by-categoryId"
import { useEffect, useState } from "react"

// 📐 Props
interface InputTagProps {
   categoryId: string
   maxSelectedTags: number
   maxVisibleOptions: number
   className?: string
}

export default function InputTag(props: Readonly<InputTagProps>) {
   /**
    * 🧠 Global store hooks
    * - vendorProfile: almacena el perfil general del vendor, incluyendo los IDs de habilidades
    * - selectedTags / optionsTags: manejan las tags visibles/seleccionadas a nivel global durante el flujo
    */
   const { vendorProfile, setVendorProfile } = useWizardUserDataStore((state) => state)
   const { selectedTags, optionsTags, addSelectedTag, removeSelectedTag, addOptionsTag, setOptionsTags, removeOptionsTag } =
      useWizardCreateProfileFormDataStore((state) => state)

   /**
    * 🧠 Local states
    * - selectedTagIndex: índice actual dentro del dropdown para navegación con teclado
    * - isOpen: controla la visibilidad del dropdown de resultados
    * - search: valor del input de búsqueda
    */
   const [selectedTagIndex, setSelectedTagIndex] = useState(-1)
   const [isOpen, setIsOpen] = useState(false)
   const [search, setSearch] = useState("")

   // 🔍 Filtra los tags que coincidan con la búsqueda actual
   const filterTags = optionsTags.filter((tag) => tag.name.toLowerCase().includes(search.toLowerCase()))
   const limitTags = filterTags.slice(0, props.maxVisibleOptions)

   /**
    * ✅ Al seleccionar un tag:
    * 1. Se agrega al estado de tags seleccionados
    * 2. Se remueve del listado de opciones (para evitar duplicados)
    * 3. Se agrega al estado global de habilidades (`vendorProfile.skills`)
    * 4. Se limpia la búsqueda y se cierra el dropdown
    */
   const handleSelectedTags = (tag: GetSkillsByCategoryIdResponse) => {
      addSelectedTag(tag)
      removeOptionsTag(tag)
      setSearch("")
      setSelectedTagIndex(-1)
      setIsOpen(false)
      setVendorProfile({ skills: [...vendorProfile.skills, tag.id] })
   }

   /**
    * ❌ Al quitar un tag ya seleccionado:
    * 1. Se remueve del array `vendorProfile.skills`
    * 2. Se elimina del estado de tags seleccionados
    * 3. Se vuelve a agregar a las opciones disponibles para selección
    */
   const handleUnselectedTags = (tag: GetSkillsByCategoryIdResponse) => {
      setVendorProfile({
         skills: vendorProfile.skills.filter((t) => t !== tag.id),
      })
      removeSelectedTag(tag)
      addOptionsTag(tag)
   }

   // 🔄 Actualiza el estado de búsqueda y abre el dropdown
   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setSelectedTagIndex(-1)
      setIsOpen(true)
   }

   // 🔒 Cierra el dropdown si se pierde el foco
   const handleInputBlur = () => setIsOpen(false)

   /**
    * 🎯 Navegación con teclado:
    * - Flecha abajo/arriba: moverse entre opciones
    * - Enter: seleccionar el tag actualmente enfocado
    */
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") setSelectedTagIndex((prev) => Math.min(prev + 1, limitTags.length - 1))

      if (e.key === "ArrowUp") setSelectedTagIndex((prev) => Math.max(prev - 1, 0))

      if (e.key === "Enter" && limitTags[selectedTagIndex]) handleSelectedTags(limitTags[selectedTagIndex])
   }

   /**
    * 📡 Cada vez que cambia `categoryId`, se hace un fetch de las habilidades asociadas
    * Si ya hay tags seleccionados, se excluyen de las opciones para evitar duplicados
    */
   useEffect(() => {
      const fetchSkills = async () => {
         const response = await getSkillsByCategoryId({ categoryId: props.categoryId })
         if (response.success) {
            const newTags = response.data.filter((tag) => !selectedTags.some((selected) => selected.id === tag.id))
            setOptionsTags(newTags)
         }
      }
      fetchSkills()
   }, [props.categoryId, setOptionsTags, selectedTags])

   // 🧱 Render
   return (
      <div className={cn("flex border-2 flex-wrap gap-2 rounded-md px-2 py-2", props.className)}>
         {selectedTags.map((tag) => (
            <div
               key={tag.id}
               className="flex gap-2 border px-2 py-0.5 rounded-xl">
               <p>{tag.name}</p>
               <p
                  className="cursor-pointer"
                  onMouseDown={() => handleUnselectedTags(tag)}>
                  x
               </p>
            </div>
         ))}

         <div className="relative flex flex-col flex-grow gap-2">
            <input
               className="flex-grow border-none focus:outline-none placeholder:text-sm px-2"
               type="text"
               placeholder={selectedTags.length >= props.maxSelectedTags ? `Seleccionaste ${props.maxSelectedTags} tags` : "Buscar un tag"}
               onChange={handleSearch}
               value={search}
               onBlur={handleInputBlur}
               onKeyDown={handleKeyDown}
               disabled={selectedTags.length >= props.maxSelectedTags}
            />

            {isOpen && search.length > 0 && (
               <ul className="absolute top-[150%] min-w-[150px] shadow rounded-md border border-gray-200 bg-white px-2">
                  {limitTags.map((tag, index) => (
                     <li
                        key={tag.id}
                        data-selected={selectedTagIndex === index}
                        className="cursor-pointer data-[selected=true]:bg-gray-100"
                        onMouseDown={(e) => {
                           e.preventDefault()
                           handleSelectedTags(tag)
                        }}>
                        {tag.name}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   )
}
