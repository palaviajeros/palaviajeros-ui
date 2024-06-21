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

const getImages = (fetchedPackages: TravelPackageDto): string[] => {
    const baseFolder = './public';
    const fs = require('fs');
    let result: string[] = [];
    const imagePath = `/packages/${fetchedPackages.countryCode}/${fetchedPackages.packageName.toLowerCase()}/`;

    try {
        let files: string[] = fs.readdirSync(`${baseFolder}${imagePath}`);
        files.forEach(file => {
            result.push(`${imagePath}${file}`)
        });
        return result;
    } catch (err) {
        // skip non existent directories
    }
    return [];
};

const getTravelPackages = (): TravelPackageDto[] => {

    let fetchedPackages
        : TravelPackageDto[] = [
        {
            countryCode: 'PH',
            countryName: 'Philippines',
            packageName: 'Boracay',
            packageId: 1,
            inclusions: [Services.FLIGHT, Services.HOTEL],
            exclusions: [Services.MEALS],
            imageUrls: [],
            dates: [
                {
                    startDate: new Date('2024-07-01'),
                    endDate: new Date('2024-07-08'),
                }
            ],
            itinerary: [
                {
                    dayNo: 0,
                    activities: ['swimming', 'bungee jumping']
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
            imageUrls: [],
            dates: [
                {
                    startDate: new Date('2024-07-01'),
                    endDate: new Date('2024-07-08'),
                },
                {
                    startDate: new Date('2024-08-01'),
                    endDate: new Date('2024-08-08'),
                }
            ],
            itinerary: [
                {
                    dayNo: 0,
                    activities: ['swimming', 'bungee jumping']
                }
            ]
        }
    ];

    fetchedPackages.forEach(p => p.imageUrls = getImages(p));
    return fetchedPackages;
}

export default getTravelPackages;