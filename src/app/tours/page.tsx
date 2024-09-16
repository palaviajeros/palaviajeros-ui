import TravelTabs from "../components/TravelTabs/TravelTabs";
import { filterCountries } from "@/app/actions/dataLoader";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { Container } from "@mantine/core";
import { TravelTabsType } from "../shared/domain/travelTabsType";

export default async function ToursPage() {
  const packages: TravelCountryPackage[] = await filterCountries(tcp => tcp.tours.length > 0);

  return (
    <>
      <Container size="xl" p={{ base: "30px 0px", sm: "30px 0px", lg: "100px 70px" }}>
        <TravelTabs packages={packages} tabType={TravelTabsType.Tours} />
      </Container>
    </>
  );
}
