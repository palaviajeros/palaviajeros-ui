import "./styles.travel-packages.scss";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import TravelTabs from "./TravelTabs";
import { Container } from "@mantine/core";

const TravelPackagesPage = () => {
  const packages: TravelCountryPackages[] = getTravelPackages();

  return (
    <>
      <Container>
        <TravelTabs packages={packages} />
      </Container>
    </>
  );
};
export default TravelPackagesPage;
