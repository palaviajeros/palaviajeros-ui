import CardBestSellers from "./CardBestSellers";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import { Title } from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.css";

export default function Bestsellers() {
  const packages: TravelCountryPackages[] = getTravelPackages();

  return (
    <>
      <Title
        ta={"center"}
        order={2}
        mt={{ base: "50px", lg: "70px" }}
        className={classes.title}
      >
        Top Destinations
      </Title>
      {packages.map((card) => {
        return <CardBestSellers key={card.countryCode} card={card} />;
      })}
    </>
  );
}