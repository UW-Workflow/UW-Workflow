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
      <div className="flex flex-col z-10 mx-16 mt-7 items-center mb-2">
        <div
          style={{
            width: "85%",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
          }}
          className="flex bg-contact-us-gradient bg-opacity-60"
        >
          <div style={{ width: "100%" }} className="flex mt-3 mb-20">
            <img width="150px" height="auto" src="contact-us-left.svg" />
            <div
              style={{ width: "100%" }}
              className="flex flex-col mt-6 ml-32 mr-32 items-center"
            >
              <h1 className="mb-3 text-5xl font-cabinet-grotesk font-extrabold">
                Contact Us
              </h1>
              <h4 className="font-cabinet-grotesk text-gray-500">
                Have a question or just want to say hi?
              </h4>
              <h4 className="font-cabinet-grotesk -mt-1 text-gray-500">
                We’d love to hear from you.
              </h4>
            </div>
            <img width="150px" height="auto" src="contact-us-right.svg" />
          </div>
        </div>
        <div className="flex items-center -mt-20 bg-white rounded-3xl shadow-lg">
          <img
            width={!authUser && !afterSuceess ? "45%" : "40%"}
            height="auto"
            src={
              afterSuceess
                ? "contact-success-image.png"
                : "contact-form-image.svg"
            }
          />
          {afterSuceess ? (
            <div
              style={{ width: "280px" }}
              className={
                "flex flex-col text-center items-center " +
                (!authUser && !afterSuceess ? "ml-12 -mr-12" : "ml-14 -mr-14")
              }
            >
              <img width="150px" className="mb-2" src="email-sent-image.svg" />
              <p className="font-extrabold text-base mb-1">
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
                <p className="ml-10 font-cabinet-grotesk">First Name</p>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  type="input"
                  style={{ width: "90%" }}
                  className="p-2 rounded-lg drop-shadow-md border-2 mx-10 my-2 font-cabinet-grotesk"
                  placeholder="Please enter your first name"
                  required
                />

                <div className="flex justify-between">
                  <p className="ml-10 font-cabinet-grotesk">Last Name</p>
                  <p className="text-gray-500 font-cabinet-grotesk">Optional</p>
                </div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  type="input"
                  style={{ width: "90%" }}
                  className="p-2 rounded-lg drop-shadow-md border-2 mx-10 my-2 font-cabinet-grotesk"
                  placeholder="Please enter your first name"
                />

                {!authUser && (
                  <div>
                    <p className="ml-10 font-cabinet-grotesk">Email</p>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="input"
                      style={{ width: "90%" }}
                      className="p-2 rounded-lg drop-shadow-md border-2 mx-10 my-2 font-cabinet-grotesk"
                      placeholder="Please enter your email"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-between">
                  <p className="ml-10 font-cabinet-grotesk">Subject</p>
                  <p className="text-gray-500 font-cabinet-grotesk">Optional</p>
                </div>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  style={{ width: "90%" }}
                  placeholder="What is the message regarding?"
                  className="p-2 rounded-lg drop-shadow-md border-2 mx-10 my-2 font-cabinet-grotesk"
                  type="input"
                />

                <p className="ml-10">Message</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  style={{ width: "90%", borderColor: "rgba(229, 231, 235)" }}
                  placeholder="What's on your mind?"
                  className="p-2 rounded-lg drop-shadow-md border-2 text-sm mx-10 my-2 font-cabinet-grotesk"
                  required
                />

                <br />

                <input
                  type="submit"
                  value="Submit"
                  className="p-2 ml-10 mt-1 bg-blue-600 text-white rounded-md cursor-pointer"
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
