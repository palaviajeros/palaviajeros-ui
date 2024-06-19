import {getTravelPackages} from "@/app/lib/travel-packages";

const TravelPackage = async () => {
  const packagesData = await getTravelPackages();
  return (<div>
    {packagesData.name} with type of {packagesData.typeOfHotDog}
  </div>)
}
export default TravelPackage;