import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import Bestsellers from "./components/Home/Bestsellers/Bestsellers";
import { Flex } from "@mantine/core";
import Subscribe from "@/app/components/Home/Subscribe/Subscribe";

export default function Home() {
  return (
    <Flex
      gap={{ base: "50px", lg: "70px" }}
      direction={"column"}
      justify={"space-evenly"}
    >
      <Header />
      <Bestsellers />
      <Services />
      <Subscribe />
    </Flex>
  );
}
