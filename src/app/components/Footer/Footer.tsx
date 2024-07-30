import React from "react";
import { Container, Group, ActionIcon, Text, Anchor } from "@mantine/core";
import {
  IconBrandInstagram,
  IconMail,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import classes from "@/app/components/Footer/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.groups} justify="flex-strat">
          <Text c="dimmed" size="sm">
            2605 Entrata Condo, Filinvest, 2609 Civic Dr., Alabang, Muntinlupa,
            1708 NCR, Philippines
          </Text>
          <Anchor
            href="mailto:info@palaviajeros.com"
            target="_blank"
            c="dimmed"
            size="sm"
          >
            info@palaviajeros.com
          </Anchor>
          <Anchor
            href="https://wa.me/639178894426"
            target="_blank"
            c="dimmed"
            size="sm"
          >
            (+63) 917 889-4426
          </Anchor>
        </Group>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://wa.me/639178894426"
            target="_blank"
          >
            <IconBrandWhatsapp style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconMail style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: 18, height: 18 }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandFacebook style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
