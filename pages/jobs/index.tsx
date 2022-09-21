import JobFilter from "components/JobFilter";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { dehydrate, useQuery } from "react-query";
import { getCountries, getJobsByCountry, queryClient } from "src/api";
import { Country, Job, JobOrderByInput } from "src/generated/graphql";
import JobCard from "components/jobs/JobCard";
import OrderFilter from "components/OrderFilter";
import Image from "next/image";
import Unicorn from "src/assets/unicorn.png";

export async function getServerSideProps(ctx: {
  query: { country: string | undefined; job: string | undefined };
}) {
  await queryClient.prefetchQuery(["countries"], () => getCountries());
  await queryClient.prefetchQuery(["jobsByCountry"], () =>
    getJobsByCountry({
      country: ctx.query.country || "united-states",
      job: ctx.query.job?.toLowerCase() || "",
      orderBy: JobOrderByInput.UpdatedAtDesc,
    })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Jobs() {
  const router = useRouter();
  const { country, job } = router.query;
  const countriesQuery = useQuery(["countries"], () => getCountries());
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [countryValue, setCountryValue] = useState("united-states");
  const [jobValue, setJobValue] = useState("");
  const countries = countriesQuery.data?.countries;
  const [sort, setSort] = useState<JobOrderByInput>(
    JobOrderByInput.UpdatedAtAsc
  );
  const [jobs, setJobs] = useState<Job[]>([]);

  const jobsByCountryQuery = useQuery(["jobsByCountry"], () =>
    getJobsByCountry({
      country: (selectedCountry?.slug as string) || countryValue,
      job: jobValue.toLowerCase(),
      orderBy: sort,
    })
  );

  useEffect(() => {
    if (countriesQuery.data) {
      const filtered =
        countries!.filter((data) => data.slug === country)[0] || countries![0];
      setSelectedCountry(filtered as Country);
      setJobValue(job ? String(job).toLowerCase() : "");
      setCountryValue(country ? (country as string) : "united-states");
    }
  }, [countriesQuery.data, country, countries, job]);

  useEffect(() => {
    setJobs((jobsByCountryQuery.data?.country?.jobs as Job[]) || []);
  }, [jobsByCountryQuery]);

  const filteredCountry =
    country === ""
      ? countries
      : countries?.filter((data) => {
          return data.name.toLowerCase().includes(countryValue.toLowerCase());
        });

  const searchJobs = () => {
    jobsByCountryQuery.refetch();
  };

  const onSort = (type: JobOrderByInput) => {
    setSort(type);
    jobsByCountryQuery.refetch();
  };

  return (
    <div className="w-full flex flex-col lg:items-start px-5 lg:px-20 py-5">
      <JobFilter
        jobValue={jobValue}
        setJobValue={setJobValue}
        country={selectedCountry}
        setCountry={setSelectedCountry}
        countryValue={countryValue}
        setCountryValue={setCountryValue}
        filteredCountry={filteredCountry as Country[]}
        onSubmit={searchJobs}
      />

      <div className="flex flex-col mt-5 lg:mt-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="font-semibold text-lg">
            {jobs?.length} Lowongan Kerja{" "}
            <span className="capitalize">{jobValue}</span> di{" "}
            {selectedCountry?.name}
          </p>
          <div className="flex flex-row items-center mt-3 lg:mt-0">
            <OrderFilter onSort={onSort} sort={sort} />
          </div>
        </div>
        {jobsByCountryQuery.isLoading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-lg font-semibold">Serving your order...</p>
          </div>
        ) : (
          <div className="w-full flex items-center mt-3 lg:mt-10">
            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="w-full my-10 flex flex-col items-center">
                <Image
                  alt="unicorn"
                  src={Unicorn}
                  width="250px"
                  height="250px"
                  objectFit="contain"
                />
                <p className="text-center w-full text-lg font-semibold">
                  Sorry, your dream job is empty right now. <br /> Please come
                  back later!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
