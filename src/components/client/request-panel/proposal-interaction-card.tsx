import { Box, SideModal, SideModalContent, SideModalTrigger } from "@/components/ui"
import { ProformaResponse, Skill, User, Vendor, VendorProfile } from "@/data/types/models/models"
import { ProposalSumaryCard } from "./proposal-sumary-card"
import { ProposalActionModal } from "./proposal-action-modal"
interface Props {
   response: Pick<ProformaResponse, "id" | "budget" | "message" | "status">
   user: Pick<User, "createdAt" | "username">
   vendor: Pick<Vendor, "photo" | "phone" | "city">
   vendorProfile: Pick<VendorProfile, "aboutme" | "title">
   skills: Skill[]
   requestid: string
}

export function ProposalsInteractionCard(data: Readonly<Props>) {
   const { response, user, vendor, vendorProfile, skills, requestid } = data

   return (
      <Box>
         <SideModal>
            <SideModalTrigger>
               <Box>
                  <ProposalSumaryCard
                     username={user.username}
                     title={vendorProfile.title}
                     city={vendor.city}
                     message={response.message}
                     skills={skills}
                     status={response.status}
                  />
               </Box>
            </SideModalTrigger>
            <SideModalContent>
               {(close) => (
                  <ProposalActionModal
                     username={user.username}
                     title={vendorProfile.title}
                     city={vendor.city}
                     message={response.message}
                     skills={skills}
                     createdAt={user.createdAt}
                     closeModal={close}
                     requestid={requestid}
                     responseid={response.id}
                  />
               )}
            </SideModalContent>
         </SideModal>
      </Box>
   )
}
