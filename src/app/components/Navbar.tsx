import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <Link href="/">Home</Link>
        <Link href="/travel-packages">Packages</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
