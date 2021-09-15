import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import { User } from "../models/interfaces/types/User";
import AutoComplete from "../components/AutoComplete";

const Home: NextPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    id: 0,
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

  return (
    <div>
      <AutoComplete></AutoComplete>
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
