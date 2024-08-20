import React from "react";
import NextImage from "next/legacy/image";
import { Carousel } from "@mantine/carousel";
import {
  Flex,
  Badge,
  NumberFormatter,
  rem,
  Title,
  Text,
  Tooltip,
  Image,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
  IconX,
  IconCalendarPlus,
} from "@tabler/icons-react";
// import "./TravelPackage.scss";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModalButton";
import {
  formatDateRange,
  generateDateRange,
  getValueOfEnumService,
} from "@/app/util/Helpers";
import { findCountryPackage } from "@/app/actions/travelPackagesLoader";
import TravelPackage from "@/app/components/TravelPackage/TravelPackage";

interface CountryLandingPageProps {
  countryCode: string;
}

const CountryPackage = async ({
  params,
}: {
  params: CountryLandingPageProps;
}) => {
  const travelCountryPackage = await findCountryPackage(
    (cp) => cp.countryCode == params.countryCode
  );
  console.log(travelCountryPackage);
  if (!travelCountryPackage) {
    return <>no packages found</>;
  }
  return <TravelPackage travelPackage={travelCountryPackage} />;
};

export default CountryPackage;
