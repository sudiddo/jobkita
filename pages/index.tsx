import React, { useEffect, useState } from "react";
import Image from "next/image";
import Starting from "src/assets/starting.png";
import Finding from "src/assets/finding.png";
import { getCountries, queryClient } from "src/api";
import { dehydrate, useQuery } from "react-query";
import { Country } from "src/generated/graphql";
import { useRouter } from "next/router";
import JobFilter from "components/JobFilter";

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["jobs"], () => getCountries());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const router = useRouter();
  const countriesQuery = useQuery(["countries"], () => getCountries());
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [countryValue, setCountryValue] = useState("");
  const [jobValue, setJobValue] = useState("");
  const countries = countriesQuery.data?.countries;

  useEffect(() => {
    if (countriesQuery.data) {
      setSelectedCountry(countriesQuery.data.countries[0] as Country);
    }
  }, [countriesQuery.data]);

  const filteredCountry =
    countryValue === ""
      ? countries
      : countries?.filter((data) => {
          return data.name.toLowerCase().includes(countryValue.toLowerCase());
        });

  const goToJobs = () => {
    router.push({
      pathname: "/jobs",
      query:
        jobValue !== ""
          ? {
              country: selectedCountry?.slug,
              job: jobValue,
            }
          : {
              country: selectedCountry?.slug,
            },
    });
  };

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
        <div className="py-5 mt-5 lg:mt-20 px-10 lg:px-5 w-full">
          <JobFilter
            jobValue={jobValue}
            setJobValue={setJobValue}
            country={selectedCountry}
            setCountry={setSelectedCountry}
            countryValue={countryValue}
            setCountryValue={setCountryValue}
            filteredCountry={filteredCountry as Country[]}
            onSubmit={goToJobs}
          />
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
