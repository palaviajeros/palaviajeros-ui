import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import Bestsellers from "./components/Home/Bestsellers/Bestsellers";
import { Flex } from "@mantine/core";
import Subscribe from "@/app/components/Home/Subscribe/Subscribe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Palaviajeros Travel Corp",
};
export default function Home() {
  return (
    <Flex
      gap={{ base: "90px", sm: "140px", lg: "160px" }}
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
