import { Combobox, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment } from "react";
import { GrLocation, GrSearch } from "react-icons/gr";
import { Country } from "src/generated/graphql";

interface Props {
  country: Country | undefined;
  setCountry: Dispatch<React.SetStateAction<Country | undefined>>;
  countryValue: string;
  setCountryValue: Dispatch<React.SetStateAction<string>>;
  jobValue: string;
  setJobValue: Dispatch<React.SetStateAction<string>>;
  filteredCountry: Country[];
  onSubmit: () => void;
}

function JobFilter({
  country,
  setCountry,
  filteredCountry,
  countryValue,
  setCountryValue,
  jobValue,
  setJobValue,
  onSubmit,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row justify-center">
      <div className="flex flex-col lg:flex-row rounded-lg">
        <div className="lg:mr-5 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-[400px]">
          <GrSearch />
          <input
            placeholder="Cari Lowongan"
            value={jobValue}
            onChange={(e) => setJobValue(e.target.value)}
            className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
          />
        </div>
        <div className="relative mt-3 lg:mt-0 flex flex-row items-center border border-black pl-2 rounded-md w-full lg:w-[400px]">
          <GrLocation />
          <Combobox value={country} onChange={setCountry}>
            <Combobox.Input
              displayValue={(country: Country) =>
                country ? country!.name : ""
              }
              onChange={(event) => setCountryValue(event.target.value)}
              className="ml-2 bg-white w-full outline-none h-8 lg:h-10 rounded-r-md"
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setCountryValue("")}
            >
              <Combobox.Options
                className={
                  "absolute z-10 bg-white max-h-[300px] overflow-scroll top-12 left-0 border w-full rounded-md"
                }
              >
                {filteredCountry?.length === 0 && countryValue !== "" ? (
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
      </div>
      <div className="flex flex-col items-end w-full lg:w-auto mr-20 mt-3 lg:mt-0">
        <button
          onClick={onSubmit}
          className="bg-yellow w-20 h-8 lg:h-10 rounded-md ml-5 hover:opacity-75 hover:scale-110 transform transition-all duration-300"
        >
          <p className="text-black font-semibold text-lg">Cari</p>
        </button>
      </div>
    </div>
  );
}

export default JobFilter;
