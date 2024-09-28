import { getCountryTravelPackages } from "@/app/actions/dataLoader";
import { Flex, Title, Container } from "@mantine/core";
import TravelPackageCard from "@/app/components/TravelPackageCard/TravelPackageCard";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import Link from "next/link";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({ params }: { params: CountryLandingPageProps }) => {
  const countryCode = params.countryCode.toUpperCase();
  const countries: TravelCountryPackage[] = await getCountryTravelPackages();
  const country = countries.filter(pkg => pkg.countryCode == countryCode);

  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      {country.length >= 1 ? (
        <Flex direction="column" gap="lg">
          <Title order={2} ta="center">
            {country[0].countryName}
          </Title>

          <Flex direction={{ base: "column", md: "row" }} gap="md">
            {country[0].packages.map(c => (
              <div key={c.code} style={{ flex: 1 }}>
                <TravelPackageCard travelPackage={c} />
              </div>
            ))}
          </Flex>
        </Flex>
      ) : (
        <div>No packages found</div>
      )}
    </Container>
  );
};

export default CountryPackage;
