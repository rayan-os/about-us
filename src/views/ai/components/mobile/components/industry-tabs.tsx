"use client";

import { Tabs } from "@/components/ui/tabs";
import { useMobileContext } from "../context";
import { TabsEnum } from "../types";

const tabs = [
  {
    id: TabsEnum.SCHOOLS,
    label: "For Schools",
  },
  {
    id: TabsEnum.EMPLOYERS,
    label: "For Employers",
  },
  {
    id: TabsEnum.LENDERS,
    label: "For Lenders",
  },
];

export const IndustryTabs = () => {
  const { activeTab, setActiveTab } = useMobileContext();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as typeof activeTab);
  };

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center">
      <Tabs
        tabs={tabs}
        variant="outline"
        animated={true}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};
