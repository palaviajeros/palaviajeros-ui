import { filterPackagesPerCountry } from "@/app/actions/dataLoader";
import Image from "next/image";
import { Box, Title, Container, Flex, Text, Divider } from "@mantine/core";
import { IconMapPin, IconCircleCheckFilled, IconSquareX } from "@tabler/icons-react";
import { getValueOfEnumService } from "@/app/util/Helpers";

import TimelineItinerary from "./TimelineItinerary";
interface PackageDetailsPageProps {
  packageCode: string;
}

export default async function PackageDetailsPage({ params }: { params: PackageDetailsPageProps }) {
  const travelPackage = await filterPackagesPerCountry(p => p.code === params.packageCode);
  return (
    <>
      {travelPackage.map(tp => {
        return (
          <div key={tp.code}>
            <Box pos="relative" w="100vw" h={600} style={{ marginLeft: "calc(50% - 50vw)" }}>
              <Image fill style={{ objectFit: "cover" }} src={travelPackage[0].imageUrls[1]} alt={params.packageCode} />
            </Box>
            <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "70px" }}>
              <Title>{tp.name}</Title>
              <Flex mt="xs">
                <IconMapPin stroke={2} width="18px" />
                <Text ml="5px">{tp.location}</Text>
              </Flex>
              <Box mt="xs">
                <Flex>
                  <Text c="gray" fz="sm">
                    Price:
                  </Text>
                  <Text fw="bold" ml="5px" fz="sm" td={tp.salePrice ? "line-through" : "none"}>
                    ₱{tp.price}
                  </Text>
                  <Text fw="bold" ml="5px" fz="sm" display={tp.salePrice ? "block" : "none"} c="var(--mantine-color-red-8)">
                    ₱{tp.salePrice}
                  </Text>
                </Flex>
                <Flex>
                  <Text c="gray" fz="sm">
                    Schedule:
                  </Text>
                  <Text fw="bold" ml="5px" fz="sm">
                    {tp.travelDates[0].toString()}
                  </Text>
                </Flex>
              </Box>
              <Divider my="xl" />
              <Text mt="xs" fz="xs" c="gray" maw="450px">
                {tp.longDescription}
              </Text>
              <Box mt="md">
                <Title order={3} mb="xs">
                  Includes:
                </Title>
                {tp.inclusions.map(t => (
                  <Flex key={t}>
                    <IconCircleCheckFilled width="20px" stroke={2} />
                    <Text c="gray" fz="sm" ml="5px">
                      {`${getValueOfEnumService(t)}`}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <Box mt="md">
                <Title order={3} mb="xs">
                  Excludes:
                </Title>
                {tp.exclusions.map(t => (
                  <Flex key={t}>
                    <IconSquareX width="20px" stroke={2} />
                    <Text c="gray" fz="sm" ml="5px">
                      {`${getValueOfEnumService(t)}`}
                    </Text>
                  </Flex>
                ))}
              </Box>
              <Divider my="xl" />
              <Title order={3} mb="md">
                Travel Plans:
              </Title>
              <TimelineItinerary tp={tp} />
              <Flex mt="xl" gap="md" pos="relative" w="100%" direction={{ base: "column", sm: "row" }}>
                <div style={{ flex: 2 }}>
                  <Image
                    style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
                    width={600}
                    height={600}
                    src={travelPackage[0].imageUrls[0]}
                    alt={params.packageCode}
                  />
                </div>
                <Flex direction="column" gap="md" style={{ flex: 1 }}>
                  <Image
                    style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
                    width={300}
                    height={300}
                    src={travelPackage[0].imageUrls[1]}
                    alt={params.packageCode}
                  />
                  <Image
                    style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
                    width={300}
                    height={300}
                    src={travelPackage[0].imageUrls[2]}
                    alt={params.packageCode}
                  />
                </Flex>
              </Flex>
            </Container>
          </div>
        );
      })}
    </>
  );
}
