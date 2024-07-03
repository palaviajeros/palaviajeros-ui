import {Image, Container, Title, Button, Text, Flex} from "@mantine/core";
import image from "@/../public/images/header/image.svg";
import classes from "./Header.module.scss";
import React from "react";

export default function Header() {
    return (
        <Flex
            gap="md"
            align="center"
            justify="center"
            direction={{base: "column-reverse", xs: "row"}}
            className={classes.header_wrapper}
            mt={"xl"}
        >
            <div>
                <Title order={1} className={classes.title} fw={900}>
                    Buckle up!
                </Title>
                <Title mt="sm" order={2} c="yellow.6">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </Title>

                <Text mt="md" fw={500} c="gray.8" className={classes.text}>
                    Prepare for an adventure like never before! The Palaviajeros team is
                    preparing amazing itineraries for you. For now, fasten your
                    seatbelts as we taxi through the runway. ;)
                </Text>
                <Button mt={20} variant="filled" color="red" radius="md">
                    Book now
                </Button>
            </div>
            <div>
                <Image src={image.src}/>
            </div>
        </Flex>
    );
}
