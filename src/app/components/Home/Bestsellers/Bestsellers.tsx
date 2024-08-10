import CardBestSellers from "./CardBestSellers";
import {Flex, Title} from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";
import {findPackagesPerCountry} from "@/app/actions/travelPackagesLoader";
import {TravelPackage} from "@/app/shared/domain/travelPackage";

const NO_OF_PACKAGES: number = 3;
const BEST_SELLER_TAG = "best-seller";
export default async function Bestsellers() {
    const packages: TravelPackage[] = await findPackagesPerCountry(
        (p, i) => p.tags?.includes(BEST_SELLER_TAG) || false);

    return (
        <Flex direction="column">
            <Title ta={"center"} order={2} className={classes.title}>
                Top Destinations
            </Title>
            <CardBestSellers key="best-sellers" travelPackages={packages.slice(0, NO_OF_PACKAGES)}/>
        </Flex>
    );
}
