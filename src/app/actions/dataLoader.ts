"use server";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import fs from "node:fs/promises";
import path from "node:path";
import { Tour } from "@/app/shared/domain/tour";
import { addDays, startOfToday } from "date-fns";

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

async function parseCountriesData(predicate?: (value: TravelCountryPackage, index: number, obj: TravelCountryPackage[]) => boolean) {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, { encoding: "utf8" });
    let packagesByCountry: TravelCountryPackage[] = JSON.parse(data);
    packagesByCountry = predicate ? packagesByCountry.filter(predicate!) : packagesByCountry;

    if (!packagesByCountry || packagesByCountry.length == 0) return [];

    await populateImages(packagesByCountry);
    return packagesByCountry;
  } catch (err: any) {
    console.error("Error reading or parsing travel packages JSON:", err);
    return [];
  }
}

function filterPastTravelDates(countryData: TravelCountryPackage[], dayThreshold: number) {
  return countryData.map(
    country =>
      ({
        ...country,
        packages: country.packages.map(
          p =>
            ({
              ...p,
              travelDates: p.travelDates.filter(d => addDays(d, dayThreshold) > startOfToday()),
            }) as TravelPackage
        ),
      }) as TravelCountryPackage
  );
}

function removePackagesWithNoTravelDates(countryData: TravelCountryPackage[]) {
  const dayThreshold = 1;
  const filteredCountryData = filterPastTravelDates(countryData, dayThreshold).map(
    country =>
      ({
        ...country,
        packages: country.packages.filter(p => p.isFlexible || (p.travelDates && p.travelDates.length > 0)),
      }) as TravelCountryPackage
  );
  return filteredCountryData;
}

export async function getCountryTravelPackages(retainExpiredDates: boolean = false): Promise<TravelCountryPackage[]> {
  const countryData = await parseCountriesData();
  return retainExpiredDates ? countryData : removePackagesWithNoTravelDates(countryData);
}

export async function findCountryPackage(predicate: (value: TravelCountryPackage, index: number, obj: TravelCountryPackage[]) => boolean) {
  const countriesData = await parseCountriesData();
  return countriesData.find(predicate);
}

export async function filterCountriesData(predicate: (value: TravelCountryPackage, index: number, obj: TravelCountryPackage[]) => boolean) {
  const countriesData = await getCountryTravelPackages();
  return countriesData.filter(predicate);
}

export async function filterPackagesPerCountry(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages.filter(predicate));
}

export async function filterToursPerCountry(predicate: (value: Tour, index: number, obj: Tour[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.tours.filter(predicate));
}

export async function filterPackages(predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages).filter(predicate) && ([] as TravelPackage[]);
}
