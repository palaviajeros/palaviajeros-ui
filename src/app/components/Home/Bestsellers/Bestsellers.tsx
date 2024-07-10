import CardBestSellers from "./CardBestSellers";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import { Flex, Title } from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";

export default function Bestsellers() {
  const packages: TravelCountryPackages[] = getTravelPackages();

  return (
    <Flex direction="column">
      <Title ta={"center"} order={2} className={classes.title}>
        Top Destinations
      </Title>
      {packages.map((card) => {
        return <CardBestSellers key={card.countryCode} card={card} />;
      })}
    </Flex>
  );
}
