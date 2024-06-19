interface TravelPackageDto {
  name: String,
  typeOfHotDog: String,
}

export async function getTravelPackages() {
  return {
      name: 'Tender Juicy',
      typeOfHotDog: 'Red Hotdog',
    } as TravelPackageDto;
}