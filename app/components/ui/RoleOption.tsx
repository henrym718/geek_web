"use client"
import { cn } from "../../lib/utils/cn"

interface RoleOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
   Icon: React.ReactElement
   message: string
   value: string
   className?: string
   selectedRole?: string
}

export const RoleOption: React.FC<RoleOptionProps> = ({ Icon, message, value, className, selectedRole, ...rest }) => {
   return (
      <label
         htmlFor={`radio-${value}`}
         className={cn("flex rounded-md gap-2 border w-72 py-4 px-4 cursor-pointer", className)}>
         <div className="flex flex-col">
            <div className="flex justify-between">
               {Icon}
               <input
                  id={`radio-${value}`}
                  type="radio"
                  value={value}
                  {...rest}
               />
            </div>
            <p>{message}</p>
         </div>
      </label>
   )
}
