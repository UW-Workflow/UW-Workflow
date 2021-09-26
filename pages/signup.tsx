import React, {useState} from 'react';
import Router from 'next/router';
import {validateEmail} from '../utils/authUtils'
import axios from "axios";
import { User } from "../models/interfaces/types/User";

const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [signupErrorSol, setSignupSol] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
          <label htmlFor="name">
            name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="name"
              required
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
              placeholder="me@uwaterloo.ca"
              required
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
    
          <br />
    
          <input type="submit" value="Submit" />
          {signupError && <p style={{color: 'red'}}>{signupError}</p>}
        </form>
      );
};

export default Signup