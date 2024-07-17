import { DateRange, Services } from "@/app/shared/models/travelPackageDto";
import { getDate, format } from "date-fns";

export function formatDateRange({ startDate, endDate }: DateRange) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  const startFormatted = start.toLocaleDateString("en-GB", options);
  const endFormatted = end.toLocaleDateString("en-GB", options);

  const year = start.getFullYear();

  return `${startFormatted} ${year} - ${endFormatted} ${year}`;
}

// prettier-ignore
export function getDateDifference (dateString: string) {
    const [startDateString, endDateString] = dateString.split(' - ').map(date => date.trim());

    const startDate = getDate(format(new Date(startDateString),'MM.dd.yyyy'))
    const endDate = getDate(format(new Date(endDateString),'MM.dd.yyyy'))

    return endDate - startDate;
}

export function getValueOfEnumService(service: Services) {
  return Object.entries(Services).find(([k, _]) => k === service)![1];
}
