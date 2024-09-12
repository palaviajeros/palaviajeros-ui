import "./styles.travel-packages.scss";
import { filterCountries, getCountryTravelPackages } from "@/app/actions/dataLoader";
import TravelTabs from "../components/TravelTabs/TravelTabs";
import React from "react";
import { Metadata } from "next";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { Container } from "@mantine/core";

export const metadata: Metadata = {
  title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = async () => {
  const packages: TravelCountryPackage[] = await filterCountries(tcp => tcp.packages.length > 0);

  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      <TravelTabs packages={packages} pageData="Packages page" />
    </Container>
  );
};
export default TravelPackagesPage;
