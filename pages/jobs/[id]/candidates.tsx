import { JobsListResponseParams } from "@api-contracts/jobs/list";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

import DefaultAvatar from "../../../public/default-avatar.png";

export const DropdownCaret = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    className="w-3 h-3 ml-auto"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512">
    <path
      fill="currentColor"
      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
  </svg>
);
type CheckboxFieldType = {
  name: string;
  disabled: boolean;
  checked: boolean;
};

export const CheckboxField = ({ name, disabled, checked }: CheckboxFieldType) => (
  <div className="flex items-center h-1 px-6 py-4 overflow-hidden text-sm leading-5 text-gray-700 transition duration-300 ease-in-out rounded cursor-pointer text-ellipsis whitespace-nowrap hover:text-indigo-600">
    <label className="flex">
      <input className="mt-1" type="checkbox" checked={checked} disabled={disabled} />
      <span className="flex-grow mx-1">{name}</span>
    </label>
  </div>
);

export default function Jobs() {
  const { isLoading, data: jobs } = useQuery("jobs", getJobs);

  async function getJobs() {
    const response = await axios.get("/api/jobs/list");
    const responseData: JobsListResponseParams = response.data;
    return responseData;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <span className="sm:ml-3">
            <Link href="/jobs/new">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create a new job
              </button>
            </Link>
          </span>
        </div>
      </header>

      <div className="flex">
        <div className="flex flex-col justify-between h-full px-4 py-8 mt-6 overflow-y-auto bg-white shadow-md w-80">
          <div className="px-6 pt-4 pb-2">
            <p className="text-sm font-semibold text-indigo-500 text-uppercase">Applied Filters</p>
          </div>
          <hr className="my-2" />
          <ul className="relative px-1">
            <li className="relative">
              <a className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded cursor-pointer text-ellipsis whitespace-nowrap hover:text-blue-600 hover:bg-blue-50">
                <span className="text-uppercase">Filter By Field</span>
                <DropdownCaret />
              </a>

              <ul className="relative accordion-collapse collapse">
                <li className="relative">
                  <CheckboxField name="First Name" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Last Name" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Email" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Years of Experience" disabled={false} checked={false} />
                </li>
              </ul>
            </li>
          </ul>
          <hr className="my-2" />
          <ul className="relative px-1">
            <li className="relative" id="sidenavSecEx2">
              <a className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded cursor-pointer text-ellipsis whitespace-nowrap hover:text-blue-600 hover:bg-blue-50">
                <span className="text-uppercase">Filter By Stage</span>
                <DropdownCaret />
              </a>

              <ul className="relative accordion-collapse collapse">
                <li className="relative">
                  <CheckboxField name="Applied" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Assessment" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Hired" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Interview" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Offer" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Phone Screen" disabled={false} checked={false} />
                </li>
                <li className="relative">
                  <CheckboxField name="Sourced" disabled={false} checked={true} />
                </li>
              </ul>
            </li>
          </ul>
          <div className="absolute bottom-0 w-full text-center"></div>
        </div>
        <div className="w-full h-full p-4 m-8 overflow-y-auto">
          <div className="box-border w-9/12">
            <div className="mb-8">
              <div className="table clear-both">
                <h3 className="float-left mb-4 text-gray-700 uppercase">
                  <span>5 Candidates applied for the Laravel Developer job</span>
                </h3>
              </div>
              <div className="relative rounded">
                <div className="border-b border-solid">
                  <div className="mb-4">
                    <form className="mb-0">
                      <input
                        className="inline-flex w-9/12 p-2 mb-4 border border-gray-300 rounded-md in focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        id="text-query"
                        type="text"
                        name="q"
                        autoComplete="off"
                        autoFocus={true}
                        placeholder="Search for candidates..."
                      />
                      <input
                        className="px-1 py-2 mx-1 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm -4 mxitems-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="submit"
                        value="Search"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="flex items-center justify-start overflow-hidden bg-white border border-gray-300 rounded hover:bg-indigo-200"
              style={{ cursor: "auto" }}>
              <div className="relative flex-shrink-0 w-32 h-32">
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                  {/* <Image
                    className="absolute top-0 left-0 object-cover object-center w-full h-full transition duration-50"
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp"
                    alt="Placeholder Photo"
                    onError={() => {
                      setImageFallback(DefaultAvatar.src);
                    }}
                    width={100}
                    height={150}
                  /> */}
                  <img
                    alt="Placeholder Photo"
                    className="absolute top-0 left-0 object-cover object-center w-full h-full transition duration-50"
                    loading="lazy"
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/9.webp"
                    onError={(e) => (e.currentTarget.src = DefaultAvatar.src)}
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="overflow-hidden text-lg font-semibold text-gray-800 whitespace-no-wrap">
                  <a href="#">Sarah Richards</a>
                </h3>
                <p className="text-sm line-clamp-1">Sales Associate</p>
                <p className="text-sm text-gray-500 line-clamp-1 ">Account Executive · Sourced</p>
              </div>
            </div>
            <div
              className="flex items-center justify-start overflow-hidden bg-white border border-gray-300 rounded hover:bg-indigo-200"
              style={{ cursor: "auto" }}>
              <div className="relative flex-shrink-0 w-32 h-32">
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                  <img
                    alt="Placeholder Photo"
                    className="absolute top-0 left-0 object-cover object-center w-full h-full transition duration-50"
                    loading="lazy"
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                    onError={(e) => (e.currentTarget.src = DefaultAvatar.src)}
                  />
                </div>
              </div>

              <div className="p-4">
                <h3 className="overflow-hidden text-lg font-semibold text-gray-800 whitespace-no-wrap">
                  <a href="#">Kevin Space</a>
                </h3>
                <p className="text-sm line-clamp-1">Full Stack Developer</p>
                <p className="text-sm text-gray-500 line-clamp-1">Backend Developer · Sourced</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
