"use client"

import React, { useEffect, useRef, useState } from "react"

interface Props {
    skills: string[]
    maxHeight?: number
    containerWidth?: number
    badgeClassName?: string
    containerClassName?: string
}

export const ResponsiveBadges: React.FC<Props> = ({
    skills,
    containerWidth = 450,
    badgeClassName = "px-2.5 py-1.5 rounded-xl bg-gray-200 text-sm whitespace-nowrap",
    containerClassName = "",
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [visibleCount, setVisibleCount] = useState(skills.length)

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (!containerRef.current) return

            const width = containerRef.current.offsetWidth
            const badgeWidthEstimate = 75 // estimado base
            const maxBadges = Math.floor(width / badgeWidthEstimate)

            setVisibleCount(maxBadges < skills.length ? maxBadges : skills.length)
        })

        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [skills])

    const visibleSkills = skills.slice(0, visibleCount)
    const hiddenCount = skills.length - visibleCount

    return (
        <div
            ref={containerRef}
            className={`flex items-center flex-wrap overflow-hidden space-x-1 ${containerClassName}`}
            style={{ width: containerWidth }}>
            {visibleSkills.map((skill, index) => (
                <span
                    key={index}
                    className={badgeClassName}>
                    {skill}
                </span>
            ))}
            {hiddenCount > 0 && <span className={badgeClassName}>+{hiddenCount}</span>}
        </div>
    )
}
