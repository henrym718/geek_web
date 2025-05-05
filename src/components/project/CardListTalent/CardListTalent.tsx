"use client"

import { CardTalent } from "../CardTalent/CardTalent"

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

export function CardListTalent({ talents }: Readonly<Props>) {
   return (
      <>
         {talents.map((talent) => (
            <CardTalent
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
