"use client";

import {useState} from "react";
import {Tabs} from "@mantine/core";
import TravelPackage from "../components/TravelPackage/TravelPackage";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

interface TravelTabsProps {
    packages: TravelCountryPackage[];
}

const TravelTabs = ({packages}: TravelTabsProps) => {
    const [activeTab, setActiveTab] = useState<string | null>(
        packages[0].countryName
    );
    return (
        <>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    {packages.map((p) => (
                        <Tabs.Tab key={p.countryCode} value={p.countryName}>
                            {p.countryName}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>
            {packages.map((p) => {
                return p.countryName === activeTab ? (
                    <TravelPackage key={p.countryCode} travelPackage={p}/>
                ) : null;
            })}
        </>
    );
};

export default TravelTabs;
