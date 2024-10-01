"use client";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import classes from "./PackageCarousel.module.scss";
import TravelPackageCard from "@/app/components/TravelPackageCard/TravelPackageCard";
import { useMediaQuery } from "@mantine/hooks";

interface CardBestSellersProps {
  travelPackages: TravelPackage[];
  noOfRenderedCards: number;
}

export default function PackageCarousel({ travelPackages, noOfRenderedCards }: CardBestSellersProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const shouldShowNavigation = isMobile || travelPackages.length > noOfRenderedCards;

  return (
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
      withControls={shouldShowNavigation}
      withIndicators={shouldShowNavigation}
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
          <Carousel.Slide key={travelPackage.code}>
            <TravelPackageCard travelPackage={travelPackage} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
