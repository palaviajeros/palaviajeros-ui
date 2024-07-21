import { Image, Container, Title, Button, Text, Flex } from "@mantine/core";
import image from "@/../public/images/header/image.svg";
import classes from "./Header.module.scss";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex
      gap="md"
      align="center"
      justify="center"
      direction={{ base: "column-reverse", xs: "row" }}
      className={classes.headerWrapper}
    >
      <div>
        <Title order={1} className={classes.title} fw={900}>
          Buckle up!
        </Title>
        <Title mt="sm" order={3} className={classes.subtitle}>
          Palaviajeros got your travel plans covered!
        </Title>

        <Text mt="sm" fw={500} c="gray.8" className={classes.text}>
          Prepare for an adventure like never before! The Palaviajeros team is
          preparing amazing itineraries for you. For now, fasten your seatbelts
          as we taxi through the runway. ;)
        </Text>
        <Link href="/travel-packages">
          <Button mt={20} variant="filled" color="red" radius="md">
            Book now
          </Button>
        </Link>
      </div>
      <div>
        <Image src={image.src} alt="header-image" />
      </div>
    </Flex>
  );
}
