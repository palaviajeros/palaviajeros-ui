"use client";

import Link from "next/link";
import logo from "@/../public/palaviajeros_logo.png";
import { Flex, Image } from "@mantine/core";
import { Group, Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/app/components/Navbar/Navbar.module.scss";

const links = [
  { link: "/", label: "Home" },
  { link: "/travel-packages", label: "Packages" },
  { link: "/about", label: "About" }
];

const Navbar: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className={classes.header}>
      <Flex justify="space-between" align="center" w="100%">
        <Link href="/">
          <Image
            src={logo.src}
            alt="logo"
            w={{ base: "200px", xs: "250px" }}
            h={40}
            fit="contain"
          />
        </Link>
        <Group gap={5} visibleFrom="sm" className={classes.navBar}>
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          className={classes.burgerbutton}
        />
        <>
          <Drawer
            opened={opened}
            onClose={toggle}
            position="top"
            overlayProps={{ backgroundOpacity: 0.2 }}
            ta="center"
            size="25%"
            hiddenFrom="sm"
            className={classes.burgerMenu}
          >
            {items}
          </Drawer>
        </>
      </Flex>
    </nav>
  );
};

export default Navbar;
