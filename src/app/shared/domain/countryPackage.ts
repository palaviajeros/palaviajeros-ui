import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { Tour } from "@/app/shared/domain/tour";

export interface TravelCountryPackage {
  countryCode: string;
  countryName: string;
  description: string;
  packages: TravelPackage[];
  tours: Tour[];
}
