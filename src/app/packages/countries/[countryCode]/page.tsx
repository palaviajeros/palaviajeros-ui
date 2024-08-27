import React from "react";
import { findCountryPackage } from "@/app/actions/travelPackagesLoader";
import { TravelPackage as TravelPackageModel } from "@/app/shared/domain/travelPackage";
import { Flex, Title } from "@mantine/core";
import PackageCarousel from "@/app/components/Home/PackageCarousel/PackageCarousel";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({ params }: { params: CountryLandingPageProps }) => {
  const travelCountryPackage = await findCountryPackage(cp => cp.countryCode == params.countryCode);
  const travelPackages: TravelPackageModel[] = travelCountryPackage?.packages || [];
  if (!travelCountryPackage) {
    return <>no packages found</>;
  }

  return (
    <>
      <Flex direction="column">
        <Title order={2} ta="center">
          All Packages
        </Title>
        <PackageCarousel travelPackages={travelPackages} noOfRenderedCards={travelPackages.length} />
      </Flex>
    </>
  );
};

export default CountryPackage;
