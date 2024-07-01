import React from "react";
import Image from "next/image";
import {
    TravelCountryPackages,
    DateRange, Services
} from "@/app/shared/models/travelPackageDto";
import {Carousel} from "@mantine/carousel";
import {Flex, Text, Button, Badge, NumberFormatter} from "@mantine/core";
import {IconCheck, IconX} from "@tabler/icons-react";

interface TravelPackageProps {
    travelPackage: TravelCountryPackages;
}

const TravelPackage = ({travelPackage}: TravelPackageProps) => {
    const formatDateRange = ({startDate, endDate}: DateRange) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short"
        };
        const startFormatted = start.toLocaleDateString("en-GB", options);
        const endFormatted = end.toLocaleDateString("en-GB", options);

        const year = start.getFullYear();

        return `${startFormatted} - ${endFormatted} ${year}`;
    };

    function getValueOfEnumService(service: Services) {
        return Object.entries(Services).find(([k, _]) => k === service)![1];
    }

    return (
        <>
            {travelPackage.packages.map((t, index) => {
                return (
                    <React.Fragment key={t.code}>
                        <Flex
                            gap={{lg: "xl"}}
                            mb={"xl"}
                            mt={"xl"}
                            direction={{
                                base: "column",
                                lg: index % 2 === 0 ? "row" : "row-reverse"
                            }}
                        >
                            <div style={{flex: 1}}>
                                <Carousel slideSize="100%" slideGap="md" align="center" loop>
                                    {t.imageUrls.map((img, index) => {
                                        return (
                                            <Carousel.Slide key={index}>
                                                <Image
                                                    className="package-photo"
                                                    layout="responsive"
                                                    width={16}
                                                    height={9}
                                                    src={img}
                                                    alt="image"
                                                />
                                            </Carousel.Slide>
                                        );
                                    })}
                                </Carousel>
                            </div>
                            <div style={{flex: 1}}>
                                <h3>{t.name}</h3>
                                <Flex gap={"sm"} wrap="wrap">
                                    {t.travelDates.map((d, index) => {
                                            return <Badge key={index} color={"red"}>{formatDateRange(d)}</Badge>;
                                        }
                                    )}
                                </Flex>
                                <div>
                                    <Flex gap={"lg"} mt={"md"}>
                                        <Flex direction="column">
                                            {t.inclusions.map((inclusion, index) => {
                                                return (
                                                    <Flex key={index} gap={"sm"}>
                                                        <IconCheck stroke={2}/>
                                                        <Text>{`${getValueOfEnumService(inclusion)}`}</Text>
                                                    </Flex>
                                                );
                                            })}
                                        </Flex>
                                        <Flex direction="column">
                                            {t.exclusions.map((exclusion, index) => {
                                                return (
                                                    <Flex key={index} gap={"sm"}>
                                                        <IconX stroke={2}/>
                                                        <Text>{`${(getValueOfEnumService(exclusion))}`}</Text>
                                                    </Flex>
                                                );
                                            })}
                                        </Flex>
                                    </Flex>
                                    {t.description.map((description) => {
                                        return (
                                            <p key={`description-${index}`}>
                                                {description}
                                            </p>
                                        );
                                    })}
                                    <Flex direction="row" align="center" gap={"sm"}>
                                        <Button>Reserve</Button>
                                        {/* eslint-disable-next-line react/jsx-no-undef */}
                                        <NumberFormatter prefix="$ " value={t.price} thousandSeparator
                                                         style={{fontWeight: "bold"}}/>
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
