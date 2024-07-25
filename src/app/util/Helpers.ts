import { DateRange, Services } from "@/app/shared/models/travelPackageDto";
import { getDate, format } from "date-fns";

export function formatDateRange({ startDate, endDate }: DateRange) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return `${format(start, "dd MMM yyyy")} - ${format(end, "dd MMM yyyy")}`;
}

// prettier-ignore
export function getDateDifference (dateString: string ) {
    const [startDateString, endDateString] = dateString.split(' - ').map(date => date.trim());

    const startDate = getDate(new Date(startDateString))
    const endDate = getDate(new Date(endDateString))

    return endDate - startDate;
}

export function getValueOfEnumService(service: Services) {
  return Object.entries(Services).find(([k, _]) => k === service)![1];
}
