import React from "react";
import Image from "next/image";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import { Carousel } from "@mantine/carousel";
import { Flex, Text, Timeline, Button } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

interface TravelPackageProps {
  travelPackage: TravelCountryPackages;
}
interface DateRange {
  startDate: string;
  endDate: string;
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
          <React.Fragment key={index}>
            <h3>{t.packageName}</h3>
            <Flex gap={"xl"}>
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
            <h2 mb="md">Travel Plans</h2>
            <Timeline active={2} bulletSize={25} lineWidth={3} align="left">
              {t.itinerary.map((day, index) => {
                return (
                  <Timeline.Item title={`Day ${day.dayNo}`} key={index}>
                    {day.activities.map((activity, index) => {
                      return (
                        <Text size="xs" mt={4} key={index}>
                          • {activity}
                        </Text>
                      );
                    })}
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TravelPackage;
