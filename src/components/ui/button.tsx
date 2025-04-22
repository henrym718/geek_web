/**
 * Componente Button reutilizable y personalizable.
 *
 * Proporciona un botón con múltiples variantes, tamaños y estilos,
 * implementando patrones de accesibilidad y estados visuales consistentes.
 * Utiliza CVA (class-variance-authority) para manejar las variantes de estilo.
 * Utiliza CN una utilidad que integra clsx y twMerge para combinar clases.
 */
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils/cn"
import React, { FC, ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"

/**
 * Configuración de variantes de estilo del botón utilizando CVA.
 * Define los estilos base y las variantes disponibles para personalización.
 */
const buttonVariants = cva(
   [
      //Estilos de animacion
      "transition-all",
      "duration-300",
      "ease-in-out",

      // Estilos base del botón
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "whitespace-nowrap",
      "rounded-lg",
      "text-sm",
      "font-medium",

      // Estilos de foco para accesibilidad
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",

      // Ajustes para iconos dentro del botón
      "[&_svg]:pointer-events-none",
      "[&_svg]:size-5",
      "[&_svg]:shrink-0",
      "[&_svg]:align-middle",
      "[&_svg]:translate-y-[1px]",

      // Dimensiones y espaciado por defecto
      "h-9",
      "px-4",
      "py-2",
      "cursor-pointer",

      // Estados deshabilitados
      "disabled:pointer-events-none",
      "disabled:opacity-50",
   ],
   {
      variants: {
         // Variantes visuales del botón
         variant: {
            primary: "bg-primary text-primary-foreground hover:bg-primary/95",
            secundary: "bg-secondary font-bold text-secondary-foreground hover:bg-secondary-hover transition-all duration-300",
            tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/10",
            outline: "bg-transparent border border-opacity-50 hover:bg-black/5",
            link: "underline-offset-4 hover:underline shadow-none",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
            ghost: "bg-transparent hover:bg-black/5 hover:rounded-lg font-bold",
         },

         rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            full: "rounded-full",
         },

         // Variantes de tamaño
         size: {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "h-9 w-9 p-0", // Para botones que solo contienen un icono
         },

         // Variantes de color
         color: {
            primary: "bg-primary text-primary-foreground hover:bg-primary/95",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/10",
            outline: "bg-transparent border border-opacity-50 hover:bg-primary hover:text-primary-foreground",
            link: "underline-offset-4 hover:underline shadow-none",
         },
      },

      // Valores predeterminados
      defaultVariants: {
         variant: "primary",
      },
   }
)

/**
 * Props del componente Button, extendiendo los atributos HTML nativos
 * e incorporando las variantes definidas con CVA.
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
   variant?: VariantProps<typeof buttonVariants>["variant"]
   size?: VariantProps<typeof buttonVariants>["size"]
   rounded?: VariantProps<typeof buttonVariants>["rounded"]
   color?: VariantProps<typeof buttonVariants>["color"]
   className?: string
   disabled?: boolean
   children: React.ReactNode
   isLoading?: boolean
}

/**
 * Componente Button que implementa las variantes de estilo definidas.
 * Acepta todas las propiedades de un botón HTML estándar más las variantes personalizadas.
 */
export const Button: FC<ButtonProps> = ({ variant, size, rounded, color, disabled, children, className, isLoading, ...props }) => {
   return (
      <button
         className={cn(buttonVariants({ variant, size, rounded, color }), className)}
         disabled={disabled}
         {...props}>
         {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
      </button>
   )
}
