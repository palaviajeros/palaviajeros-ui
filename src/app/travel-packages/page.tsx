
import Image from "next/image";
import './styles.travel-packages.scss';
import {TravelPackageDto} from "@/app/shared/models/travelPackageDto";
import getTravelPackages from "@/app/lib/travelPackages";
import TravelPackage from "@/app/components/TravelPackage";

const TravelPackagesPage = () => {
    const packages: TravelPackageDto[] = getTravelPackages();

    // Todo: Add package component here, instead of 1 div, reference the component and pass the package details
    const packagesSection = packages.map(p => <TravelPackage key={p.packageId} travelPackage={p} />);
    return (<div>
        {packagesSection}
    </div>)
}
export default TravelPackagesPage;