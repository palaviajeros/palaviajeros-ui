import React from "react";
import { findCountryPackage } from "@/app/actions/travelPackagesLoader";
import { TravelPackage as TravelPackageModel } from "@/app/shared/domain/travelPackage";
import PackageSliderCard from "@/app/components/Home/PackageSlider/PackageSliderCard";
import { Flex, Title } from "@mantine/core";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({ params }: { params: CountryLandingPageProps }) => {
  const travelCountryPackage = await findCountryPackage((cp) => cp.countryCode == params.countryCode);
  const travelPackages: TravelPackageModel[] = travelCountryPackage?.packages || [];
  if (!travelCountryPackage) {
    return <>no packages found</>;
  }
  return (
    <>
      <Flex>
        <PackageSliderCard travelPackages={travelPackages} noOfRenderedCards={travelPackages.length} />
      </Flex>
    </>
  );
};

export default CountryPackage;
