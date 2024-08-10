import PackageSliderCard from "./PackageSliderCard";
import {Flex, Title} from "@mantine/core";
import classes from "@/app/components/Home/Services/Services.module.scss";
import {findPackagesPerCountry} from "@/app/actions/travelPackagesLoader";
import {TravelPackage} from "@/app/shared/domain/travelPackage";

const NO_OF_PACKAGES: number = 3;
const BEST_SELLER_TAG = "best-seller";

interface CardCarouselProps {
    noOfCards: number;
    tagFilter: string;
    title: string;
}

export default async function PackageSlider({noOfCards, tagFilter, title}: CardCarouselProps) {
    const packages: TravelPackage[] = await findPackagesPerCountry(
        (p, i) => p.tags?.includes(tagFilter) || false);

    return (
        <Flex direction="column">
            <Title ta={"center"} order={2} className={classes.title}>
                {title}
            </Title>
            <PackageSliderCard key="best-sellers" travelPackages={packages.slice(0, noOfCards)}/>
        </Flex>
    );
}
