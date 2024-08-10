import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import CardCarousel from "@/app/components/Home/CardCarousel/CardCarousel";
import {Flex} from "@mantine/core";
import Subscribe from "@/app/components/Home/Subscribe/Subscribe";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Home | Palaviajeros Travel Corp",
};
export default function Home() {
    return (
        <Flex
            gap={{base: "90px", sm: "140px", lg: "160px"}}
            direction={"column"}
            justify={"space-evenly"}
        >
            <Header/>
            <CardCarousel noOfCards={3} title="Top Destinations" tagFilter="best-seller"/>
            <CardCarousel noOfCards={3} title="Hot Deals" tagFilter="sale"/>
            <CardCarousel noOfCards={3} title="Featured Packages" tagFilter="featured"/>
            <Services/>
            <Subscribe/>
        </Flex>
    );
}
