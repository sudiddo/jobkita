import React, { Fragment, useEffect, useState } from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import Starting from "src/assets/starting.png";
import Finding from "src/assets/finding.png";
import { getCountries, queryClient } from "src/api";
import { dehydrate, useQuery } from "react-query";
import { Country } from "src/generated/graphql";
import { Combobox, Transition } from "@headlessui/react";

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["jobs"], () => getCountries());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const countryQuery = useQuery(["countries"], () => getCountries());
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const countries = countryQuery.data?.countries;

  useEffect(() => {
    if (countryQuery.data) {
      setSelectedCountry(countryQuery.data.countries[0] as Country);
    }
  }, [countryQuery.data]);

  const filteredCountry =
    country === ""
      ? countries
      : countries?.filter((data) => {
          return data.name.toLowerCase().includes(country.toLowerCase());
        });

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
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
            />
          </div>
          <div className="relative mt-3 lg:mt-0 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-[500px]">
            <GrLocation />
            <Combobox value={selectedCountry} onChange={setSelectedCountry}>
              <Combobox.Input
                displayValue={(country: Country) =>
                  country ? country!.name : ""
                }
                onChange={(event) => setCountry(event.target.value)}
                className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
              />
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setCountry("")}
              >
                <Combobox.Options
                  className={
                    "absolute bg-white max-h-[300px] overflow-scroll top-12 left-0 border w-full rounded-md"
                  }
                >
                  {filteredCountry?.length === 0 && country !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredCountry?.map((country) => (
                      <Combobox.Option
                        key={country.id}
                        value={country}
                        className="hover:bg-blue hover:cursor-pointer hover:text-white p-2 rounded-md"
                      >
                        {country.name}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </Combobox>
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
            alt="starting"
            objectFit="contain"
            width={"300px"}
            height={"300px"}
          />
        </div>
        <div className="flex flex-col lg:flex-1 items-center flex-shrink-0 mt-10 lg:mt-0 lg:border-r-[1px]">
          <p className="text-2xl lg:text-4xl font-bold">130K+</p>
          <p className="text-lg lg:text-xl font-semibold">Tech Jobs</p>
        </div>
        <div className="flex flex-col lg:flex-1 items-center my-5 lg:my-0 flex-shrink-0 lg:border-r-[1px]">
          <p className="text-2xl lg:text-4xl font-bold">6,000,000</p>
          <p className="text-lg lg:text-xl font-semibold">Matches Made</p>
        </div>
        <div className="flex flex-col lg:flex-1 items-center">
          <p className="text-2xl lg:text-4xl font-bold">8M +</p>
          <p className="text-center text-lg lg:text-xl font-semibold">
            Candidates
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
