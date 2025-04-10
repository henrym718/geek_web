"use client"

interface TabProps {
   tabs: {
      label: string
      value: string
   }[]
   onSelectTab: (tab: string) => void
   activeTab: string
}

export const Tab = ({ tabs, onSelectTab, activeTab }: TabProps) => {
   return (
      <ul className="flex w-full gap-4">
         {tabs.map((tab) => (
            <li key={tab.value}>
               <button
                  className="flex-1 cursor-pointer gap-2"
                  onMouseDown={() => onSelectTab(tab.value)}>
                  <span
                     className="data-[active=true]:text-primary data-[active=true]:font-bold data-[active=true]:underline-offset-4 data-[active=true]:underline"
                     data-active={tab.value === activeTab}>
                     {tab.label}
                  </span>
               </button>
            </li>
         ))}
      </ul>
   )
}
