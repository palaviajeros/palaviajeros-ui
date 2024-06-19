import getTravelPackages, {TravelPackageDto} from "@/app/lib/travel-packages";

const TravelPackage = () => {
  const packages: TravelPackageDto[] = getTravelPackages();
  const packagesSection = packages.map(p => (<div key={p.packageId}><h2>{p.countryName}</h2><h3>{p.packageName}</h3></div>));
  return (<div>
    {packagesSection}
  </div>)
}
export default TravelPackage;