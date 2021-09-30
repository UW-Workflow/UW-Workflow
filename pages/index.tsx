import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { User } from "../models/interfaces/types/User";
import AutoComplete from "../components/AutoComplete";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/Link'
import { useAuth } from '../context/AuthUserContext';
import {Container, Row, Col, Button} from 'reactstrap';
const Home: NextPage = () => {

  const { authUser, loading, signOut } = useAuth();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    id: 0,
  });
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    axios.get("/api/companies").then((res) => {
      setCompanies(res.data.companies);
    });
  });
  const handleClick = async () => {
    const userResponse = await axios.post("/api/user/insertUser", {
      name: "temp1",
      email: "temp1@email.com",
      password: "hello",
    });

    const tempUser: User = userResponse.data;
    setUser(tempUser);
  };

  let loggedIn= false;
  if(loading || authUser) {
    loggedIn = true;
  }

  return (
    <div>
      <div>
      {loggedIn && (
        loading ?
          <Row>
            <Col>Loading....</Col>
          </Row> :
          <>
            <Row>
              <Col>
                { authUser && <div>Congratulations {authUser?.email}! You are logged in.</div> }
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={signOut}>Sign out</Button>
              </Col>
            </Row>
          </>
      )}
      {!loggedIn && (
        <>
          <Link href="/login">Login</Link>
          <p>or</p>
          <Link href="/sign_up">Sign Up</Link>
        </>
      )}
      </div>
      <br/>
      <AutoComplete items={companies}></AutoComplete>
      <button onClick={() => handleClick()}>Random Button to test db</button>
      <div>
        Name : ${user.name}
        password: ${user.password}
        email: ${user.email}
        id: ${user.id}
      </div>
    </div>
      
  );
};

export default Home;
