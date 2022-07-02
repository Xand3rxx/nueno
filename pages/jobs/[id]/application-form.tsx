import { ApplicationFormsCreateRequestParams } from "@api-contracts/application-forms/create";
import { FieldCreateResponseParams } from "@api-contracts/application-forms/fields";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState, useEffect } from "react";

import { asStringOrUndefined } from "@helpers/type-safety";

import Shell from "@components/Shell";

export default function JobsNew() {
  const router = useRouter();
  const jobUid = asStringOrUndefined(router.query.id);
  const [fields, setField] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [required, setRequired] = useState(false);

  // Fix useRouter() undefined on query in first render
  useEffect(() => {
    if (router.asPath !== router.route) {
      getJobApplicationFormFields();
    }
  }, [router.isReady]);

  /**
   * @description Get the value of the selected field type.
   * @param value: string
   *
   * @return label: string
   */
  const typeValue = (value: string) => {
    setType(value);
  };

  /**
   * @description Get the value of the selected field requirement.
   * @param value: string
   *
   * @return label: string
   */
  const requiredValue = (value: string) => {
    if (value == "true") {
      setRequired(true);
    } else {
      setRequired(false);
    }
  };

  /**
   * @description Get the fields associated with a job appplication form.
   *
   * @return fields: array
   */
  async function getJobApplicationFormFields() {
    const response = await axios.get(`/api/application-forms/field-list/${jobUid}`);
    const responseData: FieldCreateResponseParams = response.data;
    setField(responseData as any);
    return responseData;
  }

  /**
   * @description Delete a job application form input field.
   *
   * @return response: number
   */
  async function deleteField(fieldId: number, fieldLabel: string) {
    if (confirm("Are you sure you want to delete this field from your form?")) {
      const response = await axios.delete(`/api/application-forms/delete-field/${fieldId}`);
      if (response.statusText == "OK") {
        getJobApplicationFormFields();
        alert(`${fieldLabel} field was deleted sucessfully!`);
      }
    } else {
      return;
    }
  }

  /**
   * @description Validate form inputs on submit.
   *
   * @return response: boolean
   */
  function validateForm() {
    const label = document.getElementById("label") as HTMLInputElement;
    const type = document.getElementById("type") as HTMLInputElement;
    const required = document.getElementById("required") as HTMLInputElement;
    let response = true as boolean;

    if (!type.value) {
      alert("Please select the field type.");
      response = false;
    }

    if (!label.value) {
      alert("Please enter a field label.");
      response = false;
    }

    if (!required.value) {
      alert("Please select the field requirement.");
      response = false;
    }

    return response;
  }

  /**
   * @description Submit a user created form input field.
   *
   * @return response: number
   */
  async function submit(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!jobUid) return;

    const data = { label, type, required };

    if (validateForm()) {
      try {
        const requestParams: ApplicationFormsCreateRequestParams = {
          jobUid,
          fields: [data as any],
        };
        const response = await axios.post("/api/application-forms/create", requestParams);

        if (response.data.jobUid == jobUid) {
          // Reset the form
          const resetForm = document.getElementById("create-field") as HTMLFormElement;
          resetForm.reset();

          // Update the form field list
          getJobApplicationFormFields();

          // Display success message
          alert("Field was added sucessfully!");
        }
        // router.push({ pathname: "/jobs/" });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Shell>
      <header>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 md:px-0 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Application form</h1>
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Publish
            </button>
          </span>
        </div>
      </header>
      <main>
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-2 bg-white sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Fill up the form with the correct information
                  </h2>
                  <small className="mt-n4">
                    Asterisk (<span className="text-red-600">*</span>) next to a form control&apos;s label
                    indicates that such field is
                    <strong> &quot;required&quot;</strong>.
                  </small>
                  {fields.length ? (
                    <form id="create-field">
                      <div className="flex items-center">
                        <div className="flex-auto p-2 bg-gray-100 rounded">
                          {fields.map((field: FieldCreateResponseParams) => {
                            return (
                              <>
                                {field.type == "SHORT_TEXT" && (
                                  <>
                                    <p className="mb-1 text-sm font-semibold text-md">
                                      {field.required == true ? <span className="text-red-600">*</span> : ""}{" "}
                                      {field.label}
                                    </p>
                                    <input
                                      id={field.label}
                                      name={field.label}
                                      type="text"
                                      onChange={(e) => setLabel(e.target.value)}
                                      required={field.required == true ? true : false}
                                      className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      autoComplete="off"
                                    />
                                  </>
                                )}
                                {field.type == "LONG_TEXT" && (
                                  <>
                                    <p className="mb-1 text-sm font-semibold text-md">
                                      {field.required == true ? <span className="text-red-600">*</span> : ""}{" "}
                                      {field.label}
                                    </p>
                                    <textarea
                                      id={field.label}
                                      name={field.label}
                                      onChange={(e) => setLabel(e.target.value)}
                                      required={field.required == true ? true : false}
                                      className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      rows={4}
                                      autoComplete="off"
                                    />
                                  </>
                                )}
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-3">
                        <button
                          type="button"
                          onClick={submit}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Submit Application
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="py-5 my-10 text-center bg-gray-100 rounded">
                      <h4 className="flex-auto p-1">
                        Sorry! There is currently no application form available for this position. Kindly
                        check back later.
                      </h4>
                      <span className="mb-2 sm:ml-3">
                        <Link href="/jobs">
                          <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View More Jobs
                          </a>
                        </Link>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              {/* <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Instructions</h3>
                <div className="mt-1 text-sm text-gray-600">
                  <ul className="list-disc">
                    <li>
                      <h3 className="font-weight-bold">Fill up the form with the correct information</h3>
                      <small className="mt-n4">
                        Asterisk (<span className="text-danger">*</span>) next to a form control&apos;s label
                        indicates that such field is
                        <strong> &quot;required&quot;</strong>.
                      </small>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
