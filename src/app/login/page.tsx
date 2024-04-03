'use client';

import Header from 'src/components/ui/organisms/Header';
import { Button } from 'react-daisyui';

export default function Login() {
  return (
    <>
      <Header hideMenu />
      <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
          <div className="font-bold text-2xl my-10">빠르게 시작하세요!</div>
          <Button
            onClick={async () => {
              const { Kakao } = window;

              await Kakao.Auth.authorize({
                redirectUri: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/kakao`,
              });
            }}
            className="bg-yellow-400 text-lg px-8 py-2 flex items-center h-fit"
          >
            <KakaoSvg />
            <p>카카오로 시작하기</p>
          </Button>
        </div>
      </div>
    </>
  );
}

const KakaoSvg = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#ic-logo-kakao_svg__a)">
        <path
          d="M9 1C4.03 1 0 4.185 0 8.113c0 2.554 1.707 4.8 4.27 6.054-.183.702-.682 2.553-.78 2.94-.123.489.181.483.377.352l3.465-2.353c.553.082 1.112.123 1.67.122 4.97 0 9.002-3.184 9.002-7.113 0-3.929-4.031-7.113-9.001-7.113"
          fill="#000"
        ></path>
      </g>
      <defs>
        <clipPath id="ic-logo-kakao_svg__a">
          <path fill="#fff" d="M0 0h18v18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
