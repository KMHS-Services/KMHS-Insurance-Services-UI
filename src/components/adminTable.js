import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment'


export default function AdminTable() {

	const [state, setState] = React.useState({
		columns: [
			{ title: "Email", field: "admin_email_id", editable: 'onAdd' },
			{ title: "Password", field: "admin_password" },
			{ title: "Name", field: "admin_name" },
			{ title: "Address", field: "admin_address" },
			{ title: "Pincode", field: "admin_pincode", type: 'numeric' },
			{ title: "PhNo", field: "admin_phone_number", type: 'numeric' },
			{ title: "DOB", field: "admin_DOB" },
			{ title: "Blood Group", field: "admin_blood_group", lookup: { 'O+': 'O+', 'A+': 'A+', 'B+': 'B+', 'AB+': 'AB+', 'O-': 'O-', 'A-': 'A-', 'B-': 'B-', 'AB-': 'AB-', } },
		],
		data: [],
		tableLoading: false
	});
	useEffect(() => {
		axios.get('http://localhost:3000/api/admin/readall').then(res => setState({ ...state, data: res.data.data })).catch(err => console.log);

	}, []);
	const validateEmail = function (mail) {
		return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
	};
	const isValid = function ({ admin_email_id, admin_password, admin_name, admin_address, admin_pincode, admin_phone_number, admin_DOB, admin_blood_group }) {
		if (!admin_email_id || admin_email_id === '' || !validateEmail(admin_email_id))
			return 'Invalid Email ID';
		if (!admin_password || admin_password.length < 8)
			return 'Invalid Password';
		if (!admin_name || admin_name === '')
			return 'Invalid Name';
		if (!admin_address
			|| admin_address
			=== '')
			return 'Invalid Address';
		if (!admin_pincode
			|| admin_pincode
			=== ''||`${admin_pincode}`.length!==6)
			return 'Invalid Pincode';
		if (!admin_phone_number
			|| `${admin_phone_number}`.length!==10)
			return 'Invalid Phone Number';

		if (!admin_DOB
			|| admin_DOB.length!==10|| !moment(admin_DOB, 'DD/MM/YYYY', true).isValid())
			return 'Invalid Date Of Birth';

		return true;
	};


	return (
		<MaterialTable
		Style="overflowX:'auto'"
			icons={tableIcons}
			title="Admins"
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
								axios.post('http://localhost:3000/api/admin/register', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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
									axios.post('http://localhost:3000/api/admin/update', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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
								axios.post('http://localhost:3000/api/admin/delete', { admin_email_id:oldData.admin_email_id }).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
}
