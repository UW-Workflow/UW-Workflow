import React, {useState} from 'react';
import Router from 'next/router';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [loginErrorSol, setLoginErrorSol] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit}>
          <p>Login</p>
          <label htmlFor="email">
            email
            <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br/>
          <label htmlFor="password">
            password
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br/>
          <input type="submit" value="Submit" />
          {loginError && <p style={{color: 'red'}}>{loginError}</p>}
          {loginError && loginErrorSol && <p style={{color: 'black'}}>{loginErrorSol}</p>}
        </form>
      );
};

export default Login;