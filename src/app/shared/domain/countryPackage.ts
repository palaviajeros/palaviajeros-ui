import {TravelPackage} from "@/app/shared/domain/travelPackage";

export interface TravelCountryPackage {
    countryCode: string;
    countryName: string;
    description: string;
    packages: TravelPackage[];
}