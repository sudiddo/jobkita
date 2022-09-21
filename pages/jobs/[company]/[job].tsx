import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, useQuery } from "react-query";
import { getJobDetails, queryClient } from "src/api";

export async function getServerSideProps(ctx: {
  query: { company: string; job: string };
}) {
  const { company, job } = ctx.query;
  await queryClient.prefetchQuery(["jobDetails"], () =>
    getJobDetails({ company, job })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function JobDetails() {
  const router = useRouter();
  const { company, job } = router.query;
  const { data } = useQuery(["jobDetails"], () =>
    getJobDetails({ company: company as string, job: job as string })
  );

  return (
    <div className="p-5 lg:px-20 lg:py-10 relative w-full">
      {/* Header */}
      <div className="flex flex-row border-b-[1px] pb-5 lg:pb-10 justify-between">
        <div className="flex flex-row items-start">
          {data?.job?.company?.logoUrl && (
            <Image
              src={data?.job?.company?.logoUrl as string}
              alt="company-logo"
              width={"70px"}
              height="70px"
              objectFit="contain"
              className="rounded-md"
            />
          )}

          <div className="ml-3 flex flex-col">
            <p className="text-lg lg:text-xl font-semibold">
              {data?.job?.title}
            </p>
            <a
              href={(data?.job?.company?.websiteUrl as string) || ""}
              target="_blank"
              rel="noreferrer"
            >
              <p className="font-medium text-blue lg:text-lg">
                {data?.job?.company?.name}
              </p>
            </a>
          </div>
        </div>
        <div className="hidden flex-col lg:flex">
          <a
            href={(data?.job?.applyUrl as string) || ""}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            <p className="mb-5">
              Posted at{" "}
              <span className="font-semibold">
                {moment(data?.job?.postedAt).format("DD MMMM YYYY")}
              </span>
            </p>
            <button className="bg-blue rounded-md h-12 w-full">
              <p className="text-white font-semibold text-lg">Apply here!</p>
            </button>
          </a>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-col mt-5 border-b-[1px] pb-5 lg:hidden">
        <a
          href={(data?.job?.applyUrl as string) || ""}
          target="_blank"
          rel="noreferrer"
          className="w-full"
        >
          <p className="mb-5">
            Posted at{" "}
            <span className="font-semibold">
              {moment(data?.job?.postedAt).format("DD MMMM YYYY")}
            </span>
          </p>
          <button className="bg-blue rounded-md h-12 w-full">
            <p className="text-white font-semibold text-lg">Apply here!</p>
          </button>
        </a>
      </div>
      <div>
        <p className="font-semibold text-lg my-5 lg:my-10">Description</p>
        <p className="whitespace-pre-wrap">{data?.job?.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
