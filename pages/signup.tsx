import React, {useState} from 'react';
import Router from 'next/router';

const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [signupErrorSol, setSignupSol] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confimPassword, setConfirmPassword] = useState('');

    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit}>
          <p>Sign Up</p>
          <label htmlFor="name">
            name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              type="name"
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
            />
          </label>
    
          <br />
    
          <input type="submit" value="Submit" />
          {signupError && <p style={{color: 'red'}}>{signupError}</p>}
        </form>
      );
};

export default Signup;