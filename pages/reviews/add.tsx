import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "reactstrap";
import { MainContainer } from "../../components/MainContainer";
import Select from "react-select";

export default function AddReview() {
  const [step, setStep] = useState<number>(1);
  const router = useRouter();
  const [role, setRole] = useState<{ value: string; label: string }>();
  const [newRoleName, setNewRoleName] = useState<string>();
  const [monthJoined, setMonthJoined] = useState<number>();
  const [duration, setDuration] = useState<number>();

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

  const roleOptions = [
    { value: "SDE", label: "Software Development Engineer" },
    { value: "Q/A", label: "Quality Testing Engineer" },
  ];

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
                Step&nbsp;{step > 3 ? 3 : step}/3
              </p>
              <p className="text-sm font-bold mt-1 mb-2">{stepTitle()}</p>
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
                      src="/default_company.svg"
                      width="60px"
                      height="60px"
                    />
                  </div>
                  <div
                    style={{ width: "65%" }}
                    className="flex flex-col space-x-2 mt-4 ml-3"
                  >
                    <p className="text-lg font-extrabold mb-4 ml-3 font-cabinet-grotesk">
                      Company Name
                    </p>
                    <p className="text-xs text-gray-600 mb-4 font-cabinet-grotesk">
                      🔗 www.companyname.com
                    </p>
                    <p className="text-xs text-gray-600 mb-4 font-cabinet-grotesk">
                      📍 Company address goes here in 2 or 3 lines
                    </p>
                    <p className="text-gray-700 text-sm font-cabinet-grotesk">
                      Company description goes comp desc goes here in
                      preferrably 2 or 3 lines.
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
                    options={roleOptions}
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
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                step === 3 && (
                  <div>
                    <hr
                      className="border-solid border-1 mb-4 border-gray-300 self-center"
                      style={{ width: "105%" }}
                    />
                    <p className="text-blue-600 text-xs font-bold font-cabinet-grotesk mb-3">
                      {role ? role.label : newRoleName} &nbsp;@ Company Name
                    </p>
                    <div className="flex justify-evenly mb-3 -ml-3">
                      <div>
                        <label className="text-xs text-gray-600 ml-1 font-cabinet-grotesk">
                          Month of Joining
                        </label>
                        <Select
                          value={monthJoined}
                          onChange={setMonthJoined}
                          options={Array.from(Array(13).keys()).slice(1)}
                          className="text-xs p-1 text-gray-600 mb-8 font-cabinet-grotesk"
                          placeholder="Choose a month"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 ml-1 font-cabinet-grotesk">
                          Year of Joining
                        </label>
                        <Select
                          value={monthJoined}
                          onChange={setMonthJoined}
                          options={Array.from(Array(81).keys()).map(
                            (y) => y + 1940
                          )}
                          className="text-xs p-1 text-gray-600 mb-8 font-cabinet-grotesk"
                          placeholder="Choose a year"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 ml-1 font-cabinet-grotesk">
                      Duration
                    </p>
                    <input
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value))}
                      placeholder="Please enter the duration of your co-op in months"
                      className="p-2.5 text-xs rounded-md drop-shadow-md border-2 ml-1 mt-2 mb-3 font-cabinet-grotesk"
                      type="input"
                      style={{ width: "100%" }}
                    />
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
                    style={{ width: 130 }}
                    className=" border text-xs text-white font-extrabold py-2 mt-4 cursor-pointer rounded-lg bg-blue-600 float-right"
                    onClick={() => setStep((prev) => prev + 1)}
                  >
                    Next
                  </Button>
                )}
                {step === 4 && (
                  <Button
                    style={{ width: 130 }}
                    className=" border text-xs text-white font-extrabold py-2 mt-4 cursor-pointer rounded-lg bg-blue-600"
                    onClick={() => {}}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
