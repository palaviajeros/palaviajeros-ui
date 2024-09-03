"use server";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import fs from "node:fs/promises";
import fsSync from "fs";

const travelPackagesJsonPath = "./public/packages/travelpackages.json";

const baseFolder = "./public";
const getImages = (fetchedPackages: TravelPackage, country: TravelCountryPackage): string[] => {
  let result: string[] = [];
  const imagePath = `/packages/${country.countryCode}/${fetchedPackages.code}/`;

  // Todo Andrei: Convert this read directory call to async
  try {
    let files: string[] = fsSync.readdirSync(`${baseFolder}${imagePath}`);
    files.forEach(file => {
      result.push(`${imagePath}${file}`);
    });
    return result;
  } catch (err) {
    // skip non existent directories
  }
  return [];
};

function populateImages(packagesByCountry: TravelCountryPackage[]) {
  packagesByCountry.forEach(country => country.packages.forEach(p => (p.imageUrls = getImages(p, country))));
}

export async function getCountryTravelPackages() {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, {
      encoding: "utf8",
    });
    let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);

    populateImages(packagesByCountry);

    return packagesByCountry;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function findCountryPackage(
  predicate: (value: TravelCountryPackage, index: number, obj: TravelCountryPackage[]) => boolean
) {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, {
      encoding: "utf8",
    });
    let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);
    const countryPackage = packagesByCountry.find(predicate);

    if (countryPackage) populateImages([countryPackage]);

    return countryPackage;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function findPackagesPerCountry(
  filterFunction: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean
) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages.filter(filterFunction));
}

export async function filterPackages(
  predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean
) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages).filter(predicate) && ([] as TravelPackage[]);
}
