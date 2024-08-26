import React from "react";
import { Container, Flex, Group, ActionIcon, Text, Anchor, Image, Stack } from "@mantine/core";
import { IconBrandInstagram, IconMail, IconBrandFacebook, IconBrandWhatsapp } from "@tabler/icons-react";
import logo from "@/../public/palaviajeros_logo.png";
import classes from "@/app/components/Footer/Footer.module.scss";
import NextImage from "next/image";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container size="xl" p={{ base: "30px", sm: "50px", lg: "50px 70px" }}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" wrap="wrap" gap="xs">
          <Anchor href="/">
            <Image src={logo.src} component={NextImage} alt="logo" width={200} height={40} fit="contain" />
          </Anchor>
          <Flex direction="column" gap="xs">
            <Text c="dimmed" size="sm" maw={300} ta={{ base: "start", md: "end" }}>
              2605 Entrata Condo, Filinvest, 2609 Civic Dr., Alabang, Muntinlupa, 1708 NCR, Philippines
            </Text>
            <Anchor
              href="https://wa.me/639178894426"
              target="_blank"
              c="dimmed"
              size="sm"
              ta={{ base: "start", md: "end" }}
            >
              (+63) 917 889-4426
            </Anchor>
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          justify="space-between"
          align={{ md: "center" }}
          wrap="wrap"
          mt={10}
          gap={10}
        >
          <Text c="dimmed" size="sm">
            © 2024 Pala Viajeros. All rights reserved.
          </Text>
          <Group>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://www.facebook.com/profile.php?id=61560636012290"
              target="_blank"
            >
              <IconBrandFacebook style={{ width: 24, height: 24 }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://www.instagram.com/palaviajeros?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <IconBrandInstagram style={{ width: 24, height: 24 }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color="gray"
              variant="subtle"
              component="a"
              href="https://wa.me/639178894426"
              target="_blank"
            >
              <IconBrandWhatsapp style={{ width: 24, height: 24 }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle" component="a" href="mailto:info@palaviajeros.com">
              <IconMail style={{ width: 24, height: 24 }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Flex>
      </Container>
    </footer>
  );
}
