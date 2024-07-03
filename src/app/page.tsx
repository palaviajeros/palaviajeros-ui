import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import Bestsellers from "./components/Home/Bestsellers/Bestsellers";
import {Flex, Stack} from "@mantine/core";
import Subscribe from "@/app/components/Home/Subscribe/Subscribe";

export default function Home() {
    return (
        <Flex gap={"xl"} direction={"column"} justify={"space-evenly"}>
            <Header/>
            <Bestsellers/>
            <Services/>
            <Subscribe/>
        </Flex>
    );
}
