import React, { Fragment } from "react";
import Image from "next/image";
import Logo from "src/assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

function Header() {
  return (
    <div className="bg-white h-12 lg:h-16 z-50 w-screen px-5 lg:px-10 flex flex-row items-center justify-between fixed shadow-md">
      <Link href={"/"}>
        <a>
          <Image
            src={Logo}
            alt="logo"
            width={"100px"}
            height="30px"
            objectFit="contain"
          />
        </a>
      </Link>
      <div className="fixed right-5 lg:hidden">
        <Menu as="div" className={"relative inline-block"}>
          <Menu.Button>
            <FiMenu size={24} />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={
                "bg-white absolute w-32 text-center right-0 flex flex-col border-black border rounded-md"
              }
            >
              <Menu.Item as={"div"} className="py-2">
                <Link href="/jobs">
                  <p>For Employees</p>
                </Link>
              </Menu.Item>
              <Menu.Item as={"div"} className="py-2">
                <Link href="/post-job">
                  <p>For Companies</p>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="hidden lg:flex flex-row">
        <Link href="/jobs">
          <p className="mr-10 text-lg font-semibold hover:opacity-75 text-black">
            For Employees
          </p>
        </Link>
        <Link href="/post-job">
          <p className="text-lg font-semibold hover:opacity-75 text-black">
            For Companies
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
