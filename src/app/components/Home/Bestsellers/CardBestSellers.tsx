"use client";

import {Card, Image, Text, Badge, Button, Flex, Anchor} from "@mantine/core";
import NextImage from "next/image";
import InquiryModal from "@/app/components/InquiryModal/InquiryModalButton";
import {TravelPackage} from "@/app/shared/domain/travelPackage";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

interface CardBestSellersProps {
    card: TravelCountryPackage;
}

export default function CardBestSellers({card}: CardBestSellersProps) {
    return (
        <>
            <Flex
                justify="center"
                mt="md"
                gap="lg"
                direction={{
                    base: "column",
                    md: "row",
                }}
            >
                {/* Default ES: TBD once packages are final */}
                {card.countryCode === "ES" ? (
                    <>
                        {card.packages.map((travelPackage: TravelPackage) => {
                            return (
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    key={travelPackage.code}
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
                                    <Text fw={500} mt="md" mb="xs">
                                        {travelPackage.name}
                                    </Text>
                                    <Text size="sm" c="dimmed">
                                        {travelPackage.description}
                                    </Text>
                                    <Flex gap="xs" mt="lg">
                                        {travelPackage.travelDates.map((td, index) => {
                                            return (
                                                <Badge variant="light" leftSection="📅" key={index}>
                                                    {travelPackage.days}{" "}
                                                    days trip
                                                </Badge>
                                            );
                                        })}
                                    </Flex>
                                    <Flex align="flex-end">
                                        <Anchor fz="xs" c="black" underline="always">
                                            Learn more
                                        </Anchor>
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
                    </>
                ) : null}
            </Flex>
        </>
    );
}
