import getTravelPackages, {TravelPackageDto} from "@/app/lib/travel-packages";
import Image from "next/image";
import './styles.travel-packages.scss';

const TravelPackage = () => {
    const packages: TravelPackageDto[] = getTravelPackages();

    // Todo: Add package component here, instead of 1 div, reference the component and pass the package details
    const packagesSection = packages.map(p => (
        <div key={p.packageId}>
            <h2>{p.countryName}</h2>
            <h3>{p.packageName}</h3>
            {p.imageUrls.map((imageUrl) => (
                <Image className='package-photo' width={500} height={500} objectFit={'contain'}
                       key={`package-image-${imageUrl.split('.')[0]}`} src={imageUrl} alt='image'></Image>))}
        </div>));
    return (<div>
        {packagesSection}
    </div>)
}
export default TravelPackage;