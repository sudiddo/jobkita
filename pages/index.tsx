import React from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import Starting from "src/assets/starting.png";
import Finding from "src/assets/finding.png";

const Home = () => {
  return (
    <div className="flex flex-col pb-10 min-h-screen min-w-full">
      {/* Banner */}
      <div className="bg-gradient-to-r flex flex-row items-center justify-center from-blue to-green py-10 lg:py-14">
        <h1 className="font-extrabold text-white text-5xl lg:text-[80px] text-center">
          WUJUDKAN <br /> KARIR <br className="lg:hidden" /> IMPIANMU!
        </h1>
        <div className="hidden lg:block ml-20">
          <Image
            src={Finding}
            alt="finding"
            objectFit="contain"
            width={"400px"}
            height={"400px"}
          />
        </div>
      </div>
      {/* Search */}
      <div className="flex flex-col items-center py-10 lg:py-28">
        <p className="font-bold text-xl lg:text-3xl text-center">
          Jelajahi ribuan pilihan pekerjaan setiap bulan!
        </p>
        <div className="py-5 mt-5 lg:mt-20 flex flex-col lg:flex-row rounded-lg justify-center w-full px-10 lg:px-5">
          <div className="lg:mr-5 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-[500px]">
            <GrSearch />
            <input
              placeholder="Cari Lowongan"
              className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
            />
          </div>
          <div className="mt-3 lg:mt-0 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-[500px]">
            <GrLocation />
            <input
              placeholder="Lokasi"
              className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
            />
          </div>
          <button className="bg-green w-20 h-8 lg:h-10 rounded-md ml-5 hidden lg:block hover:opacity-75">
            <p className="text-black font-medium text-lg">Cari</p>
          </button>
        </div>
        <div className="flex flex-col items-end w-full mr-20 mt-5 lg:hidden">
          <button className="bg-green w-20 h-8 rounded-md mb-3 hover:opacity-75">
            <p className="text-black font-medium text-lg">Cari</p>
          </button>
          <Link href="/post-job">
            <a className="hover:opacity-75">Looking for talent?</a>
          </Link>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-start lg:justify-center mx-5 lg:mx-20 lg:pt-20 lg:pb-10 border-t-[1px]">
        <div className="lg:hidden">
          <Image
            src={Starting}
            alt="complete"
            objectFit="contain"
            width={"300px"}
            height={"300px"}
          />
        </div>
        <div className="flex flex-col lg:flex-1 items-center flex-shrink-0 mt-10 lg:mt-0 lg:border-r-[1px]">
          <p className="text-2xl font-bold">130K+</p>
          <p className="text-lg font-semibold">Tech Jobs</p>
        </div>
        <div className="flex flex-col lg:flex-1 items-center my-5 lg:my-0 flex-shrink-0 lg:border-r-[1px]">
          <p className="text-2xl font-bold">6,000,000</p>
          <p className="text-lg font-semibold">Matches Made</p>
        </div>
        <div className="flex flex-col lg:flex-1 items-center">
          <p className="text-2xl font-bold">8M +</p>
          <p className="text-center text-lg font-semibold">Candidates</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
