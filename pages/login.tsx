import { useState } from 'react';
import Link from 'next/Link';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthUserContext';

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
      <Container className="text-center" style={{ padding: '40px 0px'}}>
      <Row>
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      <Row style={{maxWidth: '400px', margin: 'auto'}}>
        <Col>
          <Form onSubmit={onSubmit}>
          { loginError && <Alert color="danger">{loginError}</Alert>}
            <FormGroup row>
              <Label for="loginEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="loginPassword" sm={4}>Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
             <Col>
               <Button>Login</Button>
             </Col>
           </FormGroup>
           <FormGroup row>
            <Col>
              No account? <Link href="/sign_up">Create one</Link>
            </Col>
          </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
        // <form onSubmit={handleSubmit}>
        //   <p>Login</p>
        //   <label htmlFor="email">
        //     email
        //     <input
        //         name="email"
        //         type="email"
        //         value={email}
        //         onChange={(e) => setEmail(e.target.value)}
        //     />
        //   </label>
        //   <br/>
        //   <label htmlFor="password">
        //     password
        //     <input
        //         name="password"
        //         type="password"
        //         value={password}
        //         onChange={(e) => setPassword(e.target.value)}
        //     />
        //   </label>
        //   <br/>
        //   <input type="submit" value="Submit" />
        //   {loginError && <p style={{color: 'red'}}>{loginError}</p>}
        //   {loginError && loginErrorSol && <p style={{color: 'black'}}>{loginErrorSol}</p>}
        // </form>
      );
};

export default Login;
