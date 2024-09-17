"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import TravelPackage from "@/app/components/TravelPackagesList/TravelPackagesList";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { PackageType } from "@/app/shared/domain/packageType";

interface TravelTabsProps {
  packages: TravelCountryPackage[];
  tabType: PackageType;
}

const TravelTabs = ({ packages, tabType }: TravelTabsProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(packages[0].countryName);

  const getPackageData = (p: TravelCountryPackage) => {
    return tabType === PackageType.FullItinerary ? p.packages : p.tours;
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
