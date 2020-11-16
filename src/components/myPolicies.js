import Axios from 'axios';
import MaterialTable from 'material-table';
import React from 'react';
import tableIcons from './tableIcons';

export default function MyPolicies() {

  const [state, setState] = React.useState({
    columns: [
      { title: "Username", field: "username" },
      { title: "Policy", field: "policy" },
      { title: "Admin Email ID", field: "admin_email_id" },
    ],
    data: [],
    tableLoading:false
  })
  React.useEffect(()=>{
    Axios.post('http://localhost:3000/api/user/mypolicy',{username:localStorage.getItem('username')})
    .then(res=>setState({...state,data:res.data.data}))
    .catch(err=>console.log);
  },[])

 



  return (
    <div>
      <MaterialTable
      icons={tableIcons}
      title="Policies"
      columns={state.columns}
      data={state.data}
    />
      </div>
    
  );
}