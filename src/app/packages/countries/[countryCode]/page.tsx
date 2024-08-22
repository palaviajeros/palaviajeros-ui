import React from "react";
import { findCountryPackage } from "@/app/actions/travelPackagesLoader";
import TravelPackage from "@/app/components/TravelPackage/TravelPackage";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({
  params,
}: {
  params: CountryLandingPageProps;
}) => {
  const travelCountryPackage = await findCountryPackage(
    (cp) => cp.countryCode == params.countryCode
  );
  if (!travelCountryPackage) {
    return <>no packages found</>;
  }
  return <TravelPackage travelPackage={travelCountryPackage} />;
};

export default CountryPackage;
