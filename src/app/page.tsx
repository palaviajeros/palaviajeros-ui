import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import Bestsellers from "./components/Home/Bestsellers/Bestsellers";
import {Stack} from "@mantine/core";

export default function Home() {
    return (
        <Stack gap={"xl"}>
            <Header/>
            <Bestsellers/>
            <Services/>
        </Stack>
    );
}
