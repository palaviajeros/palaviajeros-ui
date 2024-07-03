"use client";

import Link from "next/link";
import NextImage from "next/image";
import { Flex, Image as MantineImage } from "@mantine/core";
import { Group, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/app/components/Navbar/Navbar.module.scss";

const links = [
  { link: "/", label: "Home" },
  { link: "/travel-packages", label: "Packages" },
  { link: "/about", label: "About" },
];

const Navbar: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <nav className={classes.header}>
      <Flex
        className={classes.inner}
        justify={{
          sm: "space-between",
          xs: "center",
        }}
      >
        <a href={"/"}>
          <MantineImage
            component={NextImage}
            src="/palaviajeros_logo.png"
            alt=""
            width={250}
            height={40}
          />
        </a>
        <Group gap={5} visibleFrom="sm">
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          className={classes.burgermenu}
        />
        <>
          <Drawer
            opened={opened}
            onClose={toggle}
            position="top"
            ta="center"
            size="25%"
          >
            {items}
          </Drawer>
        </>
      </Flex>
    </nav>
  );
};

export default Navbar;
