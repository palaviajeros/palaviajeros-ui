import React from "react";
import Image from "next/image";
import { TravelCountryPackages } from "@/app/shared/models/travelPackageDto";
import { Carousel } from "@mantine/carousel";

interface TravelPackageProps {
  travelPackage: TravelCountryPackages;
}

const TravelPackage = ({ travelPackage }: TravelPackageProps) => {
  return (
    <div>
      <h3>{travelPackage.packages[0].packageName}</h3>
      <Carousel slideSize="100%" slideGap="md" align="center" loop>
        {travelPackage.packages
          .flatMap((p) => p.imageUrls)
          .map((img, index) => {
            return (
              <Carousel.Slide key={index}>
                <Image
                  key={index}
                  className="package-photo"
                  layout="responsive"
                  width={16}
                  height={9}
                  src={img}
                  alt="image"
                />
              </Carousel.Slide>
            );
          })}
      </Carousel>
    </div>
  );
};

export default TravelPackage;
