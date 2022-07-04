import { JobDetailResponseParams } from "@api-contracts/jobs/detail";
import { BriefcaseIcon, ShareIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

export default function JobDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, data: job } = useQuery("job", () => getJob(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  async function getJob(id: any) {
    const response = await axios.get("/api/jobs/" + id);
    const responseData: JobDetailResponseParams = response.data;
    return responseData;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Shell>
      <header className="flex flex-col items-center gap-4 my-5">
        <BriefcaseIcon className="w-20 h-20" />
        <h1 className="text-2xl">{job?.title}</h1>
        <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
          Remote
        </span>
        <p>United Kingdom &middot; Full Time</p>
        <div className="w-full border-t-2 border-gray-100"></div>
        <ul className="flex justify-center w-full gap-3 pb-3 border-b">
          <li>
            <a href="#" className="pb-3 text-indigo-700 border-b-2 border-indigo-700 border-solid ">
              Overview
            </a>
          </li>
          <li>
            <a href="#">Application</a>
          </li>
        </ul>
      </header>
      <main className="flex flex-col items-center gap-4">
        <div className="w-2/3">
          <div className="flex justify-between mb-4">
            <p className="font-medium text-gray-800">Description</p>
            <p>
              <Link href="#">
                <a className="text-indigo-700 font-medium">
                  Share this job
                  <ShareIcon className="inline-block w-4 h-4 ml-2" />
                </a>
              </Link>
            </p>
          </div>
          <h3 className="mb-4 text-base font-medium text-gray-900">Who we are Looking for</h3>
          <p className="text-gray-700">{job?.description}</p>
          <div className="flex justify-center my-3">
            <Link href={`/jobs/${job?.uid}/application-form`}>
              <a className="px-4 py-2 text-white bg-indigo-700 w-full inline-block rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center mt-4">
                Apply for this job
              </a>
            </Link>
          </div>
        </div>
      </main>
    </Shell>
  );
}
