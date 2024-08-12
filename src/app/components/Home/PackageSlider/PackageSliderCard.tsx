"use client";

import { Card, Image, Text, Badge, Button, Flex, Anchor } from "@mantine/core";
import NextImage from "next/image";
import InquiryModal from "@/app/components/InquiryModal/InquiryModalButton";
import { TravelPackage } from "@/app/shared/domain/travelPackage";

interface CardBestSellersProps {
  travelPackages: TravelPackage[];
}

export default function PackageSliderCard({
  travelPackages
}: CardBestSellersProps) {
  return (
    <Flex
      justify="center"
      mt="md"
      gap="lg"
      direction={{
        base: "column",
        md: "row"
      }}
    >
      {travelPackages.map((travelPackage: TravelPackage) => {
        return (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            key={travelPackage.code}
            flex={1}
          >
            <Card.Section>
              <Image
                component={NextImage}
                key={travelPackage.code}
                src={travelPackage.imageUrls[0]}
                height={300}
                width={400}
                alt={travelPackage.code}
              />
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
              <Text
                fw="bold"
                fz="sm"
                td={travelPackage.salePrice ? "line-through" : "none"}
              >
                ₱{travelPackage.price}
              </Text>
              <Text
                fw="bold"
                ml="xs"
                fz="sm"
                display={travelPackage.salePrice ? "block" : "none"}
                c="var(--mantine-color-red-8)"
              >
                ₱{travelPackage.salePrice}
              </Text>
              <InquiryModal travelPackage={travelPackage} variant={"default"}>
                <Button
                  variant="default"
                  mt="md"
                  radius="lg"
                  size="xs"
                  maw={150}
                  ml="auto"
                >
                  Request a Quote
                </Button>
              </InquiryModal>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
}
