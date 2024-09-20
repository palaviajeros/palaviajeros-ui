"use client";
import React from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import { Flex, Badge, rem, Title, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconCircleArrowLeftFilled, IconCircleArrowRightFilled, IconX, IconCalendarPlus } from "@tabler/icons-react";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModalButton";
import { formatDateRange, generateDateRange, getValueOfEnumService } from "@/app/util/Helpers";
import { Tour } from "@/app/shared/domain/tour";
import { TravelPackage } from "@/app/shared/domain/travelPackage";

interface TravelPackageProps {
  tourPackage: Tour;
  index: number;
  isTravelPackage: boolean;
}

const TravelPackageRow = ({ tourPackage, index }: TravelPackageProps) => {
  const isTravelPackage = "travelDates" in tourPackage;
  return (
    <>
      <React.Fragment key={tourPackage.code}>
        <Flex
          gap={{ lg: "xl" }}
          mb={"xl"}
          mt={"xl"}
          direction={{
            base: "column",
            lg: "row",
          }}
        >
          <div style={{ flex: 1 }}>
            <Carousel
              h={{ base: 250, sm: 400, lg: 350 }}
              slideSize="100%"
              align="center"
              loop
              height="100%"
              mb={10}
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
              {tourPackage.imageUrls.map((img, index) => {
                return (
                  <Carousel.Slide key={index} mr="xs">
                    <Image
                      priority={index == 0}
                      fill
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      src={img}
                      alt="image"
                      sizes="(min-width: 1440px) 550px, (min-width: 1200px) calc(27.27vw + 187px), (min-width: 780px) calc(100vw - 100px), calc(100vw - 60px)"
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
                lg: "space-between",
              }}
              align="center"
              gap={6}
              mb={20}
              wrap="wrap"
            >
              <Title order={3} ta={{ base: "center", lg: "left" }}>
                {tourPackage.name}
              </Title>
              {isTravelPackage && (
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
                  <Badge variant="light" radius="sm" display={"flex"} bd="none">
                    Flexible
                  </Badge>
                </Tooltip>
              )}
            </Flex>
            <Flex gap={"xs"} direction={{ base: "column", lg: "row" }} wrap="wrap" align={{ base: "center", lg: "start" }}>
              <Badge radius="md" leftSection={<IconCalendarPlus stroke={2} width={18} />} color="cyan">
                {tourPackage.days} days
              </Badge>

              {isTravelPackage &&
                (tourPackage as TravelPackage).travelDates.map((d, index) => {
                  return (
                    <Badge key={index} radius="md" variant="light" color="cyan" bd="none">
                      {formatDateRange(generateDateRange(d, tourPackage.days))}
                    </Badge>
                  );
                })}
            </Flex>
            {tourPackage.description.map(description => {
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
              <Flex direction={{ base: "row", lg: "column" }} gap={{ base: "lg", lg: "xs" }} mt={"md"} mb={"lg"} wrap="wrap">
                <Flex direction="row" gap={"lg"}>
                  {tourPackage.inclusions.map((inclusion, index) => {
                    return (
                      <Flex key={index} align="center" gap={"xs"}>
                        <IconCheck stroke={3} color="var(--mantine-color-teal-4)" />
                        <Text fz="var(--mantine-font-size-sm)">{`${getValueOfEnumService(inclusion)}`}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
                <Flex direction="row" gap={"lg"}>
                  {tourPackage.exclusions.map((exclusion, index) => {
                    return (
                      <Flex key={index} gap={"xs"}>
                        <IconX stroke={2} color="var(--mantine-color-dark-2)" />
                        <Text
                          fz="var(--mantine-font-size-sm)"
                          c="var(--mantine-color-dark-2)"
                        >{`${getValueOfEnumService(exclusion)}`}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              <Flex mt={{ base: "xs", lg: "xl" }} direction="row" justify="flex-end" align="center" gap={{ base: "sm", lg: "sm" }}>
                <Text fw="bold" fz="sm" td={tourPackage.salePrice ? "line-through" : "none"}>
                  ₱{tourPackage.price}
                </Text>
                <Text fw="bold" fz="sm" display={tourPackage.salePrice ? "block" : "none"} c="var(--mantine-color-red-8)">
                  ₱{tourPackage.salePrice}
                </Text>
                <InquiryModalButton variant={"primary"} tour={tourPackage}>
                  Get a Quote
                </InquiryModalButton>
              </Flex>
            </div>
          </div>
        </Flex>
      </React.Fragment>
    </>
  );
};

export default TravelPackageRow;
