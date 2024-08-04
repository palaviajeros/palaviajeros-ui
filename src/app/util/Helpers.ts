import {DateRange} from "@/app/shared/domain/travelPackage";
import {Services} from "@/app/shared/domain/services";
import {addDays, format, getDate} from "date-fns";

export function formatDateRange({startDate, endDate}: DateRange) {
    return `${format(new Date(startDate), "dd MMM yyyy")} - ${format(new Date(endDate), "dd MMM yyyy")}`;
}

export function generateDateRanges(dates: Date[], daysToAdd: number = 0) {
    return dates.map(date => {
        return generateDateRange(date, daysToAdd);
    });
}

export function generateDateRange(date: Date, daysToAdd: number = 0) {
    return {startDate: date, endDate: addDays(date, daysToAdd)} as DateRange;
}

export function getValueOfEnumService(service: Services) {
    return Object.entries(Services).find(([k, _]) => k === service)![1];
}
