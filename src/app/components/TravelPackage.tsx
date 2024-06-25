import React from "react";
import Image from "next/image";
import {TravelPackageDto} from "@/app/shared/models/travelPackageDto";

interface TravelPackageProps {
    travelPackage: TravelPackageDto
}

const TravelPackage = ({travelPackage}: TravelPackageProps) => {
    return (
        <div key={travelPackage.packageId}>
            <h2>{travelPackage.countryName}</h2>
            <h3>{travelPackage.packageName}</h3>
            {travelPackage.imageUrls.map((imageUrl) => (
                <Image key={`package-image-${imageUrl.split('.')[0]}`}
                       className='package-photo'
                       width={500}
                       height={500}
                       src={imageUrl} alt='image'></Image>))}
        </div>
    );
};

export default TravelPackage;
