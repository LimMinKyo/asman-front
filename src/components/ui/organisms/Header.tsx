'use client';

import { useEffect, useState } from 'react';
import { Button, Link, Menu, Modal, Navbar } from 'react-daisyui';
import Logo from '../atoms/Logo/Logo';
import { jwtUtils } from 'src/utils/jwt.utils';
import useMyProfile from 'src/hooks/queries/useMyProfile';
import useModal from 'src/hooks/useModal';

interface Props {
  hideMenu?: boolean;
}

export default function Header({ hideMenu }: Props) {
  const { data, isLoading } = useMyProfile();
  const { openModal } = useModal();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const toggleIsOpen = () => {
  //   setIsOpen((prev) => !prev);
  // };

  const openLogoutModal = () => {
    openModal({
      type: 'confirm',
      message: '로그아웃하시겠습니까?',
      onOk() {
        jwtUtils.removeAccessToken();
        setIsLoggedIn(false);
      },
    });
  };

  useEffect(() => {
    if (data?.ok) {
      setIsLoggedIn(true);
    }
  }, [data?.ok]);

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
    <Navbar className="w-full h-16 justify-between py-10 px-0">
      <div>
        <Link href="/main" className="hover:no-underline">
          <Logo />
        </Link>
      </div>
      {/* <Menu horizontal className="flex-none hidden lg:block"> */}
      <Menu horizontal className="p-0">
        {!hideMenu && !isLoading ? (
          !isLoggedIn ? (
            <Menu.Item>
              <Link href="/login" className="p-0">
                <Button>로그인</Button>
              </Link>
            </Menu.Item>
          ) : (
            <Menu.Item onClick={openLogoutModal}>
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
