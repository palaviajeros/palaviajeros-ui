import { filterPackagesPerCountry } from "@/app/actions/dataLoader";
import Image from "next/image";
import { Box, Title, Container } from "@mantine/core";

interface PackageDetailsPageProps {
  packageCode: string;
}

export default async function PackageDetailsPage({ params }: { params: PackageDetailsPageProps }) {
  const travelPackage = await filterPackagesPerCountry(p => p.code === params.packageCode);

  return (
    <>
      {travelPackage.map(tp => {
        return (
          <Container key={tp.code} size="xl" p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}>
            <Title>{tp.name}</Title>
            {tp.itinerary.map(itinerary => {
              return (
                <div key={itinerary.dayNo}>
                  <h3>Day {itinerary.dayNo}</h3>
                  <ul>
                    {itinerary.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <Box pos="relative" w="100%" h={500}>
              <Image fill style={{ objectFit: "cover" }} src={travelPackage[0].imageUrls[1]} alt={params.packageCode} />
            </Box>
          </Container>
        );
      })}
    </>
  );
}
