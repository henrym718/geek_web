"use client"

/**
 * InputSearch - Componente de búsqueda con autocompletado
 *
 * Este componente implementa un campo de búsqueda con las siguientes características:
 * - Integración con react-hook-form mediante Controller
 * - Filtrado de opciones en tiempo real
 * - Navegación mediante teclado (flechas arriba/abajo y Enter)
 * - Selección mediante mouse
 * - Lista desplegable con resaltado de opciones
 */

import { ChangeEvent, KeyboardEvent, useRef, useState } from "react"
import { InputField, InputFieldProps } from "./input-field"
import { Controller, Control, FieldValues, Path } from "react-hook-form"

// Tipo para el valor de ciudad
interface CityOption {
   id: string
   label: string
}

interface InputSearchProps<T extends FieldValues> extends Omit<InputFieldProps, "type"> {
   options: CityOption[]
   limit?: number
   name: Path<T>
   control?: Control<T>
   onSelected?: (option: CityOption) => void
   value?: string
}

export const InputSearch = <T extends FieldValues>(props: InputSearchProps<T>) => {
   const { options, limit, name, control, onSelected, value, ...rest } = props

   // Estados para controlar el comportamiento del componente
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [highlightedIndex, setHighlightedIndex] = useState(-1)
   const [filteredOptions, setFilteredOptions] = useState<CityOption[]>([])
   const [inputValue, setInputValue] = useState(value || "")
   const [isOptionSelected, setIsOptionSelected] = useState(false)

   // Referencia para acceder al método onChange de react-hook-form
   const onChangeRef = useRef<((value: CityOption) => void) | null>(null)

   // Filtra las opciones según el texto ingresado
   const handleFilterOptions = (value: string) => {
      const filtered = value ? options.filter((opt) => opt.label.toLowerCase().includes(value.toLowerCase())).slice(0, limit) : []
      setFilteredOptions(filtered)
   }

   // Maneja la selección de una opción
   const handleOnSelect = (option: CityOption) => {
      // Actualiza el valor en el formulario con el objeto completo {id, label}
      onChangeRef.current?.(option)
      // Marca que se ha seleccionado una opción válida
      setIsOptionSelected(true)
      // Actualiza el valor mostrado en el input
      setInputValue(option.label)
      // Cierra el dropdown
      setIsDropdownOpen(false)

      // Notificar valor seleccionado a través del callback
      if (onSelected) {
         onSelected(option)
      }
   }

   // Maneja la navegación por teclado
   const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const optionsLength = filteredOptions.length

      if (!optionsLength) return

      switch (event.key) {
         case "ArrowDown":
            // Navegar hacia abajo en la lista
            setHighlightedIndex((prev) => Math.min(prev + 1, optionsLength - 1))
            break
         case "ArrowUp":
            // Navegar hacia arriba en la lista
            event.preventDefault()
            setHighlightedIndex((prev) => Math.max(prev - 1, 0))
            break
         case "Enter":
            // Seleccionar la opción resaltada
            if (highlightedIndex >= 0) {
               event.preventDefault()
               handleOnSelect(filteredOptions[highlightedIndex])
            }
            break
      }
   }

   // Maneja los cambios en el input
   const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setInputValue(value)

      // Si el usuario empieza a escribir después de seleccionar,
      // resetea el estado de selección y actualiza el formulario con un valor parcial
      if (isOptionSelected) {
         setIsOptionSelected(false)
         // Al escribir después de seleccionar, pasamos un objeto con solo label para que falle la validación
         onChangeRef.current?.({ label: value, id: "" })
      } else {
         // Si aún no ha seleccionado, seguimos pasando objeto parcial
         onChangeRef.current?.({ label: value, id: "" })
      }

      if (onSelected) {
         onSelected({ label: "", id: "" })
      }

      setIsDropdownOpen(true)
      setHighlightedIndex(-1)
      handleFilterOptions(value)
   }

   return (
      <div className="relative">
         {/* Controller conecta el componente con react-hook-form */}
         <Controller
            control={control}
            name={name}
            render={({ field }) => {
               // Guarda la referencia al onChange para usarla en otros handlers
               onChangeRef.current = field.onChange

               // Determina el valor a mostrar en el input
               const displayValue = field.value?.label || inputValue || ""

               return (
                  <InputField
                     type="search"
                     value={displayValue}
                     onChange={handleOnChange}
                     onKeyDown={handleKeyDown}
                     onBlur={() => setIsDropdownOpen(false)}
                     {...rest}
                  />
               )
            }}
         />

         {/* Lista de opciones filtradas */}
         {filteredOptions.length > 0 && (
            <ul
               className="absolute top-[90%] w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 py-2 hidden data-[open=true]:block z-50"
               data-open={isDropdownOpen && inputValue.trim() !== ""}>
               {filteredOptions.map((option, index) => (
                  <li
                     key={option.id}
                     data-selected={highlightedIndex === index}
                     className="data-[selected=true]:bg-primary/10 p-2 cursor-pointer"
                     onMouseEnter={() => setHighlightedIndex(index)}
                     onMouseLeave={() => setHighlightedIndex(-1)}
                     onMouseDown={() => handleOnSelect(option)}>
                     {option.label}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}
