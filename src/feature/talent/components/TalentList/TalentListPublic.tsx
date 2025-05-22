"use client"

import { TalentCard } from "../TalentCard/TalentCard"

interface Props {
   talents: {
      id: string
      firstName: string
      lastName: string
      bannerImage: string
      photo: string
      city: string
      title: string
   }[]
}

export function TalentListPublic({ talents }: Readonly<Props>) {
   return (
      <>
         {talents.map((talent) => (
            <TalentCard
               key={talent.id}
               id={talent.id}
               firstName={talent.firstName}
               lastName={talent.lastName}
               bannerImage={talent.bannerImage}
               photo={talent.photo}
               city={talent.city}
               title={talent.title}
            />
         ))}
      </>
   )
}
