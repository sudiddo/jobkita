import React from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import Starting from "src/assets/starting.png";

const Home = () => {
  return (
    <div className="flex flex-col pb-10 min-h-screen">
      <div className="bg-gradient-to-r from-blue to-green py-10">
        <h1 className="font-extrabold text-white text-5xl text-center">
          WUJUDKAN <br /> KARIR <br /> IMPIANMU!
        </h1>
      </div>
      <div className="flex flex-col items-center py-10">
        <p className="font-bold text-xl text-center">
          Jelajahi ribuan pilihan pekerjaan setiap bulan!
        </p>
        <div className="py-5 mt-5 flex flex-col lg:flex-row rounded-lg w-full px-10 lg:px-5">
          <div className="lg:mr-5 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-auto">
            <GrSearch />
            <input
              placeholder="Cari Lowongan"
              className="ml-2 bg-white w-full outline-none h-8 rounded-r-md"
            />
          </div>
          <div className="mt-3 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-auto">
            <GrLocation />
            <input
              placeholder="Lokasi"
              className="ml-2 bg-white w-full outline-none h-8 rounded-r-md"
            />
          </div>
          <div className="flex flex-col items-end mt-5">
            <button className="bg-green w-20 h-8 rounded-md mb-3">
              <p className="text-black font-medium text-lg">Cari</p>
            </button>
            <Link href="/post-job">
              <a>Looking for talent?</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start mx-5 border-t-[1px]">
        <Image src={Starting} alt="complete" objectFit="contain" />
        <div className="flex flex-col items-center flex-shrink-0 mt-10">
          <p className="text-2xl font-bold">130K+</p>
          <p className="text-lg font-semibold">Tech Jobs</p>
        </div>
        <div className="flex flex-col items-center my-5 flex-shrink-0">
          <p className="text-2xl font-bold">6,000,000</p>
          <p className="text-lg font-semibold">Matches Made</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">8M +</p>
          <p className="text-center text-lg font-semibold">Candidates</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
