import { ProposalCard } from "../ProposalCard/ProposalCard"
import { ProposalResponseModal } from "../ProposalResponseModal/ProposalResponseModal"
import { Skill } from "@/data/types/models/models"

interface Props {
   username: string
   title: string
   city: string
   message: string
   status: string
   skills: Skill[]
   createdAt: string
   requestid: string
   responseid: string
}
export function ProposalItem({ username, title, city, message, status, skills, createdAt, requestid, responseid }: Readonly<Props>) {
   return (
      <ProposalResponseModal
         username={username}
         title={title}
         city={city}
         message={message}
         skills={skills}
         createdAt={createdAt}
         requestid={requestid}
         responseid={responseid}>
         <ProposalCard
            username={username}
            title={title}
            city={city}
            message={message}
            status={status}
         />
      </ProposalResponseModal>
   )
}
