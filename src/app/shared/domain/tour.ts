import { Services } from "@/app/shared/domain/services";
import { DayPlan } from "@/app/shared/domain/dayPlan";

export interface Tour {
  code: string;
  name: string;
  description: string[];
  inclusions: Services[];
  exclusions: Services[];
  days: number;
  itinerary: DayPlan[];
  imageUrls: string[];
  price: number;
  salePrice?: number;
  tags?: string[];
}
