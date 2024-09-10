import { Tour } from "@/app/shared/domain/tour";

export interface TravelPackage extends Tour {
  isFlexible?: boolean;
  travelDates: Date[];
}
