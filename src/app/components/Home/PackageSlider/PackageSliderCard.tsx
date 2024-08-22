"use client";

import { Card, Image, Text, Badge, Button, Flex } from "@mantine/core";
import NextImage from "next/image";
import InquiryModal from "@/app/components/InquiryModal/InquiryModalButton";
import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classes from "./PackageSliderCard.module.scss";

interface CardBestSellersProps {
  travelPackages: TravelPackage[];
  noOfRenderedCards: number;
}

export default function PackageSliderCard({ travelPackages, noOfRenderedCards }: CardBestSellersProps) {
  return (
    <>
      <Carousel
        classNames={classes}
        containScroll="trimSnaps"
        loop
        mt="md"
        slideGap="md"
        align="start"
        slideSize={{ base: "100%", sm: "50%", md: `${100 / Math.min(noOfRenderedCards, travelPackages.length)}%` }}
        nextControlIcon={<IconChevronRight size={20} />}
        previousControlIcon={<IconChevronLeft size={20} />}
        withControls={travelPackages.length > noOfRenderedCards}
        withIndicators={travelPackages.length > noOfRenderedCards}
        styles={{
          control: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            transition: "all 0.3s ease",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 1)"
            }
          }
        }}
      >
        {travelPackages.map((travelPackage: TravelPackage) => {
          return (
            <Carousel.Slide key={travelPackage.code} style={{ cursor: "pointer" }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Card.Section>
                  <Image component={NextImage} src={travelPackage.imageUrls[0]} alt={travelPackage.code} height={300} width={400} />
                </Card.Section>

                <Text fw={500} mt="md">
                  {travelPackage.name}
                </Text>
                <Badge variant="light" leftSection="📅" mt="md" mb="md">
                  {travelPackage.days} days trip
                </Badge>
                <Text size="sm" c="dimmed">
                  {travelPackage.description}
                </Text>
                <Flex align="flex-end" flex={1}>
                  <Text fw="bold" fz="sm" td={travelPackage.salePrice ? "line-through" : "none"}>
                    ₱{travelPackage.price}
                  </Text>
                  <Text fw="bold" ml="xs" fz="sm" display={travelPackage.salePrice ? "block" : "none"} c="var(--mantine-color-red-8)">
                    ₱{travelPackage.salePrice}
                  </Text>
                  <InquiryModal travelPackage={travelPackage} variant={"default"}>
                    <Button variant="default" mt="md" radius="lg" size="xs" maw={150} ml="auto">
                      Request a Quote
                    </Button>
                  </InquiryModal>
                </Flex>
              </Card>
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </>
  );
}
