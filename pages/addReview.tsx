import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { MainContainer } from "../components/MainContainer";
import Select from "react-select";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { generateArrayOfYears } from "../utils/helpers";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BadgeCheckIcon from "@heroicons/react/solid/BadgeCheckIcon";
import { defaultRoleOptions, durationOptions } from "../constants/contants";
import { Company } from "../models/interfaces/types/Company";
import nodemailer from "nodemailer";
export default function AddReview() {
  const router = useRouter();
  const { company_id, role_id } = router.query;
  const [step, setStep] = useState<number>(
    company_id && role_id ? 3 : company_id ? 2 : 1
  );
  const [role, setRole] = useState<{ value: string; label: string }>();
  const [company, setCompany] = useState<Company>();
  const [newRoleName, setNewRoleName] = useState<string>();
  const [salary, setSalary] = useState<string>("0.0");
  const [yearJoined, setYearJoined] = useState<{
    value: number;
    label: string;
  }>();
  const [duration, setDuration] = useState<{ value: number; label: string }>();
  const [interviewRating, setInterviewRating] = useState<number>(0.0);
  const [interviewReview, setInterviewReview] = useState<string>("");
  const [coopRating, setCoopRating] = useState<number>(0.0);
  const [coopReview, setCoopReview] = useState<string>("");
  const [roleId, setRoleId] = useState<number>();
  async function getCompany() {
    try {
      const response = await axios.get(`/api/company/getCompany`, {
        params: {
          id: company_id,
        },
      });
      if (response.data.companies.length > 0 && response.data.companies[0]) {
        setCompany(response.data.companies[0]);
      }
    } catch (error) {
      toast("Error in get company for company page. " + error);
    }
  }

  async function getRole() {
    try {
      const roleResponse = await axios.get("/api/roles/getRole", {
        params: {
          id: parseInt(role_id as string),
        },
      });
      if (roleResponse.data.roles && roleResponse.data.roles.length > 0) {
        setRoleId(roleResponse.data.roles[0].id);
        setRole({
          value: roleResponse.data.roles[0].title_name,
          label: roleResponse.data.roles[0].title_name,
        });
      }
    } catch (error) {
      toast("Error in get company for Add review page. " + error);
    }
  }

  async function sendEmail() {
    try {
      const emailResponse = await axios.get(
        "/api/bookmarks/getUserEmailsByBookmark",
        {
          params: {
            role_id: roleId,
          },
        }
      );
      const emailObjects = emailResponse.data.bookmarks;
      const emails = [];
      for (let email of emailObjects) {
        emails.push(email.email);
      }
      console.log(emails.join(","));
      await axios.post("/api/bookmarks/sendBookmarkEmail", {
        name: company.name,
        role: role ? role.value : newRoleName,
        work_experience: coopReview,
        interview_experience: interviewReview,
        salary: salary,
        emails: emails.join(","),
      });
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (company_id && (!company || company_id !== company.id.toString())) {
      getCompany();
    }
    if (role_id) {
      getRole();
    }
  }, [company_id, role_id, company]);

  const stepTitle = () => {
    if (step === 1) {
      return "Review company details";
    } else if (step === 2) {
      return "Select / Create Role";
    } else if (step === 3) {
      return "Coop duration";
    } else if (step === 4) {
      return "Add your experience";
    }
  };

  async function addReview() {
    try {
      const review = await axios.post("/api/review/addReview", {
        year_worked: yearJoined.value,
        role_id: roleId,
        salary: parseFloat(salary),
        duration: duration.value,
        work_experience: coopReview,
        work_experience_rating: coopRating,
        interview_experience: interviewReview,
        interview_experience_rating: interviewRating,
      });
      sendEmail();
      setStep(5);
    } catch (error) {
      toast("Error in adding the review. " + error);
    }
  }

  const formValidations = () => {
    if (step === 2) {
      return !role && !newRoleName;
    } else if (step === 3) {
      return parseFloat(salary) <= 0.0 || !yearJoined || !duration;
    }
    return false;
  };

  async function checkAndCreateRole() {
    try {
      const roleName = role ? role.value : newRoleName;
      const roleResponse = await axios.get("/api/role/getRole", {
        params: {
          title_name: roleName,
          company_id: company.id,
        },
      });
      if (roleResponse.data.roles && roleResponse.data.roles.length > 0) {
        setRoleId(roleResponse.data.roles[0].id);
      } else {
        try {
          const addRoleResponse = await axios.post("/api/role/addRole", {
            title_name: roleName,
            company_id: company.id,
          });
          if (addRoleResponse.status === 200 && addRoleResponse.data.id) {
            setRoleId(addRoleResponse.data.id);
          }
        } catch (error) {
          toast("Error in adding the role. " + error);
        }
      }
    } catch (error) {
      toast("Error in querying for role. " + error);
    }
  }

  return (
    <MainContainer>
      <div className="flex flex-col z-10 mx-16 mt-7 items-center">
        <div
          style={{
            width: "85%",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}
          className="flex pt-3 pb-20 bg-add-review-gradient bg-opacity-60"
        >
          <div
            style={{ width: "100%" }}
            className="flex flex-col mt-6 ml-32 mr-32 items-center"
          >
            <h1 className="mb-3 text-5xl font-cabinet-grotesk font-extrabold">
              Add a Review
            </h1>
            <h4 className="font-cabinet-grotesk text-gray-500">
              Describe how your experience was working at the coop.
            </h4>
          </div>
        </div>
        {step === 5 ? (
          <div
            style={{ width: "45%" }}
            className="flex flex-col justify-center items-center text-center bg-center bg-company-added bg-cover rounded-xl ml-10 mr-10 -mt-10 p-14"
          >
            <div className=" w-20 h-20 md:w-40 md:h-40">
              <BadgeCheckIcon color="#0ED00A" />
            </div>

            <div className="text-bold text-base md:text-2xl font-cabinet-grotesk ">
              Review submitted successfully!
            </div>
            <div className=" text-gray-500  text-sm md:text-lg font-cabinet-grotesk">
              Bravo! thank you for submitting the review. Your contribution goes
              a long way in helping others learn about co-op experiences at
              different companies.
            </div>
            <button
              className="bg-button-blue text-white text-xs lg:text-base  rounded-xl p-2 mx-auto mt-5"
              onClick={() => router.push(`/companies/${company.id}/${roleId}`)}
            >
              Check your submitted review
            </button>
            <button
              className="rounded-xl  text-xs lg:text-base p-2  my-2  border-2 mb-3 border-gray-300  mx-auto"
              onClick={() => router.push("/")}
            >
              Back to home page
            </button>
          </div>
        ) : (
          <div className="flex items-center -mt-12 bg-white rounded-3xl shadow-lg">
            <img width="43%" height="400px" src={`/add-review-${step}.svg`} />
            <div
              style={{ width: "300px" }}
              className="flex flex-col ml-12 -mr-12"
            >
              <div className="flex justify-evenly mb-20 -ml-4 text-xs text-center items-center">
                <span
                  style={{ width: 24, height: 24 }}
                  className={
                    step === 1
                      ? "bg-blue-600 text-white rounded-md p-1"
                      : step > 1
                      ? "bg-blue-100 text-blue-400 rounded-md p-1"
                      : "bg-gray-300 text-gray-400 rounded-md p-1"
                  }
                >
                  <p>{step > 1 ? <span>&#10003;</span> : 1}</p>
                </span>
                <p
                  className={`mt-1 ml-2 text-xs ${
                    step === 1 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Company
                </p>
                <span
                  style={{ width: 24, height: 24 }}
                  className={
                    step === 2
                      ? "bg-blue-600 text-white rounded-md p-1 ml-2"
                      : step > 2
                      ? "bg-blue-100 text-blue-400 rounded-md p-1 ml-2"
                      : "bg-gray-300 text-gray-400 rounded-md p-1 ml-2"
                  }
                >
                  <p>{step > 2 ? <span>&#10003;</span> : 2}</p>
                </span>
                <p
                  className={`mt-1 ml-2 text-xs ${
                    step === 2 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Role
                </p>
                <span
                  style={{ width: 24, height: 24 }}
                  className={
                    step === 3
                      ? "bg-blue-600 text-white rounded-md ml-3 p-1"
                      : step > 3
                      ? "bg-blue-100 text-blue-400 rounded-md p-1 ml-3"
                      : "bg-gray-300 text-gray-400 rounded-md ml-3 p-1"
                  }
                >
                  <p>{step > 3 ? <span>&#10003;</span> : 3}</p>
                </span>
                <p
                  className={`mt-1 ml-2 text-xs ${
                    step === 3 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Duration
                </p>
                <span
                  style={{ width: 24, height: 24 }}
                  className={
                    step === 4
                      ? "bg-blue-600 text-white rounded-md ml-2 p-1"
                      : "bg-gray-300 text-gray-400 rounded-md ml-2 p-1"
                  }
                >
                  <p>4</p>
                </span>
                <p
                  className={`mt-1 ml-2 text-xs ${
                    step === 4 ? "text-black" : "text-gray-400"
                  }`}
                >
                  Review
                </p>
              </div>
              <hr
                className="-mt-16 mb-8 border-solid border-1 border-gray-300 self-center"
                style={{ width: "115%" }}
              />
              <div className="-ml-5 -mt-3 mb-2">
                <p className="text-xs text-gray-400">
                  Step&nbsp;{step > 4 ? 4 : step}/4
                </p>
                <p className="text-sm font-bold mt-2 mb-2">{stepTitle()}</p>
                {step === 1 ? (
                  <div
                    style={{ width: 350 }}
                    className="flex bg-gray-100 rounded-lg pb-6"
                  >
                    <div
                      style={{ height: 82 }}
                      className="p-3 ml-3 mt-4 bg-gray-300 rounded-lg"
                    >
                      <img
                        src={
                          company && company.logo && company.logo.length > 0
                            ? company.logo
                            : "/default_company.svg"
                        }
                        width="60px"
                        height="60px"
                      />
                    </div>
                    <div
                      style={{ width: "65%" }}
                      className="flex flex-col space-x-2 mt-4 ml-3"
                    >
                      <p className="text-lg font-extrabold mb-4 ml-3 font-cabinet-grotesk">
                        {company ? company.name : "Company Name"}
                      </p>
                      <p className="text-xs text-gray-600 mb-4 font-cabinet-grotesk">
                        🔗&nbsp;&nbsp;
                        <a
                          href={
                            company
                              ? company.website
                              : "https://www.companyname.com"
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          {company ? company.website : "www.companyname.com"}
                        </a>
                      </p>
                      <p className="text-xs text-gray-600 mb-4 font-cabinet-grotesk">
                        📍&nbsp;
                        {company
                          ? company.city + " " + company.country
                          : "Company address goes here in 2 or 3 lines"}
                      </p>
                      <p className="text-gray-700 text-sm font-cabinet-grotesk">
                        {company
                          ? company.description
                          : "Company description goes comp desc goes here in preferrably 2 or 3 lines."}
                      </p>
                    </div>
                  </div>
                ) : step === 2 ? (
                  <div className="mt-2">
                    <label className="text-xs text-gray-500 ml-1 font-cabinet-grotesk">
                      Select Role (*)
                    </label>
                    <Select
                      value={role}
                      onChange={setRole}
                      options={defaultRoleOptions}
                      isClearable={true}
                      isDisabled={!!newRoleName}
                      className="text-xs p-1 text-gray-600 mb-8 font-cabinet-grotesk"
                      placeholder="Please choose a role"
                    />
                    <p className="text-sm text-gray-400 mb-6 ml-1 font-cabinet-grotesk">
                      Can’t find your role? Worry not, you can add it below &
                      continue to next step.
                    </p>
                    <p className="text-xs text-gray-500 ml-1 font-cabinet-grotesk">
                      Role
                    </p>
                    <input
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      placeholder="Please enter your role"
                      className="p-2.5 text-xs rounded-md drop-shadow-md border-2 ml-1 my-2 font-cabinet-grotesk"
                      type="input"
                      disabled={!!role}
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : step === 3 ? (
                  <div>
                    <hr
                      className="border-solid border-1 mb-4 border-gray-300 self-center"
                      style={{ width: "105%" }}
                    />
                    <p className="text-blue-600 text-xs font-bold font-cabinet-grotesk mb-3">
                      {role ? role.label : newRoleName} &nbsp;@{" "}
                      {company ? company.name : "Company Name"}
                    </p>
                    <div className="flex justify-evenly mb-2 -ml-3">
                      <div className="flex flex-col mt-1">
                        <label className="text-xs text-gray-600 ml-1 font-cabinet-grotesk">
                          Salary /hr
                        </label>
                        <CurrencyInput
                          id="input-example"
                          name="input-currency"
                          allowDecimals={true}
                          decimalScale={2}
                          placeholder="Please enter your salary"
                          decimalsLimit={2}
                          prefix="$"
                          value={salary || "0.0"}
                          className="p-2.5 text-xs text-gray-600 mb-8 rounded-md ml-1 mt-2 border-gray-300 font-cabinet-grotesk"
                          onValueChange={(v) => setSalary(v)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 ml-1 font-cabinet-grotesk">
                          Year of Joining
                        </label>
                        <Select
                          value={yearJoined}
                          onChange={setYearJoined}
                          options={generateArrayOfYears(22)}
                          openMenuOnFocus
                          className="text-xs p-1 text-gray-600 mb-8 font-cabinet-grotesk w-36"
                          placeholder="Choose a year"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 ml-1 font-cabinet-grotesk">
                      Duration
                    </p>
                    <Select
                      value={duration}
                      onChange={(e) => setDuration(e)}
                      options={durationOptions}
                      placeholder="Enter the duration of your co-op in months"
                      className="text-xs rounded-md border-1 ml-1 mt-2 mb-3 font-cabinet-grotesk w-full"
                    />
                  </div>
                ) : (
                  step === 4 && (
                    <div>
                      <hr
                        className="border-solid border-1 mb-4 border-gray-300 self-center"
                        style={{ width: "105%" }}
                      />
                      <p className="text-blue-600 text-xs font-bold font-cabinet-grotesk mb-3">
                        {role ? role.label : newRoleName} &nbsp;@ {company.name}
                      </p>
                      <div className="flex-column mb-3 -ml-3">
                        <div className="flex justify-between">
                          <label className="text-s text-gray-600 ml-4 mt-1 mb-2 font-cabinet-grotesk">
                            Interview Experience
                          </label>
                          <StarRatings
                            starDimension={25}
                            starSpacing={1}
                            rating={interviewRating}
                            starRatedColor="rgb(253, 204, 13)"
                            starHoverColor="rgb(255, 149, 41)"
                            isAggregateRating={true}
                            changeRating={setInterviewRating}
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                        <label className="text-xs font-bold ml-4 font-cabinet-grotesk">
                          Interview review
                        </label>
                        <textarea
                          value={interviewReview}
                          onChange={(e) => setInterviewReview(e.target.value)}
                          name="interviewReview"
                          style={{
                            width: "90%",
                            borderColor: "rgba(229, 231, 235)",
                          }}
                          placeholder={`Please describe your experience at ${
                            company ? company.name : "Company Name"
                          }.`}
                          className="p-2 rounded-lg drop-shadow-md border-2 text-sm mx-4 my-2 font-cabinet-grotesk"
                          required
                        />
                        <div>
                          <div className="flex justify-between">
                            <label className="text-s text-gray-600 ml-4 mt-1 mb-2 font-cabinet-grotesk">
                              Co-op Experience
                            </label>
                            <StarRatings
                              starDimension={25}
                              starSpacing={1}
                              rating={coopRating}
                              starRatedColor="rgb(253, 204, 13)"
                              starHoverColor="rgb(255, 149, 41)"
                              isAggregateRating={true}
                              changeRating={setCoopRating}
                              numberOfStars={5}
                              name="rating"
                            />
                          </div>
                          <label className="text-xs font-bold ml-4 font-cabinet-grotesk">
                            Co-op review
                          </label>
                          <textarea
                            value={coopReview}
                            onChange={(e) => setCoopReview(e.target.value)}
                            name="coopReview"
                            style={{
                              width: "90%",
                              borderColor: "rgba(229, 231, 235)",
                            }}
                            placeholder={`Please describe your experience at ${
                              company ? company.name : "Company Name"
                            }.`}
                            className="p-2 rounded-lg drop-shadow-md border-2 text-sm mx-4 my-2 font-cabinet-grotesk"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
                <div className="flex">
                  {step > 1 && (
                    <Button
                      style={{ width: 130 }}
                      className=" border border-gray-400 text-xs text-gray-500 font-extrabold py-2 mt-4 cursor-pointer rounded-lg mr-1.5"
                      onClick={() => setStep((prev) => prev - 1)}
                    >
                      Back
                    </Button>
                  )}
                  {step < 4 && (
                    <Button
                      style={{
                        width: 130,
                        cursor: formValidations() ? "not-allowed" : "pointer",
                      }}
                      className={` border text-xs text-white font-extrabold py-2 mt-4 cursor-pointer rounded-lg ${
                        formValidations() ? "bg-gray-500" : "bg-blue-600"
                      } float-right`}
                      onClick={() => {
                        if (step === 2) {
                          checkAndCreateRole();
                        }
                        setStep((prev) => prev + 1);
                      }}
                      disabled={formValidations()}
                    >
                      Next
                    </Button>
                  )}
                  {step === 4 && (
                    <Button
                      style={{
                        width: 130,
                        cursor:
                          interviewRating === 0.0 ||
                          coopRating === 0.0 ||
                          interviewReview === "" ||
                          coopReview === ""
                            ? "not-allowed"
                            : "pointer",
                      }}
                      className={` border text-xs text-white font-extrabold py-2 mt-4 cursor-pointer rounded-lg ${
                        interviewRating === 0.0 ||
                        coopRating === 0.0 ||
                        interviewReview === "" ||
                        coopReview === ""
                          ? "bg-gray-500"
                          : "bg-blue-600"
                      }`}
                      onClick={addReview}
                      disabled={
                        interviewRating === 0.0 ||
                        coopRating === 0.0 ||
                        interviewReview === "" ||
                        coopReview === ""
                      }
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainContainer>
  );
}
