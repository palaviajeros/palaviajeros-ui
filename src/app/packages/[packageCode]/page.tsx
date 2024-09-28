import { findPackage } from "@/app/actions/dataLoader";
import Image from "next/image";
import { Box, Title, Container, Flex, Text, Divider, Button } from "@mantine/core";
import { IconMapPin, IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { formatDateRange, generateDateRange, getValueOfEnumService } from "@/app/util/Helpers";
import TimelineItinerary from "./TimelineItinerary";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModalButton";

interface PackageDetailsPageProps {
  packageCode: string;
}

export default async function PackageDetailsPage({ params }: { params: PackageDetailsPageProps }) {
  const travelPackage = await findPackage(p => p.code === params.packageCode);
  return travelPackage === undefined ? (
    <></>
  ) : (
    <Box key={travelPackage.code}>
      <Box pos="relative" w="100vw" h={650} style={{ marginLeft: "calc(50% - 50vw)" }}>
        <Image fill style={{ objectFit: "cover" }} src={travelPackage.imageUrls[0]} alt={params.packageCode} />
      </Box>
      <Container size="xl" p={{ base: "50px 30px", sm: "50px", lg: "70px" }}>
        <Title>{travelPackage.name}</Title>
        <Flex mt="xs">
          <IconMapPin stroke={2} width="18px" />
          <Text ml="5px">{travelPackage.location}</Text>
        </Flex>
        <Box mt="xs" maw={350}>
          <Flex justify="space-between">
            <Text c="gray" fz="sm">
              Price:
            </Text>
            <Flex w={270}>
              <Text fw="bold" fz="sm" td={travelPackage.salePrice ? "line-through" : "none"}>
                ₱{travelPackage.price}
              </Text>
              <Text fw="bold" ml="5px" fz="sm" display={travelPackage.salePrice ? "block" : "none"} c="var(--mantine-color-red-8)">
                ₱{travelPackage.salePrice}
              </Text>
            </Flex>
          </Flex>
          <Flex justify="space-between">
            <Text c="gray" fz="sm">
              Schedule:
            </Text>
            <Text fw="bold" fz="sm" w={270}>
              {formatDateRange(generateDateRange(travelPackage.travelDates[0], travelPackage.days))}
            </Text>
          </Flex>
          <InquiryModalButton tour={travelPackage} variant={"default"}>
            <Button variant="default" mt="md" radius="lg" size="xs" maw={150} ml="auto">
              Request a Quote
            </Button>
          </InquiryModalButton>
        </Box>
        <Divider my="xl" />
        <Text mt="xs" fz="sm" c="gray" maw="700px">
          {travelPackage.longDescription}
        </Text>
        <Box mt="md">
          <Title order={3} mb="xs">
            Includes:
          </Title>
          {travelPackage.inclusions.map(t => (
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
          {travelPackage.exclusions.map(t => (
            <Flex key={t}>
              <IconCircleXFilled width="20px" stroke={2} />
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
        <TimelineItinerary travelPackage={travelPackage} />
        <Flex mt="xl" gap="lg" pos="relative" w="100%" direction={{ base: "column", sm: "row" }}>
          <Box flex={2}>
            <Image
              style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
              width={600}
              height={600}
              src={travelPackage.imageUrls[1]}
              alt={params.packageCode}
            />
          </Box>
          <Flex direction="column" gap="lg" flex={1}>
            <Image
              style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
              width={300}
              height={300}
              src={travelPackage.imageUrls[2]}
              alt={params.packageCode}
            />
            <Image
              style={{ objectFit: "cover", borderRadius: "3%", width: "100%", height: "100%" }}
              width={300}
              height={300}
              src={travelPackage.imageUrls[3]}
              alt={params.packageCode}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
