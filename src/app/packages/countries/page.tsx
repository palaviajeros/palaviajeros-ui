import { filterCountries, findCountryPackage, getCountryTravelPackages } from "@/app/actions/dataLoader";
import Link from "next/link";
import { Flex, BackgroundImage, Box, Title, Container, Space } from "@mantine/core";

export default async function Countries() {
  const countries = await filterCountries(cp => cp.packages.length > 0);
  return (
    <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
      <Title order={1} ta="center">
        Tour Packages
      </Title>
      <Space h="xl" />
      <Flex justify="center" wrap="wrap" gap={20}>
        {countries.map(country => (
          <Link
            key={country.countryCode}
            href={{ pathname: `/packages/countries/${country.countryCode}` }}
            style={{ textDecoration: "none" }}
          >
            <Box>
              <BackgroundImage w={400} h={240} src={country.packages[0].imageUrls[1]} radius="md" p={20}>
                <Title order={3} c="var(--mantine-color-white)">
                  {country.countryName}
                </Title>
              </BackgroundImage>
            </Box>
          </Link>
        ))}
      </Flex>
    </Container>
  );
}
