import { Services } from "@/app/shared/domain/services";

export interface TravelPackage {
  code: string;
  name: string;
  isFlexible?: boolean;
  description: string[];
  inclusions: Services[];
  exclusions: Services[];
  days: number;
  travelDates: Date[];
  itinerary: DayPlan[];
  imageUrls: string[];
  price: number;
  salePrice?: number;
  tags?: string[];
}

export interface DayPlan {
  dayNo: number;
  activities: string[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
