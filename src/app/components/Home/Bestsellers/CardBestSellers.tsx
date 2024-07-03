"use client";

import { differenceInCalendarDays } from "date-fns";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import { Card, Image, Text, Badge, Button, Flex } from "@mantine/core";

interface CardBestSellersProps {
  card: TravelCountryPackages;
}

export default function CardBestSellers({ card }: CardBestSellersProps) {
  return (
    <>
      <Flex
        justify="center"
        mt="md"
        gap="lg"
        direction={{
          base: "column",
          md: "row"
        }}
      >
        {/* Default ES: TBD once packages are final */}
        {card.countryCode === "ES" ? (
          <>
            {card.packages.map((c) => {
              return (
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  key={c.code}
                >
                  <Card.Section>
                    <Image
                      key={c.code}
                      src={c.imageUrls[0]}
                      height={300}
                      alt={c.code}
                    />
                  </Card.Section>
                  <Text fw={500} mt="md" mb="xs">
                    {c.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {c.description}
                  </Text>
                  <Flex gap="xs" mt="lg">
                    {c.travelDates.map((td, index) => {
                      return (
                        <Badge variant="light" leftSection="📅" key={index}>
                          {differenceInCalendarDays(td.endDate, td.startDate)}{" "}
                          days trip
                        </Badge>
                      );
                    })}
                  </Flex>
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
                </Card>
              );
            })}
          </>
        ) : null}
      </Flex>
    </>
  );
}
