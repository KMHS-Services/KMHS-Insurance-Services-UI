import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment'


export default function StaffTable() {

	const [state, setState] = React.useState({
		columns: [
			{ title: "DOB", field: "DOB"},
			{ title: "Name", field: "name" },
			{ title: "Address", field: "address" },
			{ title: "Phone Number", field: "phone_number", type:'numeric' },
      { title: "Blood Group", field: "blood_group", lookup: { 'O+': 'O+', 'A+': 'A+', 'B+': 'B+', 'AB+': 'AB+', 'O-': 'O-', 'A-': 'A-', 'B-': 'B-', 'AB-': 'AB-', } },
			{ title: "Email", field: "email_id" },
		],
		data: [],
		tableLoading: false
	});
	useEffect(() => {
		axios.get('http://localhost:3000/api/staff/readall').then(res => setState({ ...state, data: res.data.data })).catch(err => console.log);

	}, []);
	const validateEmail = function (mail) {
		return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
	};
	const isValid = function ({ DOB,name,address,phone_number,email_id }) {
		if (!email_id || email_id === '' || !validateEmail(email_id))
			return 'Invalid Email ID';
		if (!name || name === '')
			return 'Invalid Name';
		if (!address
			|| address
			=== '')
			return 'Invalid Address';
		if (!phone_number
			|| `${phone_number}`.length!==10)
			return 'Invalid Phone Number';

		if (!DOB
			|| DOB.length!==10|| !moment(DOB, 'DD/MM/YYYY', true).isValid())
			return 'Invalid Date Of Birth';

		return true;
	};


	return (
		<MaterialTable
		Style="overflowX:'auto'"
			icons={tableIcons}
			title="Staff"
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
								axios.post('http://localhost:3000/api/staff/create', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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
									axios.post('http://localhost:3000/api/staff/update', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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
								// localStorage.setItem('policies', JSON.stringify(data));
								axios.post('http://localhost:3000/api/staff/delete', { staff_id:oldData.staff_id }).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
}
