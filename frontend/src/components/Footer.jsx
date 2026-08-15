import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="sm:h-screen h-full  px-3 pt-18 sm:px-20">
      <div className="h-full rounded-t-3xl bg-amber-50 pt-4">
        <div className="flex h-full flex-col justify-center gap-4 items-center">
          {/* Top Section */}
          <div className=" w-full h-7/12">
            <div className="mx-auto max-w-7xl sm:pt-10">
              <div className="text-center max-sm:p-4 ">
                <h2 className="text-2xl font-extrabold text-gray-900 sm:text-5xl">
                  Turn ideas into presentations.
                </h2>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-5 text-gray-500 sm:mt-4 sm:max-w-sm sm:text-base sm:leading-normal">
                  From a simple idea to a polished presentation — SlidXai does
                  the heavy lifting.
                </p>

                <Link
                  to="/login"
                  className="mt-5 inline-block rounded-full border border-indigo-600 px-8 py-2.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white sm:mt-8 sm:px-12 sm:py-3"
                >
                  Get Started
                </Link>
              </div>

              <div className=" border-t-2 border-gray-200 pt-4 text-center sm:mt-16  ">
                <p className="text-[10px] leading-4  text-gray-500 sm:text-base sm:leading-normal">
                  © 2026 SlidXai. All rights reserved.
                  <span className="mx-1 sm:inline block">
                    Designed & developed by Himanshu.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Large SlidXai */}
          <div
            className="flex w-full items-end justify-center 
          overflow-clip bg-indigo-950 h-5/12 sm:items-center "
          >
            <h1 className="whitespace-nowrap text-[92px] font-extrabold leading-none sm:text-[300px]">
              <span className="text-white">Slid</span>

              <span className="bg-linear-to-b from-[#22D3EE] via-[#306FF7] to-[#5A11D8] bg-clip-text text-transparent">
                X
              </span>

              <span className="bg-linear-to-b from-[#E469F7] via-[#9948E4] to-[#4C45DF] bg-clip-text text-transparent">
                ai
              </span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
