import './styles.travel-packages.scss';
import {TravelCountryPackages} from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import TravelPackage from "@/app/components/TravelPackage";

const TravelPackagesPage = () => {
    const packages: TravelCountryPackages[] = getTravelPackages();

    // Todo: Add package component here, instead of 1 div, reference the component and pass the package details
    const packagesSection = packages
        .flatMap(c => c.packages)
        .map(p => <TravelPackage key={p.packageId} travelPackage={p}/>);

    return (<div>
        {packagesSection}
    </div>)
}
export default TravelPackagesPage;