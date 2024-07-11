export interface TravelCountryPackages {
  countryCode: string;
  countryName: string;
  description: string;
  packages: TravelPackageDto[];
}

export interface TravelPackageDto {
  code: string;
  name: string;
  description: string[];
  inclusions: Services[];
  exclusions: Services[];
  travelDates: DateRange[];
  itinerary: DayPlan[];
  imageUrls: string[];
  price: number;
}

export interface DayPlan {
  dayNo: number;
  activities: string[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export enum Services {
  FLIGHT = "Flight",
  ACCOMMODATION = "Accommodation",
  MEALS = "Meals",
  TRANSFERS = "Transfers",
  TOURS = "Tours",
}
