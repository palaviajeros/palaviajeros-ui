import "./styles.travel-packages.scss";
import getTravelPackages from "@/app/lib/travelPackagesLoader";
import TravelTabs from "./TravelTabs";
import React from "react";
import {Metadata} from "next";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

export const metadata: Metadata = {
    title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = () => {
    const packages: TravelCountryPackage[] = getTravelPackages();

    return (
        <>
            <TravelTabs packages={packages}/>
        </>
    );
};
export default TravelPackagesPage;
