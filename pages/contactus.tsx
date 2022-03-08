import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "reactstrap";
import ImageCard from "../components/ImageCard";
import { MainContainer } from "../components/MainContainer";
import { useAuth } from "../utils/AuthUserContext";
import { send, init } from "emailjs-com";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_USER_ID,
} from "../constants/contants";

export default function ConatctUs() {
  const [afterSuceess, setAfterSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { authUser } = useAuth();

  const handleSubmit = (event) => {
    if (firstName.length === 0) {
      setError("Please enter your first name.");
    } else if (message.length === 0) {
      setError("Please enter a message.");
    } else {
      event.preventDefault();
      const finalSubject =
        subject !== "" ? subject : `New message from ${firstName} ${lastName}`;
      init(EMAILJS_USER_ID);
      send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: `${firstName} ${lastName}`,
        subject: finalSubject,
        message: message,
        reply_to: authUser ? authUser.email : email,
      });
      setAfterSuccess(true);
    }
  };

  return (
    <MainContainer>
      <div className="flex flex-col z-10 lg:mx-16 md:mx-12 sm:mx-5 mt-7 items-center mb-2">
        <div
          style={{
            width: "90%",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}
          className="flex bg-contact-us-gradient bg-opacity-60"
        >
          <div style={{ width: "100%" }} className="flex mt-3 mb-20">
            <img width="15%" height="auto" src="/contact-us-left.svg" />
            <div
              style={{ width: "100%" }}
              className="flex flex-col mt-6 md:mt-4 sm:mt-4 lg:ml-30 lg:mr-30 md:ml-12 md:mr-12 sm:ml-8 sm:mr-8 items-center"
            >
              <h1 className="lg:mb-3 md:mb-2 sm:mb-1.5 mb-1.5 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-cabinet-grotesk md:font-bold sm:font-bold lg:font-bold font-medium">
                Contact Us
              </h1>
              <h4 className="font-cabinet-grotesk text-sm lg:text-sm md:text-sm sm:text-sm text-gray-500">
                Have a question or want to say hi?
              </h4>
              <h4 className="font-cabinet-grotesk mt-1 xl:mt-2 lg:-mt-1 md:md-1 sm:mt-0.5 text-gray-500 text-sm lg:text-sm md:text-sm sm:text-sm">
                We’d love to hear from you.
              </h4>
            </div>
            <img width="15%" height="auto" src="/contact-us-right.svg" />
          </div>
        </div>
        <div className="flex items-center w-80 xl:w-auto lg:w-auto md:w-auto sm:w-auto lg:-mt-20 md:-mt-16 sm:-mt-16 xl:-mt-24 -mt-14 bg-white rounded-3xl shadow-lg">
          <img
            width={!authUser && !afterSuceess ? "45%" : "40%"}
            height="auto"
            className="hidden sm:block md:block lg:block xl:block 2xl:block"
            src={
              afterSuceess
                ? "/contact-success-image.png"
                : "/contact-form-image.png"
            }
          />
          {afterSuceess ? (
            <div
              style={{ width: "280px" }}
              className={
                "flex flex-col text-center items-center " +
                (!authUser && !afterSuceess
                  ? "xl:ml-12 xl:-mr-12 lg:ml-12 lg:-mr-12 md:ml-12 md:-mr-12 sm:ml-12 sm:-mr-12 ml-8 -mr-8"
                  : "lg:ml-14 lg:-mr-14 md:ml-14 md:-mr-14 sm:ml-14 sm:-mr-14 xl:ml-14 xl:-mr-14 ml-6 -mr-6 xl:h-auto lg:h-auto md:h-auto sm:h-auto h-96")
              }
            >
              <img width="150px" className="mb-2" src="/email-sent-image.png" />
              <p className="lg:font-extrabold md:font-extrabold sm:font-extrabold xl:font-extrabold text-base mb-1">
                Thanks,&nbsp;{firstName}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Your message has been sent successfully. Someone from the team
                will respond to your message asap.
              </p>
              <Button
                style={{ width: "100%" }}
                className=" border text-gray-600 font-bold p-2 mt-4 cursor-pointer rounded-md"
                onClick={() => router.push("/")}
              >
                Back to home page
              </Button>
            </div>
          ) : (
            <div style={{ width: "80%" }} className="flex flex-col m-5">
              <form onSubmit={handleSubmit}>
                <p className="xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 ml-5 font-cabinet-grotesk">
                  First Name
                </p>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  type="input"
                  style={{ width: "90%" }}
                  className="p-2 rounded-lg drop-shadow-md border-2 lg:mx-10 xl:mx-10 md:mx-10 sm:mx-10 mx-4 my-2 font-cabinet-grotesk"
                  placeholder="Please enter your first name"
                  required
                />

                <div className="flex justify-between">
                  <p className="font-cabinet-grotesk xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 ml-5">
                    Last Name
                  </p>
                  <p className="text-gray-500 font-cabinet-grotesk">Optional</p>
                </div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  type="input"
                  style={{ width: "90%" }}
                  className="p-2 rounded-lg drop-shadow-md border-2 my-2 font-cabinet-grotesk lg:mx-10 xl:mx-10 md:mx-10 sm:mx-10 mx-4"
                  placeholder="Please enter your first name"
                />

                {!authUser && (
                  <div>
                    <p className="font-cabinet-grotesk xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 ml-5">
                      Email
                    </p>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="input"
                      style={{ width: "90%" }}
                      className="p-2 rounded-lg drop-shadow-md border-2 my-2 font-cabinet-grotesk lg:mx-10 xl:mx-10 md:mx-10 sm:mx-10 mx-4"
                      placeholder="Please enter your email"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-between">
                  <p className="font-cabinet-grotesk xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 ml-5">
                    Subject
                  </p>
                  <p className="text-gray-500 font-cabinet-grotesk">Optional</p>
                </div>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  style={{ width: "90%" }}
                  placeholder="What is the message regarding?"
                  className="p-2 rounded-lg drop-shadow-md border-2 my-2 font-cabinet-grotesk lg:mx-10 xl:mx-10 md:mx-10 sm:mx-10 mx-4"
                  type="input"
                />

                <p className="xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 ml-5">
                  Message
                </p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  style={{ width: "90%", borderColor: "rgba(229, 231, 235)" }}
                  placeholder="What's on your mind?"
                  className="p-2 rounded-lg drop-shadow-md border-2 text-sm my-2 font-cabinet-grotesk lg:mx-10 xl:mx-10 md:mx-10 sm:mx-10 mx-4"
                  required
                />

                <br />

                <input
                  type="submit"
                  value="Submit"
                  className="p-2 ml-5 xl:ml-10 lg:ml-10 md:ml-10 sm:ml-10 mt-1 hover:bg-button-hover bg-blue-600 text-white rounded-md cursor-pointer"
                  style={{ width: "90%" }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
}
