export interface TravelCountryPackages {
    countryCode: string,
    countryName: string,
    description: string,
    packages: TravelPackageDto[],
}

export interface TravelPackageDto {
    packageId: string,
    packageName: string,
    description: string,
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
    FLIGHT = 'Flight',
    ACCOMMODATION = 'Accommodation',
    MEALS = 'Meals',
    TRANSFERS = 'Transfers',
}