import TravelTabs from "../components/TravelTabs/TravelTabs";
import { Container } from "@mantine/core";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import { filterCountries, findToursPerCountry } from "@/app/actions/dataLoader";
import { getCountryTravelPackages } from "@/app/actions/dataLoader";
import { Tour } from "../shared/domain/tour";

const Tours = async () => {
  const packages: TravelCountryPackage[] = await filterCountries(tcp => tcp.tours.length > 0);

  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      <TravelTabs packages={packages} pageData="Tours page" />
    </Container>
  );
};
export default Tours;
