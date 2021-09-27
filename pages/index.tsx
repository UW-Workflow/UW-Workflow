import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { User } from "../models/interfaces/types/User";
import AutoComplete from '../components/AutoComplete';
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import ContactUs from "../components/contact_us"

const Home: NextPage = () => {
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
  const [showContactModal, setShowContactModal] = useState(false);
  const handleClick = async () => {
    const userResponse = await axios.post("/api/user/insertUser", {
      name: "temp1",
      email: "temp1@email.com",
      password: "hello",
    });

    const tempUser: User = userResponse.data;
    setUser(tempUser);
  };

  return (
    <div>
    <div className="row">
      <div className="col-lg-12">
        <Header></Header>
      </div>
    </div>
    <div className={styles.container}>
      <AutoComplete></AutoComplete>
      <button onClick={() => handleClick()}>Random Button to test db</button>
      <div>
        Name : ${user.name}
        password: ${user.password}
        email: ${user.email}
        id: ${user.id}
      </div>
      <footer className={styles.footer}>
        <a href="#">Teams Page</a>
        <a style={{cursor:"pointer"}} onClick={() => {setShowContactModal(true)}}>Contact Us</a>
        <ContactUs show={showContactModal} setShow={setShowContactModal}/>
      </footer>
    </div>
    </div>
  );
};

export default Home;
