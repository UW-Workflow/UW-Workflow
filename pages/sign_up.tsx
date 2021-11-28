import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import {validateEmail} from '../utils/authUtils'
import { Modal } from "../components/Modal";
import { MainContainer } from '../components/MainContainer';
import { ROUTES } from "../constants/routes";
import Link from "next/link";

import {Form, Alert} from 'reactstrap';


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const router = useRouter();
  const [error, setError] = useState(null);

  const { createUserWithEmailAndPassword } = useAuth();

  const onSubmit = event => {
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if(!validateEmail(email)) {
        setError("Please sign up with your uwaterloo email");
    } else {
        if(passwordOne === passwordTwo)
        createUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            console.log("Success. The user is created in Firebase")
            router.push("/home");
        })
        .catch(error => {
            // An error occurred. Set error message to be displayed to user
            setError(error.message)
        });
        else
        setError("Password do not match")
    }
    event.preventDefault();
  };

  return (
    <MainContainer><Modal>
          <Form 
            className="custom-form"
            onSubmit={onSubmit}>
          { error && <Alert color="danger">{error}</Alert>}
          <div className="min-w-400 max-w-400">
          <h2 className="text-xl font-bold text-center text-black">Get Started</h2>
          <p className="mt-2 text-xs text-gray-600 text-center">Please make sure you use your uwaterloo email id to sign up.</p>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <label className="block">
                <span className="text-black">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="signUpEmail"
                  placeholder="example@uwaterloo.ca"
                  className="
                    mt-1
                    block
                    min-w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " />
              </label>
              <label className="block">
                <span className="text-black">Password</span>
                <input
                  type="password"
                  name="passwordOne"
                  value={passwordOne}
                  onChange={(event) => setPasswordOne(event.target.value)}
                  id="signUpPassword"
                  placeholder="Enter a password"
                  className="
                    mt-1
                    block
                    min-w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " />
              </label>
              <label className="block">
                <span className="text-black">Confirm Password</span>
                <input
                  type="password"
                  name="password"
                  value={passwordTwo}
                  onChange={(event) => setPasswordTwo(event.target.value)}
                  id="signUpPassword2"
                  placeholder="Re-enter your password"
                  className="
                    mt-1
                    block
                    min-w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " />
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                        checked
                      />
                      <span className="ml-2">By signing up, you agree to our Terms and Conditions</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <button className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full">Sign Up</button>
                  </div>
                  <div className="items-center mt-2">
                    <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">Already have an account?  
                      <Link href={ROUTES.LOG_IN}>
                        <span className="hover:text-light-black hover:font-bold font-medium text-login-blue"> Log In</span>
                      </Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
    </Modal>
    </MainContainer>
  )
}

export default SignUp;