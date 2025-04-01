/**
 * Componente Typography flexible y reutilizable.
 *
 * Proporciona un sistema de tipografía con múltiples variantes, colores y alineaciones,
 * implementando un mapeo semántico a elementos HTML apropiados según el contexto.
 * Utiliza CVA (class-variance-authority) para manejar las variantes de estilo.
 * Utiliza CN una utilidad que integra clsx y twMerge para combinar clases.
 */
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils/cn"

/**
 * Configuración de variantes tipográficas utilizando CVA.
 * Define los estilos base y las variantes disponibles para personalización.
 */
const typographyVariants = cva(["focus-visible:outline-none", "focus-visible:ring-1", "focus-visible:ring-ring"], {
   variants: {
      variant: {
         // Títulos principales
         titulo1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
         titulo2: "text-3xl font-bold tracking-tight lg:text-4xl",
         titulo3: "text-2xl font-bold tracking-tight lg:text-3xl",

         // Subtítulos
         subtitulo1: "text-xl font-semibold tracking-tight lg:text-2xl",
         subtitulo2: "text-lg font-semibold lg:text-xl",

         // Textos de contenido
         parrafo: "text-base leading-6",
         parrafoChico: "text-sm leading-5",
         nota: "text-xs leading-4",

         // Elementos de énfasis
         destacado: "text-base font-medium",
         enfasis: "text-base italic",

         // Citas y testimonios
         cita: "border-l-4 border-gray-200 pl-4 italic text-base",
         testimonio: "text-lg italic font-light",

         // Elementos de UI
         etiqueta: "text-xs font-semibold rounded-full",
         badge: "text-xs font-bold px-2 py-1 rounded-full",
         enlace: "text-base underline",
         menu: "text-base font-medium",

         // Mensajes y formularios
         mensaje: "text-sm font-medium",
         label: "text-sm font-medium",
      },

      color: {
         primario: "text-primary dark:text-primary",
         secundario: "text-gray-600 dark:text-gray-300",
         muted: "text-gray-500 dark:text-gray-400",
         enlace: "text-blue-600 dark:text-blue-400 hover:underline",
         exito: "text-green-600 dark:text-green-400",
         error: "text-red-600 dark:text-red-400",
         advertencia: "text-yellow-600 dark:text-yellow-400",
         info: "text-blue-500 dark:text-blue-300",
      },

      align: {
         izquierda: "text-left",
         centro: "text-center",
         derecha: "text-right",
      },

      effect: {
         subrayado: "underline",
         italica: "italic",
         tachado: "line-through",
         espaciado: "tracking-wide",
         condensado: "tracking-tight",
      },
   },
   defaultVariants: {
      variant: "parrafo",
      color: "primario",
      align: "izquierda",
   },
})

/**
 * Definición de los tipos de variantes disponibles para el mapeo.
 * Esta tipificación garantiza consistencia entre las variantes y sus elementos HTML correspondientes.
 */
export type TypographyVariant =
   | "titulo1"
   | "titulo2"
   | "titulo3"
   | "subtitulo1"
   | "subtitulo2"
   | "parrafo"
   | "parrafoChico"
   | "nota"
   | "destacado"
   | "enfasis"
   | "cita"
   | "testimonio"
   | "etiqueta"
   | "badge"
   | "enlace"
   | "menu"
   | "mensaje"
   | "label"

/**
 * Mapeo que asocia cada variante tipográfica con su elemento HTML semántico correspondiente.
 * Asegura que el contenido se renderice con la estructura HTML adecuada.
 */
const variantToElement: Record<TypographyVariant, React.ElementType> = {
   titulo1: "h1",
   titulo2: "h2",
   titulo3: "h3",
   subtitulo1: "h4",
   subtitulo2: "h5",
   parrafo: "p",
   parrafoChico: "p",
   nota: "p",
   destacado: "strong",
   enfasis: "em",
   cita: "blockquote",
   testimonio: "blockquote",
   etiqueta: "span",
   badge: "span",
   enlace: "a",
   menu: "span",
   mensaje: "div",
   label: "label",
}

/**
 * Props del componente Typography, excluyendo la propiedad color nativa de HTML
 * e incorporando las variantes definidas con CVA.
 */
interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, "color">, VariantProps<typeof typographyVariants> {
   className?: string
   children?: React.ReactNode
}

/**
 * Componente Typography que selecciona automáticamente el elemento HTML apropiado
 * basado en la variante elegida y aplica los estilos correspondientes.
 */
export const Typography: React.FC<TypographyProps> = ({ variant, color, align, effect, className, children, ...rest }) => {
   // Determinar el elemento final a renderizar
   const Component = variant ? variantToElement[variant] : "p"

   return (
      <Component
         className={cn(typographyVariants({ variant, color, align, effect }), className)}
         {...rest}
      >
         {children}
      </Component>
   )
}
