import React from "react";
import Image from "next/image";
import {
  TravelCountryPackages,
  DateRange
} from "@/app/shared/models/travelPackageDto";
import { Carousel } from "@mantine/carousel";
import { Flex, Text, Timeline, Button } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface TravelPackageProps {
  travelPackage: TravelCountryPackages;
}

const TravelPackage = ({ travelPackage }: TravelPackageProps) => {
  const formatDateRange = ({ startDate, endDate }: DateRange) => {
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

  return (
    <>
      {travelPackage.packages.map((t, index) => {
        return (
          <React.Fragment key={t.packageId}>
            <Flex
              gap={{ lg: "xl" }}
              mb={"xl"}
              mt={"xl"}
              direction={{
                base: "column",
                lg: index % 2 === 0 ? "row" : "row-reverse"
              }}
            >
              <div style={{ flex: 1 }}>
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
              <div style={{ flex: 1 }}>
                <h3>{t.packageName}</h3>
                <Text>
                  <b>Dates:</b> {formatDateRange(t.dates[0])}
                </Text>
                <div>
                  <Flex gap={"lg"} mt={"md"}>
                    <Text>
                      {t.inclusions.map((inclusion, index) => {
                        return (
                          <Flex key={index}>
                            <IconCheck stroke={2} />
                            <Text>{inclusion}</Text>
                          </Flex>
                        );
                      })}
                    </Text>
                    <Text>
                      {t.exclusions.map((exclusion, index) => {
                        return (
                          <Flex key={index}>
                            <IconX stroke={2} />
                            <Text>{exclusion}</Text>
                          </Flex>
                        );
                      })}
                    </Text>
                  </Flex>
                  <p>{t.description}</p>
                  <Button>Reserve</Button>
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
