"use server";

import {TravelPackage} from "@/app/shared/domain/travelPackage";

const fs = require('node:fs/promises');
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

const travelPackagesJsonPath = './public/packages/travelpackages.json';

export async function getCountryTravelPackages() {
    try {
        const data = await fs.readFile(travelPackagesJsonPath, {encoding: 'utf8'});
        let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);

        packagesByCountry.forEach(country =>
            country.packages.forEach(p => p.imageUrls = getImages(p, country)));

        return packagesByCountry;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function findPackagesPerCountry(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
    const packagesByCountry = await getCountryTravelPackages();
    return packagesByCountry.flatMap(cp => cp.packages.filter(predicate));
}

export async function filterPackages(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
    const packagesByCountry = await getCountryTravelPackages();
    return packagesByCountry.flatMap(cp => cp.packages).filter(predicate) && [];
}