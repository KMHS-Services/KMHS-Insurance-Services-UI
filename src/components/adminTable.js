import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';


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
			return false;
		if (!admin_password || admin_password.length < 8)
			return false;
		if (!admin_name || admin_name === '')
			return false;
		if (!admin_address
			|| admin_address
			=== '')
			return false;
		if (!admin_pincode
			|| admin_pincode
			=== '')
			return false;
		if (!admin_phone_number
			|| admin_phone_number
			=== '')
			return false;
		if (!admin_DOB
			|| admin_DOB.length===10||admin_DOB)
			return false;

		return true;
	};


	return (
		<MaterialTable
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
								if (!newData.policy || newData.policy.length === 0) {
									alert('name field cannot be empty');
									return { ...prevState };
								}
								if (!newData.rules || newData.rules.length === 0) {
									alert('rules field cannot be empty');
									return { ...prevState };
								}
								if (!newData.interest || `${newData.interest}`.length === 0 || newData.interest < 0 || newData.interest > 100) {
									alert('interest must be in the range of 0 to 100');
									return { ...prevState };
								}
								if (newData.is_active !== 0 && newData.is_active !== '0' && newData.is_active !== 1 && newData.is_active !== '1') {
									newData.is_active = 0;
								}
								if (!newData.scheme) {
									alert('scheme field cannot be empty');
									return { ...prevState };
								}
								newData.id = data.length;
								axios.post('http://localhost:3000/api/admin/create', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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

									if (!newData.policy || newData.policy.length === 0) {
										alert('name field cannot be empty');
										return { ...prevState };
									}
									if (!newData.rules || newData.rules.length === 0) {
										alert('rules field cannot be empty');
										return { ...prevState };
									}
									if (newData.is_active !== 0 && newData.is_active !== '0' && newData.is_active !== 1 && newData.is_active !== '1') {
										newData.is_active = 0;
									}
									if (!newData.scheme) {
										alert('scheme field cannot be empty');
										return { ...prevState };
									}
									console.log(newData.interest);
									if (!newData.interest || `${newData.interest}`.length === 0 || newData.interest < 0 || newData.interest > 100) {
										alert('interest must be in the range of 0 to 100');
										return { ...prevState };
									}
									data[data.indexOf(oldData)] = newData;
									// localStorage.setItem('policies', JSON.stringify(data));
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
								let policy = oldData.policy;
								console.log(policy);
								// localStorage.setItem('policies', JSON.stringify(data));
								axios.post('http://localhost:3000/api/policy/delete', { policy }).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
								return { ...prevState, data };
							});
						}, 600);
					}),
			}}
		/>
	);
}
