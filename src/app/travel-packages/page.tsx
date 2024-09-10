import "./styles.travel-packages.scss";
import { getCountryTravelPackages } from "@/app/actions/dataLoader";
import TravelTabs from "./TravelTabs";
import React from "react";
import { Metadata } from "next";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { Container } from "@mantine/core";

export const metadata: Metadata = {
  title: "Travel Packages | Our offered travel packages",
};

const TravelPackagesPage = async () => {
  const packages: TravelCountryPackage[] = await getCountryTravelPackages();

  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      <TravelTabs packages={packages} />
    </Container>
  );
};
export default TravelPackagesPage;
