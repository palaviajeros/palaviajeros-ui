import "./styles.travel-packages.scss";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import TravelTabs from "./TravelTabs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = () => {
  const packages: TravelCountryPackages[] = getTravelPackages();

  return (
    <>
      <TravelTabs packages={packages} />
    </>
  );
};
export default TravelPackagesPage;
