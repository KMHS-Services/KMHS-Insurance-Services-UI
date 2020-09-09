import React, { useState, useEffect } from "react";
import "./App.css";
import SignInSide from "./Pages/signIn";
import Dashboard from "./Pages/dashboard";
import SignUp from "./Pages/signUp";

export default function App() {
  const [users, setUsers] = useState([
    { username: "admin", password: "admin",name:"name",email:"email@email.com",address:"address",phoneNo:"1234567890", dob:'1/1/2000' },
  ]);
  const [signUpToggle, setSignUpToggle] = useState(false);
  const [token, setToken] = useState(null);
  let tokenSetter = (token) => {
    setToken(token);
  };
  console.log("init usestate", token);
  return (
    <div>
      {token === null ? (
        signUpToggle ? (
          <SignUp setSignUpToggle={setSignUpToggle}/>
        ) : (
          <SignInSide
            setToken={tokenSetter}
            token={token}
            users={users}
            setSignUpToggle={setSignUpToggle}
          />
        )
      ) : (
        <Dashboard setToken={tokenSetter} />
      )}
    </div>
  );
}
