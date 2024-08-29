import { getCountryTravelPackages } from "@/app/actions/travelPackagesLoader";
import { Flex, Title } from "@mantine/core";
import TravelPackageCard from "@/app/components/TravelPackageCard/TravelPackageCard";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({ params }: { params: CountryLandingPageProps }) => {
  const countries: TravelCountryPackage[] = await getCountryTravelPackages();
  const country = countries.filter(pkg => pkg.countryCode == params.countryCode);

  return (
    <>
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
    </>
  );
};

export default CountryPackage;
