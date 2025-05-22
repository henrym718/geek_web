"use client"

import { Box } from "@/components/ui"
import { GroupCardPublic } from "../CardGroup/GroupCardPublic"
import { GROUPS } from "@/data/states/Groups"

export function CardListGroup() {
   return (
      <Box className="flex gap-4 flex-wrap w-full justify-center">
         {GROUPS.map((group) => (
            <GroupCardPublic
               key={group.id}
               title={group.title}
               Icon={group.icon}
               id={group.id}
            />
         ))}
      </Box>
   )
}
