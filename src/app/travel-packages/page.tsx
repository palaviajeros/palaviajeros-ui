import { filterCountries } from "@/app/actions/dataLoader";
import TravelTabs from "../components/TravelTabs/TravelTabs";
import React from "react";
import { Metadata } from "next";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { Container } from "@mantine/core";
import { TravelTabsType } from "../shared/domain/travelTabsType";

export const metadata: Metadata = {
  title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = async () => {
  const packages: TravelCountryPackage[] = await filterCountries(tcp => tcp.packages.length > 0);

  return (
    <Container size="xl" p={{ base: "30px 0px", sm: "30px 0px", lg: "100px 70px" }}>
      <TravelTabs packages={packages} tabType={TravelTabsType.Package} />
    </Container>
  );
};
export default TravelPackagesPage;
