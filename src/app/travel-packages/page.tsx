import "./styles.travel-packages.scss";
import {getCountryTravelPackages} from "@/app/actions/travelPackagesLoader";
import TravelTabs from "./TravelTabs";
import React from "react";
import {Metadata} from "next";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

export const metadata: Metadata = {
    title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = async () => {
    const packages: TravelCountryPackage[] = await getCountryTravelPackages();

    return (
        <>
            <TravelTabs packages={packages}/>
        </>
    );
};
export default TravelPackagesPage;
