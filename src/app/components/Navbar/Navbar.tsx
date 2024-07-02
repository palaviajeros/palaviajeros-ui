"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container, Group, Burger, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/travel-packages", label: "Packages" },
  { link: "/about", label: "About" },
  { link: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Image
          src="/palaviajeros_logo.png"
          alt="logo"
          width={200}
          height={100}
        />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Menu>
          <Menu.Target>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="xs"
              size="sm"
            />
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>
            <Menu.Item>{items}</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </nav>
  );
};

export default Navbar;
