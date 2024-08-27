"use client";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { Carousel } from "@mantine/carousel";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classes from "./PackageCarousel.module.scss";
import TravelPackageCard from "@/app/components/TravelPackageCard/TravelPackageCard";

interface CardBestSellersProps {
  travelPackages: TravelPackage[];
  noOfRenderedCards: number;
}

export default function PackageCarousel({
  travelPackages,
  noOfRenderedCards,
}: CardBestSellersProps) {
  return (
    <>
      <Carousel
        classNames={classes}
        containScroll="trimSnaps"
        loop
        mt="md"
        slideGap="md"
        align="start"
        slideSize={{
          base: "100%",
          sm: "50%",
          md: `${100 / Math.min(noOfRenderedCards, travelPackages.length)}%`,
        }}
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
              backgroundColor: "rgba(0, 0, 0, 1)",
            },
          },
        }}
      >
        {travelPackages.map((travelPackage: TravelPackage) => {
          return (
            <Carousel.Slide
              key={travelPackage.code}
              style={{ cursor: "pointer" }}
            >
              <TravelPackageCard travelPackage={travelPackage} />
            </Carousel.Slide>
          );
        })}
      </Carousel>
    </>
  );
}
