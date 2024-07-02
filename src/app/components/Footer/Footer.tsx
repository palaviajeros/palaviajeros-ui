import React from "react";
import {Container, Group, ActionIcon, rem} from "@mantine/core";
import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "@/app/components/Footer/Footer.module.scss";
import NextImage from 'next/image';
import {Image as MantineImage} from '@mantine/core';

export default function Footer() {
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <MantineImage component={NextImage} src="/palaviajeros_logo.png" alt="" width={250} height={40}/>
                <Group
                    gap={0}
                    className={classes.links}
                    justify="flex-end"
                    wrap="nowrap"
                >
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter
                            style={{width: 18, height: 18}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube
                            style={{width: 18, height: 18}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram
                            style={{width: 18, height: 18}}
                            stroke={1.5}
                        />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}
