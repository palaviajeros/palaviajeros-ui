import React from "react";
import NextImage from "next/legacy/image";
import { Carousel } from "@mantine/carousel";
import {
  Flex,
  Badge,
  NumberFormatter,
  rem,
  Title,
  Text,
  Tooltip,
  Image
} from "@mantine/core";
import {
  IconCheck,
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
  IconX,
  IconCalendarPlus
} from "@tabler/icons-react";
import "./TravelPackage.scss";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModalButton";
import {
  formatDateRange,
  generateDateRange,
  getValueOfEnumService
} from "@/app/util/Helpers";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";

interface TravelPackageProps {
  travelPackage: TravelCountryPackage;
}

const TravelPackage = ({ travelPackage }: TravelPackageProps) => {
  return (
    <>
      {travelPackage.packages.map((t, index) => {
        return (
          <React.Fragment key={t.code}>
            <Flex
              gap={{ lg: "xl" }}
              mb={"xl"}
              mt={"xl"}
              direction={{
                base: "column",
                lg: "row"
              }}
            >
              <div className="carousel-container" style={{ flex: 1 }}>
                <Carousel
                  slideSize="100%"
                  slideGap="lg"
                  align="center"
                  loop
                  height="100%"
                  mb={10}
                  nextControlIcon={
                    <IconCircleArrowRightFilled
                      style={{
                        width: rem(24),
                        height: rem(24),
                        color: "white"
                      }}
                    />
                  }
                  previousControlIcon={
                    <IconCircleArrowLeftFilled
                      style={{
                        width: rem(24),
                        height: rem(24),
                        color: "white"
                      }}
                    />
                  }
                >
                  {t.imageUrls.map((img, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Image
                          className="package-photo"
                          component={NextImage}
                          priority
                          layout="responsive"
                          width={14}
                          height={9}
                          src={img}
                          alt="image"
                          radius={"md"}
                        />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </div>
              <div style={{ flex: 1 }}>
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  justify={{
                    base: "center",
                    lg: "space-between"
                  }}
                  align="center"
                  gap={6}
                  mb={20}
                  wrap="wrap"
                >
                  <Title order={3} ta={{ base: "center", lg: "left" }}>
                    {t.name}
                  </Title>
                  <Tooltip
                    label="Flexible dates allowed"
                    color="var(--mantine-color-gray-4)"
                    position="top"
                    withArrow
                    arrowOffset={10}
                    arrowSize={6}
                    arrowRadius={1}
                    transitionProps={{ transition: "fade-up", duration: 300 }}
                  >
                    <Badge
                      variant="light"
                      radius="sm"
                      display={t.isFlexible ? "flex" : "none"}
                      bd="none"
                    >
                      Flexible
                    </Badge>
                  </Tooltip>
                </Flex>
                <Flex
                  gap={"xs"}
                  direction={{ base: "column", lg: "row" }}
                  wrap="wrap"
                  align={{ base: "center", lg: "start" }}
                >
                  <Badge
                    radius="md"
                    leftSection={<IconCalendarPlus stroke={2} width={18} />}
                    color="cyan"
                  >
                    {t.days} days
                  </Badge>
                  {t.travelDates.map((d, index) => {
                    return (
                      <Badge
                        key={index}
                        radius="md"
                        variant="light"
                        color="cyan"
                        bd="none"
                      >
                        {formatDateRange(generateDateRange(d, t.days))}
                      </Badge>
                    );
                  })}
                </Flex>
                {t.description.map((description) => {
                  return (
                    <Text
                      key={`description-${index}`}
                      mt="md"
                      p="md"
                      fz="h4"
                      bg="var(--mantine-color-gray-0)"
                      style={{
                        borderRadius: "var(--mantine-radius-md)",
                        boxShadow: "0 0 10px 5px var(--mantine-color-gray-0)"
                      }}
                    >
                      {description}
                    </Text>
                  );
                })}
                <div>
                  <Flex
                    direction={{ base: "row", lg: "column" }}
                    gap={{ base: "lg", lg: "xs" }}
                    mt={"md"}
                    mb={"lg"}
                    wrap="wrap"
                  >
                    <Flex direction="row" gap={"lg"}>
                      {t.inclusions.map((inclusion, index) => {
                        return (
                          <Flex key={index} align="center" gap={"xs"}>
                            <IconCheck
                              stroke={3}
                              color="var(--mantine-color-teal-4)"
                            />
                            <Text fz="var(--mantine-font-size-sm)">{`${getValueOfEnumService(
                              inclusion
                            )}`}</Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                    <Flex direction="row" gap={"lg"}>
                      {t.exclusions.map((exclusion, index) => {
                        return (
                          <Flex key={index} gap={"xs"}>
                            <IconX
                              stroke={2}
                              color="var(--mantine-color-dark-2)"
                            />
                            <Text
                              fz="var(--mantine-font-size-sm)"
                              c="var(--mantine-color-dark-2)"
                            >{`${getValueOfEnumService(exclusion)}`}</Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  </Flex>
                  <Flex
                    mt={{ base: "xs", lg: "xl" }}
                    direction="row"
                    justify="flex-end"
                    align="center"
                    gap={{ base: "sm", lg: "lg" }}
                  >
                    <NumberFormatter
                      prefix="$ "
                      value={t.price}
                      thousandSeparator
                      style={{ fontWeight: "bold" }}
                    />
                    <InquiryModalButton variant={"primary"} travelPackage={t}>
                      Get a Quote
                    </InquiryModalButton>
                  </Flex>
                </div>
              </div>
            </Flex>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TravelPackage;
