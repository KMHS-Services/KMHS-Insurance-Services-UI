import React, { useState,useEffect } from "react";
import axios from '../assets/AxiosInstance'


export default function SignInSide() {
	const [state, setState] = React.useState({
		data: [],
		loading:false
	  })

  useEffect(()=>{
    axios.get('http://localhost:3000/api/stats/policy').then(res=>setState({...state,data:res.data.data})).catch(err=>console.log);
  },[])
  return (
	  <div>

		  {JSON.stringify(state.data)}
	  </div>
  );
}
