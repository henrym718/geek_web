"use client"

/**
 * InputField - Componente de entrada de texto personalizable
 *
 * Características:
 * - Totalmente personalizable con variantes (tamaño, bordes, fondo)
 * - Integración con react-hook-form
 * - Gestión de errores con espacio fijo para evitar saltos
 * - Soporte para etiquetas
 */

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils/cn"
import { InputHTMLAttributes, Ref } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

// Definición de variantes de estilo usando class-variance-authority
const inputVariants = cva(
   [
      "flex",
      "h-9",
      "w-full",
      "border",
      "border-primary",
      "bg-transparent",
      "px-3",
      "py-1",
      "text-md",
      "shadow-sm",
      "transition-colors",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "data-[error=true]:ring-[2px] data-[error=true]:ring-red-600 data-[error=true]:border-none",
   ],
   {
      variants: {
         variant: {
            default: "border-primary",
         },
         sizing: {
            default: "h-10 px-3 py-1",
            sm: "h-8 px-2 py-1 text-xs",
            lg: "h-12 px-4 py-2",
         },
         rounded: {
            none: "rounded-none",
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
         },
         background: {
            white: "bg-white",
            gray: "bg-gray-100",
            transparent: "bg-transparent",
         },
      },
      defaultVariants: {
         variant: "default",
         sizing: "default",
         rounded: "md",
         background: "transparent",
      },
   }
)

// Props del componente que extienden las propiedades nativas de input
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   ref?: Ref<HTMLInputElement>
   error?: string
   className?: string
   classNameWrapper?: string
   label?: string
   variant?: VariantProps<typeof inputVariants>["variant"]
   sizing?: VariantProps<typeof inputVariants>["sizing"]
   rounded?: VariantProps<typeof inputVariants>["rounded"]
   background?: VariantProps<typeof inputVariants>["background"]
   register?: UseFormRegisterReturn
}

export const InputField = (props: InputFieldProps) => {
   const { ref, error, className, classNameWrapper, label, variant, sizing, rounded, background, register, ...rest } = props

   return (
      <div className={cn("relative flex flex-col w-full", classNameWrapper)}>
         {/* Etiqueta opcional */}
         {label && <span className="text-sm pb-1">{label}</span>}

         {/* Input con estilos configurables */}
         <input
            className={cn(inputVariants({ variant, sizing, rounded, background }), className)}
            ref={ref}
            data-error={error ? true : null}
            {...rest}
            {...register}
         />

         {/* Contenedor de altura fija para mensajes de error (evita saltos) */}
         <div className="h-2 mt-1">{error && <p className="text-xs text-red-500">{error}</p>}</div>
      </div>
   )
}
