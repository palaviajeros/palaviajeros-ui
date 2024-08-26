import PackageCarousel from "./PackageCarousel";
import { Flex, Title } from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";
import { findPackagesPerCountry } from "@/app/actions/travelPackagesLoader";
import { TravelPackage } from "@/app/shared/domain/travelPackage";

interface CardCarouselProps {
  noOfRenderedCards: number;
  tagFilter: string;
  title: string;
}

export default async function PackageCarouselContainer({
  noOfRenderedCards,
  tagFilter,
  title,
}: CardCarouselProps) {
  const packages: TravelPackage[] = await findPackagesPerCountry(
    (p, _) => p.tags?.includes(tagFilter) || false,
  );
  return (
    <Flex direction="column">
      <Title ta={"center"} order={2} className={classes.title}>
        {title}
      </Title>
      <PackageCarousel
        key="best-sellers"
        travelPackages={packages}
        noOfRenderedCards={noOfRenderedCards}
      />
    </Flex>
  );
}
