import CardBestSellers from "./CardBestSellers";
import getCountryPackages from "@/app/lib/travelPackagesLoader";
import {Flex, Title} from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

export default function Bestsellers() {
    const packages: TravelCountryPackage[] = getCountryPackages();

    return (
        <Flex direction="column">
            <Title ta={"center"} order={2} className={classes.title}>
                Top Destinations
            </Title>
            {packages.map((card) => {
                return <CardBestSellers key={card.countryCode} card={card}/>;
            })}
        </Flex>
    );
}
