import {DateRange, Services} from "@/app/shared/models/travelPackageDto";

export function formatDateRange({startDate, endDate}: DateRange) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short"
    };
    const startFormatted = start.toLocaleDateString("en-GB", options);
    const endFormatted = end.toLocaleDateString("en-GB", options);

    const year = start.getFullYear();

    return `${startFormatted} - ${endFormatted} ${year}`;
}

export function getValueOfEnumService(service: Services) {
    return Object.entries(Services).find(([k, _]) => k === service)![1];
}