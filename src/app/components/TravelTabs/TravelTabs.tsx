"use client";

import { useState } from "react";
import { Tabs } from "@mantine/core";
import TravelPackage from "../TravelPackage/TravelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";

interface TravelTabsProps {
  packages: TravelCountryPackage[];
  pageData: string;
}

const TravelTabs = ({ packages, pageData }: TravelTabsProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(packages[0].countryName);
  console.log(packages);
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
      {packages.map(p => {
        return p.countryName === activeTab && pageData === "packages page" ? (
          <TravelPackage key={p.countryCode} packages={p.packages} />
        ) : (
          <TravelPackage key={p.countryCode} packages={p.tours} />
        );
      })}
    </>
  );
};

export default TravelTabs;
