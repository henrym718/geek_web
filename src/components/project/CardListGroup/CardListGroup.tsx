"use client"

import { Box } from "../../ui"
import { CardGroup } from "../CardGroup/CardGroup"
import { GROUPS } from "@/data/states/Groups"

export function CardListGroup() {
   return (
      <Box className="flex gap-4 flex-wrap w-full justify-center">
         {GROUPS.map((group) => (
            <CardGroup
               key={group.id}
               title={group.title}
               Icon={group.icon}
               id={group.id}
            />
         ))}
      </Box>
   )
}
