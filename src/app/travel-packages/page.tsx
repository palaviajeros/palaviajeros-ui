import "./styles.travel-packages.scss";
import {TravelCountryPackages} from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import TravelTabs from "./TravelTabs";
import React from "react";

const TravelPackagesPage = () => {
    const packages: TravelCountryPackages[] = getTravelPackages();

    return (
        <>
            <TravelTabs packages={packages}/>
        </>
    );
};
export default TravelPackagesPage;
