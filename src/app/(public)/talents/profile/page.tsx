import { TalentPublicProfile } from "@/components/project/TalentPublicprofile/TalentPublicProfile"
import { fetchVendorProfileById } from "@/data/api/services/vendor-profile.service"
import { timeAgo } from "@/lib/utils/timeAgo"

interface Props {
   searchParams: Promise<{
      id: string
   }>
}

export default async function TalentProfilePage(props: Readonly<Props>) {
   const { id } = await props.searchParams

   const response = await fetchVendorProfileById(id)

   if (!response.success) {
      return <div>No se encontró el talento</div>
   }
   const { user, vendor, vendorProfile, category, skills, city } = response.data

   return (
      <TalentPublicProfile
         username={user.username}
         firstName={vendor.firstName}
         lastName={vendor.lastName}
         phone={vendor.phone ?? ""}
         city={city.name}
         title={vendorProfile.title}
         aboutme={vendorProfile.aboutme}
         categoryName={category.name}
         skills={skills}
         createdAt={timeAgo(vendorProfile.createdAt ?? new Date())}
      />
   )
}
