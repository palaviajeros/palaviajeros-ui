import { Box, Title, Button, Text } from "@mantine/core";
import image from "@/../public/images/header/header-1.jpg";
import classes from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div className={classes.headerWrapper}>
      <Box pos="relative" h="100vh" className={classes.headerImageWrapper}>
        <Image src={image} alt="Header Image" fill style={{ objectFit: "cover" }} priority />
      </Box>
      <div className={classes.headerContent}>
        <Title order={1} className={classes.title}>
          Hello Fellow Palaviajero!
        </Title>
        <Title mt="sm" order={3} className={classes.subtitle}>
          An adventure of a lifetime awaits you!
        </Title>

        <Text my="sm" fw={500} className={classes.text} maw={{ base: "500px", lg: "700px" }}>
          Palaviajeros offers a variety of travel styles to accommodate different types of travelers from bespoke to organized group tours.
          Every tour includes personalized group recommendations from our seasoned travelers. Just let us know what you’re looking for and
          we will help you!
        </Text>
        <Link href="/travel-packages">
          <Button variant="filled" radius="md" className={classes.headerButton}>
            Explore now
          </Button>
        </Link>
      </div>
    </div>
  );
}
