import { GroupCategorySkillsSelector } from "@/components/client/create-request/skill-request-builder/skill-request-builder"
import { RequestBudget } from "@/components/client/create-request/request-budget"
import { RequestDetails } from "@/components/client/create-request/request-details"
import { RequestHeadline } from "@/components/client/create-request/request-headline"
import { RequestScope } from "@/components/client/create-request/request-scope"
import { Wizard } from "@/components/client/create-request/wizard"
import { RequestTiming } from "@/components/client/create-request/request-timing"

export default function CreateRequestPage() {
   return (
      <Wizard
         steps={{
            requestHeadline: <RequestHeadline />,
            requestDetails: <RequestDetails />,
            requestBudget: <RequestBudget />,
            requestTiming: <RequestTiming />,
            groupCategorySkillsSelector: <GroupCategorySkillsSelector />,
            requestScope: <RequestScope />,
         }}
      />
   )
}
