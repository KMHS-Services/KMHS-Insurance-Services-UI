import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment'


export default function UserTable() {

	const [state, setState] = React.useState({
		columns: [
			{ title: "Username", field: "username", editable: 'onAdd' },
			{ title: "Password", field: "password" },
			{ title: "Name", field: "name" },
			{ title: "PhNo", field: "phonenumber", type: 'numeric' },
			{ title: "EmailID", field: "emailid" },
			{ title: "DOB", field: "DOB" },
			{ title: "Address", field: "address" },
			{ title: "Pincode", field: "pincode", type: 'numeric' },
			{ title: "Load Amount", field: "loan_amount", type: 'numeric' },
			{ title: "Premium Amount", field: "premium_amount", type: 'numeric' },
		],
		data: [],
		tableLoading: false
	});
	useEffect(() => {
		axios.get('http://localhost:3000/api/user/readall').then(res => setState({ ...state, data: res.data.data })).catch(err => console.log);

	}, []);
	const validateEmail = function (mail) {
		return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
	};
	const isValid = function ({ username, password, name, address, phonenumber, DOB,emailid,loan_amount,premium_amount,pincode }) {
		if (!emailid || emailid === '' || !validateEmail(emailid))
			return 'Invalid Email ID';
		if (!password || password.length < 8)
			return 'Invalid Password';
		if (!name || name === '')
			return 'Invalid Name';
		if (!username || username === '')
			return 'Invalid Username';
		if (!address || address === '')
			return 'Invalid Address';
		if (!emailid
			|| emailid
			=== '')
			return 'Invalid Emailid';
		if (!phonenumber
			|| `${phonenumber}`.length!==10)
			return 'Invalid Phone Number';

      if (!pincode
        || pincode
        === ''||`${pincode}`.length!==6)
        return 'Invalid Pincode';
		if (!DOB
			|| DOB.length!==10|| !moment(DOB, 'DD/MM/YYYY', true).isValid())
			return 'Invalid Date Of Birth';
		if (!loan_amount)
			return 'Invalid Loan Amount';
		if (!premium_amount)
			return 'Invalid Premium Amount';

		return true;
	};


	return (
		<MaterialTable
		Style="overflowX:'auto'"
			icons={tableIcons}
			title="Users"
			columns={state.columns}
			data={state.data}
			editable={{
				onRowAdd: (newData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];

								let validity=isValid(newData)
								if(!(validity===true)){
									alert(validity)
									return { ...prevState }
								}
								newData.id = data.length;
								axios.post('http://localhost:3000/api/user/register', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
								return prevState;
							});
						}, 600);
					}),
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							if (oldData) {
								// localStorage.setState('policies',prevState.data)
								setState((prevState) => {
									const data = [...prevState.data];

									let validity=isValid(newData)
									if(!(validity===true)){
										alert(validity)
										return { ...prevState }
									}
									data[data.indexOf(oldData)] = newData;
									axios.post('http://localhost:3000/api/user/update', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
									return { ...prevState, data };
								});
							}
						}, 600);
					}),
				onRowDelete: (oldData) =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve();
							setState((prevState) => {
								const data = [...prevState.data];
								data.splice(data.indexOf(oldData), 1);
								axios.post('http://localhost:3000/api/user/delete', { username:oldData.username }).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
}
