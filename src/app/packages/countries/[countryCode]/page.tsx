import React from "react";
import { findCountryPackage } from "@/app/actions/travelPackagesLoader";
import { TravelPackage as TravelPackageModel } from "@/app/shared/domain/travelPackage";
import { Flex, Title, Card } from "@mantine/core";
import TravelPackageCard from "@/app/components/TravelPackageCard/TravelPackageCard";

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
      <Flex direction="column" gap="lg">
        <Title order={2} ta="center">
          {travelCountryPackage.countryName}
        </Title>

        <Flex direction={{ base: "column", md: "row" }} gap="md">
          {travelPackages.map((tp: TravelPackageModel) => {
            return (
              <div key={tp.code} style={{ flex: 1 }}>
                <TravelPackageCard travelPackage={tp} />
              </div>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};

export default CountryPackage;
