import { getCountryTravelPackages } from "@/app/actions/travelPackagesLoader";
import Link from "next/link";
import {
  Flex,
  Card,
  BackgroundImage,
  Box,
  Title,
  Text,
  Space,
} from "@mantine/core";

export default async function Countries() {
  const countries = await getCountryTravelPackages();
  console.log(countries.map((country) => country.countryCode));
  return (
    <>
      <Title order={1} ta="center">
        Tour Packages
      </Title>
      <Space h="xl" />
      <Flex justify="space-evenly" wrap="wrap" gap="20px">
        {countries.map((country) => (
          <Link
            key={country.countryCode}
            href={{
              pathname: `/countries/${country.countryCode}`,
            }}
            style={{ textDecoration: "none" }}
          >
            <Box>
              <BackgroundImage
                w={400}
                h={240}
                src={country.packages[0].imageUrls[0]}
                radius="md"
                p={20}
              >
                <Title order={3} c="var(--mantine-color-white)">
                  {country.countryName}
                </Title>
                <Text c="var(--mantine-color-white)">
                  {country.description}
                </Text>
              </BackgroundImage>
            </Box>
          </Link>
        ))}
      </Flex>
    </>
  );
}
