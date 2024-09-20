import React from "react";
import { Tour } from "@/app/shared/domain/tour";
import { TravelPackage } from "@/app/shared/domain/travelPackage";
import TravelPackageRow from "../TravelPackageRow/TravelPackageRow";

interface TravelPackageProps {
  packages: (TravelPackage | Tour)[];
}

const TravelPackagesList = ({ packages }: TravelPackageProps) => {
  return (
    <>
      {packages.map((t, index) => {
        return <TravelPackageRow key={t.code} tourPackage={t} index={index} />;
      })}
    </>
  );
};

export default TravelPackagesList;
