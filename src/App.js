import React, { useState, useEffect } from "react";
import "./App.css";
import SignInSide from "./Pages/signIn";
import Dashboard from "./Pages/dashboard";

export default function App() {
  
  const [token, setToken] = useState(null);
  let tokenSetter=(token)=>{
    setToken(token)
  }
  console.log('init usestate',token);
  return (
    <div>
      {token === null ? (
        <SignInSide setToken={tokenSetter} token={token} />
      ) : (
        <Dashboard setToken={tokenSetter}/>
      )}
    </div>
  );
}
