import { getAccessTokenFromCookie } from "@/app/lib/utils/get-access-token-from-cookie"
import VendorProfileSelectorButton from "./VendorProfileSelectorButton"
import { fetchVendorProfilesByAccessToken } from "@/app/services/vendor-profile.service"
import { Suspense } from "react"

export default async function VendorProfileSelector() {
   const accessToken = await getAccessTokenFromCookie()
   const response = fetchVendorProfilesByAccessToken(accessToken ?? "")

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <VendorProfileSelectorButton vendorProfiles={response} />
      </Suspense>
   )
}
