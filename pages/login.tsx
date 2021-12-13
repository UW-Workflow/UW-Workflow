import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../context/AuthUserContext";
import { Modal } from "../components/Modal";
import { MainContainer } from "../components/MainContainer";
import { ROUTES } from "../constants/routes";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loginErrorSol, setLoginErrorSol] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setLoginError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        router.push("/");
      })
      .catch((error) => {
        setLoginError(error.message);
      });
    event.preventDefault();
  };

  const onClick = (event) => {
    router.push("/");
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Modal>
        <Form onSubmit={onSubmit}>
          {loginError && <Alert color="danger">{loginError}</Alert>}
          <div className="min-w-400 max-w-400">
            <button onClick={onClick} className="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="min-w-20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-center text-black">
              Let&apos;s get you signed in
            </h2>
            <p className="mt-2 text-xs text-gray-600 text-center">
              Please make sure you use your uwaterloo email id to sign up.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <label className="block">
                <span className="text-black">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                  className="
                    mt-1
                    block
                    min-w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                />
              </label>
              <label className="block">
                <span className="text-black">Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                  className="
                    mt-1
                    block
                    min-w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                />
              </label>
              {/* TODO: link to Forgot password */}
              <Link href={ROUTES.FOUR_ZERO_FOUR}>
                <p className="hover:text-light-black hover:font-bold font-medium text-login-blue ml-2 font-cabinet-grotesk text-sm text-right">
                  {" "}
                  Forgot Password?
                </p>
              </Link>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <button className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full">
                      Log In
                    </button>
                  </div>
                  <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">
                    Don&apos;t have an account?
                    <Link href={ROUTES.SIGN_UP}>
                      <span className="hover:text-light-black hover:font-bold font-medium text-login-blue">
                        {" "}
                        Sign up
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </MainContainer>
  );
};

export default Login;
