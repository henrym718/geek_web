"use client"
export interface ProgressBarProps {
   steps: number
   currentStep: number
}

export const ProgressBar = (props: ProgressBarProps) => {
   const { steps, currentStep } = props
   const percentage = (currentStep / steps) * 100

   return (
      <div className="w-full h-2 bg-gray-200 rounded-full">
         <div
            style={{ width: `${percentage}%` }}
            className="h-full bg-primary rounded-full transition-all duration-500"></div>
      </div>
   )
}
