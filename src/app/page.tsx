import Services from "./components/Home/Services/Services";
import Header from "./components/Home/Header/Header";
import { Flex } from "@mantine/core";
import Subscribe from "@/app/components/Home/Subscribe/Subscribe";
import { Metadata } from "next";
import PackageSlider from "@/app/components/Home/PackageSlider/PackageSlider";

export const metadata: Metadata = {
  title: "Home | Palaviajeros Travel Corp"
};
export default function Home() {
  return (
    <Flex gap={{ base: "90px", sm: "140px", lg: "160px" }} direction={"column"} justify={"space-evenly"}>
      <Header />
      <PackageSlider noOfRenderedCards={3} title="Top Destinations" tagFilter="best-seller" />
      <PackageSlider noOfRenderedCards={3} title="Hot Deals" tagFilter="sale" />
      <PackageSlider noOfRenderedCards={3} title="Featured Packages" tagFilter="featured" />
      <Services />
      <Subscribe />
    </Flex>
  );
}
