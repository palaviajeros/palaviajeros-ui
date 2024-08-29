"use server";

import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { TravelCountryPackage } from "@/app/shared/domain/countryPackage";
import fs from "node:fs/promises";
import path from "node:path";

const travelPackagesJsonPath = path.join(process.cwd(), "public/packages/travelpackages.json");
const baseFolder = path.join(process.cwd(), "public");

const getImages = async (fetchedPackages: TravelPackage, country: TravelCountryPackage): Promise<string[]> => {
  const imagePath = path.join(baseFolder, "packages", country.countryCode, fetchedPackages.code);

  try {
    const files: string[] = await fs.readdir(imagePath);
    return files.map(file => path.join("/packages", country.countryCode, fetchedPackages.code, file));
  } catch (err) {
    console.error(`Failed to read directory ${imagePath}:`, err);
    return [];
  }
};

async function populateImages(packagesByCountry: TravelCountryPackage[]): Promise<void> {
  const updatePromises = packagesByCountry.flatMap(country =>
    country.packages.map(async travelPackage => {
      travelPackage.imageUrls = await getImages(travelPackage, country);
    })
  );

  await Promise.all(updatePromises);
}

export async function getCountryTravelPackages(): Promise<TravelCountryPackage[]> {
  try {
    const data = await fs.readFile(travelPackagesJsonPath, { encoding: "utf8" });
    const packagesByCountry: TravelCountryPackage[] = JSON.parse(data);

    await populateImages(packagesByCountry);

    return packagesByCountry;
  } catch (err) {
    console.error("Error reading or parsing travel packages JSON:", err);
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
  predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean
) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages.filter(predicate));
}

export async function filterPackages(
  predicate: (value: TravelPackage, index: number, obj: TravelPackage[]) => boolean
) {
  const packagesByCountry = await getCountryTravelPackages();
  return packagesByCountry.flatMap(cp => cp.packages).filter(predicate) && [];
}
