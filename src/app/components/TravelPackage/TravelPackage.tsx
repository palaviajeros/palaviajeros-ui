import React from "react";
import Image from "next/image";
import {
  TravelCountryPackages,
  DateRange,
  Services,
} from "@/app/shared/models/travelPackageDto";
import { Carousel } from "@mantine/carousel";
import {
  Flex,
  Button,
  Badge,
  NumberFormatter,
  rem,
  Title,
  Text,
  Center,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
  IconX,
} from "@tabler/icons-react";
import "./TravelPackage.scss";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModal";
import { formatDateRange, getValueOfEnumService } from "@/app/util/Helpers";
import { relative } from "path";

interface TravelPackageProps {
  travelPackage: TravelCountryPackages;
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
                lg: "row",
              }}
            >
              <div className="carousel-container" style={{ flex: 1 }}>
                <Carousel
                  slideSize="100%"
                  slideGap="lg"
                  align="center"
                  loop
                  height="100%"
                  nextControlIcon={
                    <IconCircleArrowRightFilled
                      style={{
                        width: rem(24),
                        height: rem(24),
                        color: "white",
                      }}
                    />
                  }
                  previousControlIcon={
                    <IconCircleArrowLeftFilled
                      style={{
                        width: rem(24),
                        height: rem(24),
                        color: "white",
                      }}
                    />
                  }
                >
                  {t.imageUrls.map((img, index) => {
                    return (
                      <Carousel.Slide key={index}>
                        <Image
                          className="package-photo"
                          layout="responsive"
                          width={14}
                          height={9}
                          src={img}
                          alt="image"
                        />
                      </Carousel.Slide>
                    );
                  })}
                </Carousel>
              </div>
              <div style={{ flex: 1 }}>
                <Title order={3} mb={20} ta={{ base: "center", lg: "left" }}>
                  {t.name}
                </Title>
                <Flex
                  gap={"sm"}
                  wrap="wrap"
                  justify={{ base: "center", lg: "start" }}
                >
                  {t.travelDates.map((d, index) => {
                    return (
                      <Badge
                        key={index}
                        radius="md"
                        variant="light"
                        color="cyan"
                      >
                        {formatDateRange(d)}
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
                        boxShadow: "0 0 10px 5px var(--mantine-color-gray-0)",
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
                              color="var(--mantine-color-dark-2)"
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
