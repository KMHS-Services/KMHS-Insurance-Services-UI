import React, { useState } from "react";
import "./App.css";
import SignInSide from "./Pages/signIn";
import Dashboard from "./Pages/dashboard";
import SignUp from "./Pages/userSignUp";

export default function App() {
  let localUsers = JSON.parse(localStorage.getItem('users'));

  if (!localUsers) {
    localUsers = [
      { username: "admin", password: "admin", name: "name", email: "email@email.com", address: "address", phoneNo: "1234567890", dob: '1/1/2000' },
    ];
  }
  const [users, setUsers] = useState(localUsers);

  const [signUpToggle, setSignUpToggle] = useState(false);
  let localToken=localStorage.getItem('token');
  if (!localToken)localToken=null;
  const [token, setToken] = useState(localToken);
  return (
    <div>
      {token === null ? (
        signUpToggle ? (
          <SignUp setSignUpToggle={setSignUpToggle} setUsers={setUsers} users={users} />
        ) : (
            <SignInSide
              setToken={setToken}
              token={token}
              users={users}
              setSignUpToggle={setSignUpToggle}
            />
          )
      ) : (
          <Dashboard setToken={setToken} token={token} />
        )}
    </div>
  );
}