'use client';

import { useEffect, useState } from 'react';
import { Button, Link, Menu, Modal, Navbar } from 'react-daisyui';
import Logo from '../atoms/Logo/Logo';

export default function Header() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const toggleIsOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const logout = () => {
    localStorage.removeItem('access-token');
    setIsLoggedIn(false);
    setIsOpenModal(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');

    if (accessToken) {
      setIsLoggedIn(true);
    }

    setIsLoading(false);
  }, []);

  return (
    // <Drawer
    //   open={isOpen}
    //   end
    //   onClickOverlay={toggleIsOpen}
    //   side={
    //     <Menu className="p-4 w-full md:w-80 h-full text-base-content bg-white">
    //       <div className="pb-4 flex justify-end items-center cursor-pointer">
    //         <Button
    //           shape="square"
    //           color="ghost"
    //           className=""
    //           onClick={toggleIsOpen}
    //         >
    //           <VscClose className="w-7 h-7" />
    //         </Button>
    //       </div>
    //       <Menu.Item>
    //         <Link href="/login">로그인</Link>
    //       </Menu.Item>
    //     </Menu>
    //   }
    // >
    <Navbar className="w-full h-16 justify-between py-10">
      <div className="px-2 mx-2">
        <Link href="/main" className="hover:no-underline">
          <Logo />
        </Link>
      </div>
      {/* <Menu horizontal className="flex-none hidden lg:block"> */}
      <Menu horizontal>
        {!isLoading ? (
          !isLoggedIn ? (
            <Menu.Item>
              <Link href="/login" className="p-0">
                <Button>로그인</Button>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item onClick={() => setIsOpenModal(true)}>
              <div className="p-0">
                <Button>로그아웃</Button>
              </div>
            </Menu.Item>
          )
        ) : (
          <></>
        )}
      </Menu>
      {/* <div className="flex-none lg:hidden">
          <Button shape="square" color="ghost" onClick={toggleIsOpen}>
            <HamburgetMenu />
          </Button>
        </div> */}
      <Modal open={isOpenModal}>
        <Modal.Header className="font-bold">로그아웃</Modal.Header>
        <Modal.Body className="flex justify-center">
          로그아웃하시겠습니까?
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={() => setIsOpenModal(false)}>취소</Button>
          <Button onClick={logout}>확인</Button>
        </Modal.Actions>
      </Modal>
    </Navbar>
    // </Drawer>
  );
}

// const HamburgetMenu = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       className="inline-block w-6 h-6 stroke-current"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M4 6h16M4 12h16M4 18h16"
//       ></path>
//     </svg>
//   );
// };
