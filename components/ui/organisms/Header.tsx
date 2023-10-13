'use client';

import { useState } from 'react';
import { Button, Drawer, Link, Menu, Navbar } from 'react-daisyui';
import { VscClose } from 'react-icons/vsc';
import Logo from '../atoms/Logo/Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Drawer
      open={isOpen}
      end
      onClickOverlay={toggleIsOpen}
      side={
        <Menu className="p-4 w-full md:w-80 h-full text-base-content bg-white">
          <div className="pb-4 flex justify-end items-center cursor-pointer">
            <Button
              shape="square"
              color="ghost"
              className=""
              onClick={toggleIsOpen}
            >
              <VscClose className="w-7 h-7" />
            </Button>
          </div>
          <Menu.Item>
            <Link href="/my">내 정보</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/my/accounts">내 계좌</Link>
          </Menu.Item>
        </Menu>
      }
    >
      <Navbar className="w-full">
        <div className="flex-1 px-2 mx-2">
          <Logo />
        </div>
        <div className="flex-none hidden lg:block">
          <Menu horizontal>
            <Menu.Item>
              <Link href="/my/accounts">내 계좌</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/my">내 정보</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="flex-none lg:hidden">
          <Button shape="square" color="ghost" onClick={toggleIsOpen}>
            <HamburgetMenu />
          </Button>
        </div>
      </Navbar>
    </Drawer>
  );
}

const HamburgetMenu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="inline-block w-6 h-6 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  );
};
