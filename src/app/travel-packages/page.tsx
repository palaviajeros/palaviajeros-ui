import getTravelPackages, {TravelPackageDto} from "@/app/lib/travel-packages";

const TravelPackage = () => {
    const packages: TravelPackageDto[] = getTravelPackages();

    // Todo: Add package component here, instead of 1 div, reference the component and pass the package details
    const packagesSection = packages.map(p => (
        <div key={p.packageId}><h2>{p.countryName}</h2><h3>{p.packageName}</h3></div>));
    return (<div>
        {packagesSection}
    </div>)
}
export default TravelPackage;