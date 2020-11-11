import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment'
import jsPDF from "jspdf/dist/jspdf.min.js";
import autoTable from "jspdf-autotable/dist/jspdf.plugin.autotable.min";
import { Button } from "@material-ui/core";


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

	function pdfGenerator() {
		console.log("pdf generator");
		var doc = new jsPDF("p", "pt", "a4");
		let temp = "Users";
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
			if(q.title !== "Password" && q.title !== "Address" )
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
		var name = 'User-'+ new Date().toLocaleString();
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
		</div>
		
	);
}
