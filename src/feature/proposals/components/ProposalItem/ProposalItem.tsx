import { ProposalCard } from "../ProposalCard/ProposalCard"
import { ProposalResponseModal } from "../ProposalResponseModal/ProposalResponseModal"
import { Skill } from "@/data/types/models/models"

interface Props {
   vendorId: string
   clientId: string
   username: string
   firstName: string
   lastName: string
   title: string
   city: string
   aboutme: string
   message: string
   status: string
   skills: Skill[]
   createdAt: string
   requestid: string
   responseid: string
}
export function ProposalItem({
   username,
   firstName,
   lastName,
   title,
   city,
   message,
   status,
   skills,
   createdAt,
   aboutme,
   requestid,
   responseid,
   vendorId,
   clientId,
}: Readonly<Props>) {
   return (
      <ProposalResponseModal
         username={username}
         vendorId={vendorId}
         clientId={clientId}
         firstName={firstName}
         lastName={lastName}
         aboutme={aboutme}
         title={title}
         city={city}
         message={message}
         skills={skills}
         createdAt={createdAt}
         requestid={requestid}
         responseid={responseid}>
         <ProposalCard
            username={username}
            firstName={firstName}
            lastName={lastName}
            title={title}
            city={city}
            status={status}
         />
      </ProposalResponseModal>
   )
}
