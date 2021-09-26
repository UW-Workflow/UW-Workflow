import React, {useState} from 'react';
import Router from 'next/router';
<<<<<<< HEAD
import {validateEmail} from '../utils/authUtils'
import axios from "axios";
import { User } from "../models/interfaces/types/User";
=======
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7

const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [signupErrorSol, setSignupSol] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
<<<<<<< HEAD
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async() => {
      if(!validateEmail(email)) {
        setSignupError('Not a valid email');
        setSignupSol('Please use your @uwaterloo.ca email');
      } else {
        const userResponse = await axios.post("/api/user/insertUser", {
          name: name,
          email: email,
          password: password,
        });
        const tempUser: User = userResponse.data;
        setName(tempUser.name);
        setEmail(tempUser.email);
        setPassword(tempUser.password);
        Router.push('/');
      }
    }
    return (
        <form onSubmit={handleSubmit}>
          <p>Sign Up with your uwaterloo.ca email</p>
=======
    const [confimPassword, setConfirmPassword] = useState('');

    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit}>
          <p>Sign Up</p>
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7
          <label htmlFor="name">
            name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="name"
<<<<<<< HEAD
              required
=======
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7
            />
          </label>
    
          <br />

          <label htmlFor="email">
            email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
<<<<<<< HEAD
              placeholder="me@uwaterloo.ca"
              required
=======
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7
            />
          </label>
    
          <br />
    
          <label htmlFor="password">
            password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
<<<<<<< HEAD
              required
            />
          </label>
          
          {/* <label htmlFor="confirmPassword">
          confirmPassword
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              type="password"
              required
            />
          </label> */}
=======
            />
          </label>
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7
    
          <br />
    
          <input type="submit" value="Submit" />
          {signupError && <p style={{color: 'red'}}>{signupError}</p>}
        </form>
      );
};

<<<<<<< HEAD
export default Signup
=======
export default Signup;
>>>>>>> 2ee3fbcbb9e61709a8d96d65d42f53abeae93da7
