import React from "react";
import {
  Container,
  Group,
  ActionIcon,
  Text,
  Anchor,
  Image,
  Stack,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconMail,
  IconBrandFacebook,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import logo from "@/../public/palaviajeros_logo.png";
import classes from "@/app/components/Footer/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container mb={20} mt={10}>
        <Group justify="space-between" align="flex-start">
          <Anchor href="/">
            <Image src={logo.src} alt="logo" w={200} h={40} fit="contain" />
          </Anchor>
          <Stack pt={10} gap={0}>
            <Text
              c="dimmed"
              size="sm"
              ta={{ base: "start", sm: "end" }}
              maw={400}
            >
              2605 Entrata Condo, Filinvest, 2609 Civic Dr., Alabang,
              Muntinlupa, 1708 NCR, Philippines
            </Text>
            <Anchor
              href="https://wa.me/639178894426"
              target="_blank"
              c="dimmed"
              size="sm"
              ta={{ base: "start", sm: "end" }}
            >
              (+63) 917 889-4426
            </Anchor>
          </Stack>
        </Group>
      </Container>
      <Container>
        <Group justify="space-between" align="center">
          <Text c="dimmed" size="sm">
            © 2024 Pala Viajeros. All rights reserved.
          </Text>
          <Group gap={5} justify="flex-end" wrap="nowrap">
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://www.facebook.com/profile.php?id=61560636012290"
              target="_blank"
            >
              <IconBrandFacebook
                style={{ width: 24, height: 24 }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://www.instagram.com/palaviajeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <IconBrandInstagram
                style={{ width: 24, height: 24 }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://wa.me/639178894426"
              target="_blank"
            >
              <IconBrandWhatsapp
                style={{ width: 24, height: 24 }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="mailto:info@palaviajeros.com"
            >
              <IconMail style={{ width: 24, height: 24 }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </footer>
  );
}
