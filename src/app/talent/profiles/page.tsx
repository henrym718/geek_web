"use client"

import { Icon, LucideIconName } from "@/components/icon"
import { Avatar, Badge, Button, InputField, ProgressBar, Typography } from "@/components/ui"
import { cn } from "@/lib/utils/cn"

import React, { useState } from "react"
import { ResponsiveBadges } from "./components/ResponsiveBadges"

interface State {
    filterOptSelected: "All" | "Active" | "Inactive" | "Completed" | "Incompleted"
}

export default function ProfilesPage() {
    const [filterOptSelected, setFilterOptSelected] = useState<State["filterOptSelected"]>("All")

    const buttonsFiltered = [
        { key: "All", label: "Todos", icon: "Circle" },
        { key: "Active", label: "Activos", icon: "CheckCircle" },
        { key: "Inactive", label: "Inactivos", icon: "CircleOff" },
        { key: "Completed", label: "Completos", icon: "CheckSquare" },
        { key: "Incompleted", label: "Incompletos", icon: "Square" },
    ]

    return (
        <section className="min-h-screen">
            <Typography variant="titulo2">Mis perfiles Profesionales</Typography>
            <Typography variant="label">Gestiona y edita todos tus perfiles desde un solo lugar</Typography>

            <div className="pt-5">
                <InputField
                    type="search"
                    placeholder="Buscar por titulo, descripcion o habilidades"
                />
            </div>

            <section className="flex gap-2 pt-4">
                {buttonsFiltered.map((button) => (
                    <Button
                        key={button.key}
                        className={cn(filterOptSelected === button.key && "bg-blue-700 text-white hover:bg-blue-700", "rounded-md [&_svg]:size-3.5")}
                        onClick={() => setFilterOptSelected(button.key as State["filterOptSelected"])}
                        variant="outline">
                        <span className="flex items-center gap-2">
                            <Icon name={button.icon as LucideIconName} />
                            {button.label}
                        </span>
                    </Button>
                ))}
            </section>

            <div className="pt-2">
                <Typography variant="label">Mostrando 4 de 4 perfiles</Typography>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-3">
                <div className="border border-border w-[400px] p-5 rounded-md">
                    <div className="flex gap-3">
                        <Avatar size="2xl" />
                        <div className="flex flex-col gap-1">
                            <Typography variant="subtitulo2">Desarrollador Fronted Senior</Typography>
                            <Typography variant="label">Especialista en React, Typescript y arquitetcuras modernas de desarrollo...</Typography>
                        </div>
                    </div>

                    <div className="pt-5">
                        <Badge className="px-2.5 py-1.5 rounded-xl text-green-500 bg-white border border-dorder">Activo</Badge>
                    </div>
                    <div className="flex flex-col pt-4 space-y-2">
                        <Typography variant="label">Completado</Typography>{" "}
                        <ProgressBar
                            currentStep={4}
                            steps={5}
                            className="bg-green-500"
                        />
                    </div>

                    <ResponsiveBadges
                        skills={["React React React React", "Next.js js js jsjsjsjs", "AWS", "Three.js", "GCP", "Docker", "Kubernetes"]}
                        containerWidth={350}
                        badgeClassName="px-3 py-1 bg-gray-100 text-black my-0.5 rounded-full text-xs font-medium"
                    />
                </div>
            </section>
        </section>
    )
}
