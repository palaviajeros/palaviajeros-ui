export interface TravelPackageDto {
    countryCode: string,
    countryName: string,
    packageName: string,
    packageId: number,
    inclusions: Services[],
    exclusions: Services[],
    dates: DateRange[],
    itinerary: DayPlan[],
    imageUrls: string[],
}

export interface DayPlan {
    dayNo: number,
    activities: string[]
}

export interface DateRange {
    startDate: Date,
    endDate: Date,
}

export enum Services {
    FLIGHT,
    HOTEL,
    MEALS,
}