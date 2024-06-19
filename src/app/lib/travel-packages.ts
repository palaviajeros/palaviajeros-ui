interface TravelPackageDto {
    countryCode: String,
    countryName: String,
    packageName: String,
    packageId: number,
    inclusions: Services[],
    exclusions: Services[],
    dates: DateRange[]
}

interface DateRange {
    startDate: Date,
    endDate: Date,
}

enum Services {
    FLIGHT,
    HOTEL,
    MEALS,
}

export async function getTravelPackages() {
    const packages: Array<TravelPackageDto> = [
        {
            countryCode: 'PH',
            countryName: 'Philippines',
            packageName: 'Boracay',
            packageId: 1,
            inclusions: [Services.FLIGHT, Services.HOTEL],
            exclusions: [Services.MEALS],
            dates: [
                {
                    startDate: new Date('2024-07-01'),
                    endDate: new Date('2024-07-08'),
                }
            ]
        },
        {
            countryCode: 'ES',
            countryName: 'Spain',
            packageName: 'Barcelona',
            packageId: 2,
            inclusions: [Services.FLIGHT, Services.HOTEL],
            exclusions: [Services.MEALS],
            dates: [
                {
                    startDate: new Date('2024-07-01'),
                    endDate: new Date('2024-07-08'),
                },
                {
                    startDate: new Date('2024-08-01'),
                    endDate: new Date('2024-08-08'),
                }
            ]
        }
    ];

    return packages;
}