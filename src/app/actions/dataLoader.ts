"use server";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import fs from "node:fs/promises";
import path from "node:path";
import { Tour } from "@/app/shared/domain/tour";

const baseFolder = path.join(process.cwd(), "public");
const packagesBasePath = path.join(baseFolder, "packages");
const travelPackagesJsonPath = path.join(packagesBasePath, "travelpackages.json");

const getImages = async (tour: Tour, country: TravelCountryPackage): Promise<string[]> => {
  const imagePath = path.join(packagesBasePath, country.countryCode, tour.code);

  try {
    const files: string[] = await fs.readdir(imagePath);
    return files.map(file => ["/packages", country.countryCode, tour.code, file].join("/"));
  } catch (err) {
    console.warn(`Skipping ${imagePath}: Folder or file does not exist`);
    //console.error(`Failed to read directory ${imagePath}:`, err);
    return [];
  }
};

async function populateImages(packagesByCountry: TravelCountryPackage[]): Promise<void> {
  const updatePromisesPackages = packagesByCountry.flatMap(country =>
    country.packages.map(async travelPackage => {
      travelPackage.imageUrls = await getImages(travelPackage, country);
    })
  );

  const updatePromiseTours = packagesByCountry.flatMap(country =>
    country.tours.map(async tour => {
      tour.imageUrls = await getImages(tour, country);
    })
  );

  await Promise.all(updatePromisesPackages.concat(updatePromiseTours));
}

export async function getCountryTravelPackages(): Promise<TravelCountryPackage[]> {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, { encoding: "utf8" });
    const packagesByCountry: TravelCountryPackage[] = JSON.parse(data);

    await populateImages(packagesByCountry);

    return packagesByCountry;
  } catch (err: any) {
    console.error("Error reading or parsing travel packages JSON:", err);
    return [];
  }
}

export async function findCountryPackage(predicate: (value: TravelCountryPackage, index: number, obj: TravelCountryPackage[]) => boolean) {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, {
      encoding: "utf8",
    });
    let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);
    const countryPackage = packagesByCountry.find(predicate);

    if (countryPackage) await populateImages([countryPackage]);

    return countryPackage;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export async function findPackagesPerCountry(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages.filter(predicate));
}

export async function findToursPerCountry(predicate: (value: Tour, index: number, obj: Tour[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.tours.filter(predicate));
}

export async function filterPackages(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages).filter(predicate) && ([] as TravelPackage[]);
}
