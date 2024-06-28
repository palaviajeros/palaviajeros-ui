"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Group, Burger, Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import classes from "@/app/components/Navbar/Navbar.module.scss";

const links = [
  { link: "/", label: "Home" },
  { link: "/travel-packages", label: "Packages" },
  { link: "/about", label: "About" },
  // { link: "/contact", label: "Contact" },
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState(links[0].link);
  const [opened, { toggle, close }] = useDisclosure(false);
  const isLargerThan500px = useMediaQuery("(min-width: 500px)"); //to close Drawer-nav on over 500px screen size

  useEffect(() => {
    if (isLargerThan500px) {
      close();
    }
  }, [isLargerThan500px, close]);

  const handleLinkClick = (link: string) => {
    setActive(link);
    close(); // Close the drawer
  };

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        setActive(link.link);
        handleLinkClick(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <nav className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image src="/palaviajeros_logo.png" alt="" width={200} height={100} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <>
          <Burger size="md" opened={opened} onClick={toggle} hiddenFrom="xs" />
          <Drawer
            opened={opened}
            onClose={close}
            title=""
            padding="md"
            size={200}
            position="right"
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
            closeButtonProps={{ icon: <IconX size={40} stroke={1.5} /> }}
          >
            {items}
          </Drawer>
        </>
      </Container>
    </nav>
  );
};

export default Navbar;
