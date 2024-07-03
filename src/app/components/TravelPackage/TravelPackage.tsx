import React from "react";
import Image from "next/image";
import {
    TravelCountryPackages,
    DateRange, Services
} from "@/app/shared/models/travelPackageDto";
import {Carousel} from "@mantine/carousel";
import {Flex, Text, Button, Badge, NumberFormatter, rem} from "@mantine/core";
import {
    IconCheck, IconCircleArrowLeftFilled, IconCircleArrowRightFilled,
    IconX
} from "@tabler/icons-react";
import "./TravelPackage.scss";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModal";
import {formatDateRange, getValueOfEnumService} from "@/app/util/Helpers";

interface TravelPackageProps {
    travelPackage: TravelCountryPackages;
}

const TravelPackage = ({travelPackage}: TravelPackageProps) => {
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
                            <div className="carousel-container" style={{flex: 1}}>
                                <Carousel slideSize="100%" slideGap="lg" align="center" loop height="100%"
                                          nextControlIcon={<IconCircleArrowRightFilled
                                              style={{
                                                  width: rem(24),
                                                  height: rem(24),
                                                  color: "white"
                                              }}/>}
                                          previousControlIcon={<IconCircleArrowLeftFilled
                                              style={{
                                                  width: rem(24),
                                                  height: rem(24),
                                                  color: "white"
                                              }}/>}>
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
                                                        <IconCheck stroke={3}/>
                                                        <Text>{`${getValueOfEnumService(inclusion)}`}</Text>
                                                    </Flex>
                                                );
                                            })}
                                        </Flex>
                                        <Flex direction="column">
                                            {t.exclusions.map((exclusion, index) => {
                                                return (
                                                    <Flex key={index} gap={"sm"}>
                                                        <IconX stroke={3}/>
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
                                        <InquiryModalButton variant={"primary"} travelPackage={t}>
                                            Get a Quote
                                        </InquiryModalButton>
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
