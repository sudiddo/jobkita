import moment from "moment";
import Image from "next/image";
import React from "react";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { Job } from "src/generated/graphql";

interface Props {
  job: Job;
}

function JobCard({ job }: Props) {
  return (
    <div className="border rounded-lg p-3 w-full">
      {/* Card Header */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Image
            src={String(job.company?.logoUrl)}
            alt="company"
            width="30px"
            height="30px"
            objectFit="contain"
            className="rounded-md"
          />
          <p className="ml-3">{job.company?.name}</p>
        </div>
        <p>
          Posted{" "}
          <span className="font-semibold">
            {moment(job.postedAt).fromNow()}
          </span>
        </p>
      </div>
      {/* Card Body */}
      <div className="flex flex-col">
        <p className="font-semibold text-lg mt-3">{job.title}</p>
        <div className="flex flex-row items-center mt-3">
          <IoTimeOutline />
          <p className="ml-3">{job.commitment.title}</p>
        </div>
        <div className="flex flex-row items-center mt-1">
          <IoLocationOutline />
          <p className="ml-3">{job.cities![0].name ?? "-"}</p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex flex-row flex-wrap mt-3">
        {job.tags?.map((tag) => (
          <div
            key={tag.id}
            className="border rounded-md flex-shrink-0 py-1 px-2 mb-1 mr-1"
          >
            <p>{tag.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobCard;
