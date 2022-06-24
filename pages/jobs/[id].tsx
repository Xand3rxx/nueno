import { JobDetailResponseParams } from "@api-contracts/jobs/detail";
import { BriefcaseIcon } from "@heroicons/react/outline";
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

  // console.log(job);

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{job?.title} Job Details</h1>
        </div>
      </header>
      <main>
        <div className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
          <div className="lg:w-1/3">
            <div className="h-64 bg-cover lg:rounded-lg lg:h-full">
              <BriefcaseIcon />
            </div>
          </div>

          <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">{job?.title}</h2>
            <h3 className="text-[#5ba4a4] font-bold text-[12px]">{job?.Company?.name}</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{job?.description}</p>
            <div className="mt-8">
              <Link href="/jobs/new">
                <button className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
