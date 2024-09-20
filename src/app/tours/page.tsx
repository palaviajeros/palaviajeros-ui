import TravelTabs from "../components/TravelTabs/TravelTabs";
import { filterCountriesData } from "@/app/actions/dataLoader";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { Container } from "@mantine/core";
import { PackageType } from "../shared/domain/packageType";

export default async function ToursPage() {
  const packages: TravelCountryPackage[] = await filterCountriesData(tcp => tcp.tours.length > 0);

  return (
    <>
      <Container size="xl" p={{ base: "30px 0px", sm: "30px 0px", lg: "100px 70px" }}>
        <TravelTabs packages={packages} tabType={PackageType.Tours} />
      </Container>
    </>
  );
}
