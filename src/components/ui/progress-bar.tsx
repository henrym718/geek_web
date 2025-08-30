"use client"

import { cn } from "@/lib/utils/cn"

export interface ProgressBarProps {
    steps: number
    currentStep: number
    className?: string
}

export const ProgressBar = (props: ProgressBarProps) => {
    const { steps, currentStep, className } = props
    const percentage = (currentStep / steps) * 100

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
                style={{ width: `${percentage}%` }}
                className={cn("h-full bg-primary rounded-full transition-all duration-500", className)}></div>
        </div>
    )
}
