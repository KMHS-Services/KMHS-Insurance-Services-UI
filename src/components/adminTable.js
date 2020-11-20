import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment'
import jsPDF from "jspdf/dist/jspdf.min.js";
import autoTable from "jspdf-autotable/dist/jspdf.plugin.autotable.min";
import { Button } from "@material-ui/core";


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
		axios.get('http://localhost:3000/api/admin/readall').then(res => setState({ ...state, data: res.data.data })).catch(err => {
			if (err.response) {
			  console.log(err.response.data.message);
			  alert(err.response.data.message)
			}else{
			  alert('Not connected to Internet')
			}
		  })

	}, []);
	const validateEmail = function (mail) {
		return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
	};
	const isValid = function ({ admin_email_id, admin_password, admin_name, admin_address, admin_pincode, admin_phone_number, admin_DOB, admin_blood_group }) {
		if (admin_password ==='~')
			return 'You cannot change the details of this admin without password!'
		if (!admin_email_id || admin_email_id === '' || !validateEmail(admin_email_id))
			return 'Invalid Email ID';
		if ( !admin_password || admin_password.length < 8)
			return 'Invalid Password';
		if (!admin_name || admin_name === '')
			return 'Invalid Name';
		if (!admin_address
			|| admin_address
			=== '')
			return 'Invalid Address';
		if (!admin_pincode
			|| admin_pincode
			=== '' || `${admin_pincode}`.length !== 6)
			return 'Invalid Pincode';
		if (!admin_phone_number
			|| `${admin_phone_number}`.length !== 10)
			return 'Invalid Phone Number';

		if (!admin_DOB
			|| admin_DOB.length !== 10 || !moment(admin_DOB, 'DD/MM/YYYY', true).isValid())
			return 'Invalid Date Of Birth';

		return true;
	};
	function pdfGenerator() {
		console.log("pdf generator");
		var doc = new jsPDF("p", "pt", "a4");
		let temp = "Admins";
		var textWidth =
			(doc.getStringUnitWidth(temp) * doc.internal.getFontSize()) /
			doc.internal.scaleFactor;
		var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
		var header = function (data) {
			doc.setFontSize(18);
			doc.setTextColor(40);
			doc.setFontStyle("bold");
			doc.text(textOffset, 40, temp);
		};
		var options = {
			beforePageContent: header,
			margin: {
				top: 80,
			},
			headStyles: {
				valign: "middle",
				halign: "center",
			},
			startY: doc.autoTableEndPosY() + 70,
		};
		doc.setTextColor(40);
		var columns = state.columns.map((q) => {
			if(q.title !== "Password")
			return {
				label: q.title,
				title: q.title,
				field: q.field,
				dataKey: q.field
			}
		}
		)
		doc.autoTable(columns, state.data, options);
		console.log(doc)
		var name = 'Admin-' + new Date().toLocaleString();
		doc.save(name);
	}


	return (
		<div>
			<Button onClick={pdfGenerator}>
				Generate PDF
			</Button>
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

									let validity = isValid(newData)
									if (!(validity === true)) {
										alert(validity)
										return { ...prevState }
									}
									newData.id = data.length;
									axios.post('http://localhost:3000/api/admin/register', newData).then(res => { window.location.reload(true); }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          alert(err.response.data.message)
        }else{
          alert('Not connected to Internet')
        }
      })
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

										let validity = isValid(newData)
										if (!(validity === true)) {
											alert(validity)
											return { ...prevState }
										}
										data[data.indexOf(oldData)] = newData;
										axios.post('http://localhost:3000/api/admin/update', newData).then(res => { window.location.reload(true); }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          alert(err.response.data.message)
        }else{
          alert('Not connected to Internet')
        }
      })
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
									axios.post('http://localhost:3000/api/admin/delete', { admin_email_id: oldData.admin_email_id }).then(res => { window.location.reload(true); }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message);
          alert(err.response.data.message)
        }else{
          alert('Not connected to Internet')
        }
      })
									return { ...prevState, data };
								});
							}, 600);
						}),
				}}
			/>
		</div>

	);
}
