import CardBestSellers from "./CardBestSellers";
import {Flex, Title} from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";
import {findPackagesPerCountry} from "@/app/lib/travelPackagesLoader";
import {TravelPackage} from "@/app/shared/domain/travelPackage";

const NO_OF_PACKAGES: number = 3;
const BEST_SELLER_TAG = "best-seller";
export default function Bestsellers() {
    const packages: TravelPackage[] = findPackagesPerCountry(
        (p, i) => p.tags?.includes(BEST_SELLER_TAG) || false)
        .slice(0, NO_OF_PACKAGES);

    return (
        <Flex direction="column">
            <Title ta={"center"} order={2} className={classes.title}>
                Top Destinations
            </Title>
            <CardBestSellers key="best-sellers" travelPackages={packages}/>
        </Flex>
    );
}
