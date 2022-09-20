import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "src/assets/logo.png";

function Footer() {
  return (
    <footer className="mx-5 flex flex-row justify-between border-t-[1px] pt-10 pb-5">
      <div className="flex flex-col">
        <Link href="/">
          <a className="text-lg font-medium mb-5">About Us</a>
        </Link>
        <Link href="/">
          <a className="text-lg font-medium mb-5">Our Team</a>
        </Link>
        <Link href="/">
          <a className="text-lg font-medium mb-5">Careers</a>
        </Link>
        <Link href="/">
          <a className="text-lg font-medium mb-5">Pricing</a>
        </Link>
        <Link href="/">
          <a className="text-lg font-medium mb-5">Recruit Pro</a>
        </Link>
      </div>
      <div className="flex flex-col">
        <Image
          src={Logo}
          alt="logo"
          width={"200px"}
          height="80px"
          objectFit="contain"
        />
        <p className="text-right">PT Job Kita Interview</p>
      </div>
    </footer>
  );
}

export default Footer;
