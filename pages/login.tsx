import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';
import { Modal } from "../components/Modal";
import { MainContainer } from '../components/MainContainer';
import { ROUTES } from "../constants/routes";

import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [loginErrorSol, setLoginErrorSol] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { signInWithEmailAndPassword } = useAuth()

    const onSubmit = event => {
      setLoginError(null)
      signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("Success. The user is created in firebase")
        router.push('/');
      })
      .catch(error => {
        setLoginError(error.message)
      });
      event.preventDefault();
    };
    return (
      <MainContainer><Modal>
          <Form onSubmit={onSubmit}>
          { loginError && <Alert color="danger">{loginError}</Alert>}
          <div className="min-w-400 max-w-400">
          <h2 className="text-xl font-bold text-center text-black">Let's get you signed in</h2>
          <p className="mt-2 text-xs text-gray-600 text-center">Please make sure you use your uwaterloo email id to sign up.</p>
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
                  " />
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
                  " />
              </label> 
              {/* TODO: link to Forgot password */}
              <Link href={ROUTES.FOUR_ZERO_FOUR}>
                <p className="hover:text-light-black hover:font-bold font-medium text-login-blue ml-2 font-cabinet-grotesk text-sm text-right"> Forgot Password?</p>
              </Link>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <button className="bg-login-blue text-white py-2 px-4  pl-10 pr-10 rounded-2xl min-w-full">Log In</button>
                  </div>
                    <p className="ml-2 font-cabinet-grotesk text-sm text-center self-center">Don't have an account?  
                      <Link href={ROUTES.SIGN_UP}>
                        <span className="hover:text-light-black hover:font-bold font-medium text-login-blue"> Sign up</span>
                      </Link></p>
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
