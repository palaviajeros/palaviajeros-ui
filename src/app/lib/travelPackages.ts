import {TravelCountryPackages, TravelPackageDto} from "@/app/shared/models/travelPackageDto";

import fs from "fs";

const baseFolder = './public';
const getImages = (fetchedPackages: TravelPackageDto, country: TravelCountryPackages): string[] => {

    let result: string[] = [];
    const imagePath = `/packages/${country.countryCode}/${fetchedPackages.code.toLowerCase()}/`;

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

const getTravelPackages = (): TravelCountryPackages[] => {
    const data = fs.readFileSync('./public/packages/travelpackages.json', {encoding: 'utf8'});
    let packagesByCountry: TravelCountryPackages[] = JSON.parse(data);

    packagesByCountry.forEach(country =>
        country.packages.forEach(p => p.imageUrls = getImages(p, country)));

    return packagesByCountry;
}

export default getTravelPackages;