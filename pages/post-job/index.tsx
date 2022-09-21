import { Menu, Transition } from "@headlessui/react";
import Modal from "components/Modal";
import React, { Fragment, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { dehydrate, useMutation, useQuery } from "react-query";
import { getCommitments, queryClient, PostJob as PostJobAPI } from "src/api";
import { Commitment } from "src/generated/graphql";

type FormType = {
  applyUrl: string;
  companyName: string;
  description: string;
  email: string;
  locationNames: string;
  title: string;
};

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["commitments"], () => getCommitments());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function PostJob() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const commitmentQuery = useQuery(["commitments"], () => getCommitments());
  const [commitment, setCommitment] = React.useState<Commitment>(
    commitmentQuery.data?.commitments[0] as Commitment
  );
  const postJobMutation = useMutation(
    ["postJob"],
    (params: FormType & { commitmentId: string }) =>
      PostJobAPI({ ...params, commitmentId: commitment.id })
  );

  const onSubmit = async (data: FormType) => {
    postJobMutation
      .mutateAsync({
        ...data,
        commitmentId: commitment.id,
      })
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full px-5 py-10">
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className="flex flex-col">
        <p className="text-4xl font-bold mb-10">
          Hire candidates that want to help build your vision
        </p>
        <p className="text-xl mb-10">
          8 million startup-ready candidates from around the world, unique
          details you can&apos;t find anywhere else, and all the tools you need
          to hire - get everything set up in 10 minutes, for free.
        </p>
      </div>
      <div>
        <p className="text-xl font-semibold">Let&apos;s get started!</p>
        <form
          className="w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        >
          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Title</p>
            <input
              className="border h-10 px-3 rounded-md"
              defaultValue=""
              placeholder='Job title such as "Frontend Engineer"'
              {...register("title", { required: true })}
            />

            {errors.title && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Commitment</p>
            <Menu as="div" className={"relative inline-block w-full"}>
              <Menu.Button className={"w-full"}>
                <div className="border h-10 px-3 flex items-center rounded-md w-full text-left">
                  {commitment?.title}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={
                    "bg-white absolute w-full text-start right-0 flex flex-col border-black border rounded-md"
                  }
                >
                  {commitmentQuery.data?.commitments.map((commitment) => (
                    <Menu.Item
                      as={"div"}
                      onClick={() => setCommitment(commitment as Commitment)}
                      key={commitment.id}
                      className="py-2 w-full px-3"
                    >
                      <p>{commitment.title}</p>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Company Name</p>
            <input
              className="border h-10 px-3 rounded-md"
              defaultValue=""
              placeholder="Google"
              {...register("companyName", { required: true })}
            />

            {errors.companyName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Location</p>
            <input
              className="border h-10 px-3 rounded-md"
              defaultValue=""
              placeholder="Jakarta"
              {...register("locationNames", { required: true })}
            />

            {errors.locationNames && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Email</p>
            <input
              className="border h-10 px-3 rounded-md"
              defaultValue=""
              placeholder="john@doe.com"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Description</p>
            <textarea
              className="border h-40 p-3 rounded-md"
              defaultValue=""
              placeholder="Write the job description here"
              {...register("description", { required: true })}
            />

            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <p className="mb-2 font-semibold">Apply URL</p>
            <input
              className="border h-10 px-3 rounded-md"
              defaultValue=""
              placeholder="https://google.com/careers"
              {...register("applyUrl", { required: true })}
            />

            {errors.applyUrl && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <input
            className="mt-5 bg-blue text-white h-10 rounded-md"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default PostJob;
