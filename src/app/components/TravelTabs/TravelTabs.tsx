"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import TravelPackage from "../TravelPackage/TravelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { TravelTabsType } from "@/app/shared/domain/travelTabsType";

interface TravelTabsProps {
  packages: TravelCountryPackage[];
  tabType: TravelTabsType;
}

const TravelTabs = ({ packages, tabType }: TravelTabsProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(packages[0].countryName);

  const getPackageData = (p: TravelCountryPackage) => {
    return tabType === TravelTabsType.Package ? p.packages : p.tours;
  };

  return (
    <>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          {packages.map(p => (
            <Tabs.Tab key={p.countryCode} value={p.countryName}>
              {p.countryName}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {packages.map(p => p.countryName === activeTab && <TravelPackage key={p.countryCode} packages={getPackageData(p)} />)}
    </>
  );
};

export default TravelTabs;
