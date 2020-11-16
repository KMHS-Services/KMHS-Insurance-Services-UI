import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment';
import jsPDF from "jspdf/dist/jspdf.min.js";
import autoTable from "jspdf-autotable/dist/jspdf.plugin.autotable.min";
import { Button } from "@material-ui/core";


export default function StaffTable() {

	const [state, setState] = React.useState({
		columns: [
			{ title: "Username", field: "username", editable: 'never' },
			{ title: "Policy", field: "policy", editable: 'never' },
			{ title: "Admin Email ID", field: "admin_email_id", lookup: {} },
		],
		data: [],
		tableLoading: false
	});
	useEffect(() => {
		axios.get('http://localhost:3000/api/policytaken/readall')
			.then(res => {
				var data = [...res.data.data]; axios.get('http://localhost:3000/api/policy/pickpolicy').then(res => {
					var lookup = {}
					res.data.admins.map((q) => {
						lookup[q] = q
					});
					setState({
						...state, columns: [
							{ title: "Username", field: "username", editable: 'onAdd' },
							{ title: "Policy", field: "policy", editable: 'onAdd' },
							{ title: "Admin Email ID", field: "admin_email_id", lookup: { ...lookup } },
						], data: [...data]
					})
				})
			})


		// 	setState({
		// 		...state, columns: [{ title: "Username", field: "username", editable: 'never' },
		// 		{ title: "Policy", field: "policy", editable: 'never' },
		// 		{ title: "Admin Email ID", field: "admin_email_id", lookup: { ...lookup } }]
		// 	})
		// }).catch(err => console.log);

	}, []);
	const validateEmail = function (mail) {
		return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
	};
	const isValid = function ({ DOB, name, address, phone_number, email_id }) {
		if (!email_id || email_id === '' || !validateEmail(email_id))
			return 'Invalid Email ID';
		if (!name || name === '')
			return 'Invalid Name';
		if (!address
			|| address
			=== '')
			return 'Invalid Address';
		if (!phone_number
			|| `${phone_number}`.length !== 10)
			return 'Invalid Phone Number';

		if (!DOB
			|| DOB.length !== 10 || !moment(DOB, 'DD/MM/YYYY', true).isValid())
			return 'Invalid Date Of Birth';

		return true;
	};



	return (
		<div>
			<MaterialTable
				Style="overflowX:'auto'"
				icons={tableIcons}
				title="Policies Taken"
				columns={state.columns}
				data={state.data}
				editable={{
					onRowAdd: (newData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								setState((prevState) => {
									const data = [...prevState.data];

									let validity = isValid(newData);
									if (!(validity === true)) {
										alert(validity);
										return { ...prevState };
									}
									newData.id = data.length;
									axios.post('http://localhost:3000/api/policytaken/create', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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

										let validity = isValid(newData);
										if (!(validity === true)) {
											alert(validity);
											return { ...prevState };
										}
										data[data.indexOf(oldData)] = newData;
										axios.post('http://localhost:3000/api/policytaken/update', newData).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
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
									axios.post('http://localhost:3000/api/policytaken/delete', { staff_id: oldData.staff_id }).then(res => { window.location.reload(true); }).catch(err => { alert(err.message); });
									return { ...prevState, data };
								});
							}, 600);
						}),
				}}
			/>
		</div>

	);
}
