"use client";
import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { Badge, Button, Card, Flex, Text } from "@mantine/core";
import Image from "next/image";
import InquiryModal from "@/app/components/InquiryModal/InquiryModalButton";

interface TravelPackageCardProps {
  travelPackage: TravelPackage;
}

export default function TravelPackageCard({ travelPackage }: TravelPackageCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <Card.Section
        style={{
          position: "relative",
          height: "300px",
        }}
      >
        <Image
          src={travelPackage.imageUrls[0]}
          alt={travelPackage.code}
          fill
          sizes="(min-width: 1420px) 381px, (min-width: 1040px) calc(22.22vw + 70px), (min-width: 780px) calc(50vw - 59px), calc(97.17vw - 40px)"
        />
      </Card.Section>

      <Text fw={500} mt="md">
        {travelPackage.name}
      </Text>
      <Badge variant="light" leftSection="📅" mt="md" mb="md">
        {travelPackage.days} days trip
      </Badge>
      <Text size="sm" c="dimmed">
        {travelPackage.shortDescription}
      </Text>
      <Flex align="flex-end" flex={1}>
        <Text fw="bold" fz="sm" td={travelPackage.salePrice ? "line-through" : "none"}>
          ₱{travelPackage.price}
        </Text>
        <Text fw="bold" ml="xs" fz="sm" display={travelPackage.salePrice ? "block" : "none"} c="var(--mantine-color-red-8)">
          ₱{travelPackage.salePrice}
        </Text>
        <InquiryModal tour={travelPackage} variant={"default"}>
          <Button variant="default" mt="md" radius="lg" size="xs" maw={150} ml="auto">
            Request a Quote
          </Button>
        </InquiryModal>
      </Flex>
    </Card>
  );
}
