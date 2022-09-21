import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { JobOrderByInput } from "src/generated/graphql";

interface Props {
  sort: JobOrderByInput;
  onSort: (sort: JobOrderByInput) => void;
}

function OrderFilter({ sort, onSort }: Props) {
  return (
    <>
      <p>Sort By</p>
      <Menu as="div" className={"relative inline-block ml-2"}>
        <Menu.Button
          className={"border border-black rounded-md w-[120px] h-[30px]"}
        >
          <p className="capitalize">
            {sort === JobOrderByInput.UpdatedAtAsc ? "Oldest" : "Newest"}
          </p>
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
              "bg-white absolute w-32 text-center right-0 flex flex-col border-black border rounded-md"
            }
          >
            <Menu.Item
              as={"div"}
              onClick={() => onSort(JobOrderByInput.UpdatedAtAsc)}
              className="py-2 hover:bg-green hover:cursor-pointer"
            >
              <p>Oldest</p>
            </Menu.Item>
            <Menu.Item
              as={"div"}
              onClick={() => onSort(JobOrderByInput.UpdatedAtDesc)}
              className="py-2 hover:bg-green hover:cursor-pointer"
            >
              <p>Newest</p>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default OrderFilter;
