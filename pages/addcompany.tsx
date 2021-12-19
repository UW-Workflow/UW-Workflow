import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import { MainContainer } from "../components/MainContainer";
import { Company } from "../models/interfaces/types/Company";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export default function AddCompany() {
  const [modelStage, setModelStage] = useState<number>(0);
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [companies, setCompanies] = useState<any>({});
  const [company, setCompany] = useState<Company>({
    id: 0,
    name: "",
    description: "",
    website: "",
    city: "",
    country: "",
    logo: "",
  });
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const addCompany = async () => {
    try {
      await axios.post("/api/company/addCompany", {
        name: company.name,
        city: company.city,
        country: company.country,
        website: company.website,
        description: company.description,
        logo: company.logo,
      });
      setModelStage(modelStage + 1);
    } catch (err) {
      toast("Error in adding the company. " + err);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    getBase64(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      company.logo = reader.result.toString();
      setCompany(company);
      forceUpdate();
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const checkError = () => {
    if (company.name === "") {
      setError(true);
      toast("Company name not set");
    } else if (!validURL(company.website)) {
      toast("Company website entered is incorrect");
    } else if (company.city === "") {
      setError(true);
      toast("City is incorrect");
    } else if (company.country === "") {
      setError(true);
      toast("Country is incorrect");
    } else if (company.description === "") {
      setError(true);
      toast("Company description is incorrect");
    } else {
      setModelStage(modelStage + 1);
      forceUpdate();
    }
  };

  const addModelStage = () => {
    if (modelStage === 0) {
      checkError();
    } else if (modelStage === 1) {
      addCompany();
    }
    setError(false);
  };

  const cancel = () => {
    if (modelStage === 1) {
      setModelStage(0);
    } else {
      router.push("/");
    }
  };
  const handleOnSelect = (item: any) => {
    console.log(item);
    company.name = item.name;
    company.logo = item.logo;
    company.website = item.domain;
    setCompany(company);
    forceUpdate();
  };

  const findCompany = async (name) => {
    try {
      const companies = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`,
        { headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` } }
      );
      console.log(companies.data);
      setCompanies(companies.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MainContainer>
      <div className="flex flex-col items-center bg-add-a-company-gradient rounded-b-3xl bg-cover p-16 mb-1 mx-auto">
        <h1 className="text-5xl font-cabinet-grotesk font-extrabold">
          Add a company
        </h1>
        <h4 className="font-cabinet-grotesk mt-0 text-gray-500 text-lg">
          Please fill out the details below to add the
          <br />
          company
        </h4>
      </div>
      {modelStage === 2 ? (
        <div className="flex flex-col justify-center mx-32 p-40 mb-5  bg-company-added bg-cover">
          <div className="text-bold mt-52 mx-auto text-2xl font-cabinet-grotesk ">
            Company added successfully!
          </div>
          <div className="text-gray-500 mx-auto ml-20 text-md font-cabinet-grotesk">
            Bravo! thank you for adding the company. Your contribution goes a
            long way in helping others learn about co-op experiences
            <p className="ml-64"> at different companies.</p>
          </div>
          <button className="bg-button-blue text-white rounded-xl p-3 mx-auto mt-5">
            Add a review for added Company
          </button>
          <button
            className="rounded-xl p-2  mt-2 mb-4 border-2 border-gray-300  mx-auto"
            onClick={cancel}
          >
            Back to home page
          </button>
        </div>
      ) : (
        <div>
          <div className="flex flex-col bg-white shadow rounded-xl px-8 py-2 max-w-lg mx-auto mb-5">
            <h1 className="text-xl font-cabinet-grotesk mt-5 font-bold mx-auto">
              Add a company
            </h1>
            <h4 className="font-cabinet-grotesk mt-2 text-gray-500 text-sm mx-auto">
              Please fill out the details below to add the company
            </h4>
            {modelStage === 0 ? (
              <div>
                <div className="flex items-start mt-4">
                  <div className="bg-button-blue text-white rounded-xl px-2.5 py-1 mr-2">
                    1
                  </div>
                  <label className="mt-1 text-gray-500">Basic Details </label>
                  <div className="bg-gray-200 text-white rounded-xl px-2.5 py-1 mx-2">
                    <label className="text-gray-400">2</label>
                  </div>
                  <label className="mt-1 text-gray-500">Preview</label>
                </div>
                <button
                  className="mt-10 mx-10 flex items-center justify-center"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <img
                      src={company.logo ? company.logo : "ImageUpload.svg"}
                      className="max-h-40 max-w-xl"
                    />
                  )}
                </button>
                <div className="flex flex-col mt-4 space-y-1">
                  <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm self-start">
                    Company Name
                  </label>
                  <div style={{ width: 450 }}>
                    <ReactSearchAutocomplete
                      items={companies}
                      onSelect={handleOnSelect}
                      autoFocus
                      onSearch={(value) => findCompany(value)}
                      placeholder={"Search for companies"}
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4 space-y-1">
                  <div className="flex justify-between">
                    <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm">
                      Company Website
                    </label>
                  </div>

                  <input
                    placeholder="Please enter company website url"
                    value={company.website}
                    type="text"
                    onChange={(e) => {
                      company.website = e.target.value;
                      setCompany(company);
                    }}
                    className="rounded-lg placeholder-gray-300"
                  />
                </div>
                <div className="flex flex-col mt-4 space-y-1">
                  <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm self-start">
                    Company Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    onChange={(e) => {
                      company.description = e.target.value;
                      setCompany(company);
                    }}
                    placeholder="Please write a short description about the company"
                    className="rounded-lg placeholder-gray-300 resize-none"
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col mt-4 space-y-1">
                    <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm self-start">
                      City
                    </label>
                    <input
                      placeholder="Please enter a city"
                      type="text"
                      onChange={(e) => {
                        company.city = e.target.value;
                        setCompany(company);
                      }}
                      className="rounded-lg placeholder-gray-300"
                    />
                  </div>
                  <div className="flex flex-col mt-4 space-y-1 space-x-2">
                    <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm ml-2">
                      Country
                    </label>
                    <input
                      placeholder="Please enter a country"
                      type="text"
                      onChange={(e) => {
                        company.country = e.target.value;
                        setCompany(company);
                      }}
                      className="rounded-lg placeholder-gray-300"
                    />
                  </div>
                </div>
              </div>
            ) : modelStage === 1 ? (
              <div>
                <div className="flex items-start mt-4">
                  <div className="bg-gray-200 text-white rounded-xl px-2.5 py-1 mx-2">
                    <label className="text-gray-400">1</label>
                  </div>
                  <label className="mt-1 text-gray-500">Basic Details</label>
                  <div className="bg-button-blue text-white rounded-xl px-2.5 py-1 mx-2">
                    2
                  </div>
                  <label className="mt-1 text-gray-500">Preview </label>
                </div>
                <div className="flex">
                  <img
                    src={company.logo ? company.logo : "samplecompany.png"}
                    className="mt-4 max-h-20 max-w-lg"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl font-cabinet-grotesk mt-5 ml-10">
                      {company.name}
                    </h1>
                    <h1 className="text-sm text-gray-600 font-cabinet-grotesk mt-2 ml-10">
                      {company.description.length > 20
                        ? company.description.substring(0, 20) + "..."
                        : company.description}
                    </h1>
                    <a
                      href={"https://" + company.website}
                      className=" font-cabinet-grotesk mt-2 ml-10 text-md"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  </div>
                </div>
                <div className="flex flex-col mt-4 space-y-1">
                  <label className="font-cabinet-grotesk mt-2 text-gray-500 text-sm self-start">
                    Location
                  </label>
                  {console.log(company.city)}
                  <input
                    placeholder={company.city + "," + company.country}
                    type="text"
                    disabled={true}
                    className="rounded-lg placeholder-gray-400"
                  />
                </div>
              </div>
            ) : null}

            <button
              className="bg-button-blue text-white rounded-xl p-3  mx-10 my-4"
              onClick={addModelStage}
            >
              {modelStage === 1 ? <b>Add Company</b> : <b>Continue</b>}
            </button>
            <button
              className="rounded-xl p-2  mx-10 mt-0 mb-4 border-2 border-gray-300"
              onClick={cancel}
            >
              {modelStage === 1 ? <b>Previous Page</b> : <b>Cancel</b>}
            </button>
          </div>
        </div>
      )}
      <div>
        <ToastContainer
          toastStyle={{ backgroundColor: "#e74c3c", color: "black" }}
        />
      </div>
    </MainContainer>
  );
}