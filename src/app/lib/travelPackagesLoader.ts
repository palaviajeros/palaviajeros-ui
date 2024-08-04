import {TravelPackage} from "@/app/shared/domain/travelPackage";

import fs from "fs";
import {TravelCountryPackage} from "@/app/shared/domain/countryPackage";

const baseFolder = './public';
const getImages = (fetchedPackages: TravelPackage, country: TravelCountryPackage): string[] => {

    let result: string[] = [];
    const imagePath = `/packages/${country.countryCode}/${fetchedPackages.code}/`;

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

const getTravelPackages = (): TravelCountryPackage[] => {
    const data = fs.readFileSync('./public/packages/travelpackages.json', {encoding: 'utf8'});
    let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);

    packagesByCountry.forEach(country =>
        country.packages.forEach(p => p.imageUrls = getImages(p, country)));

    return packagesByCountry;
}

export default getTravelPackages;