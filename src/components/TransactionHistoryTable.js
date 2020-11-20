import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios';
import moment from 'moment';
import jsPDF from "jspdf/dist/jspdf.min.js";
import autoTable from "jspdf-autotable/dist/jspdf.plugin.autotable.min";
import { Button } from "@material-ui/core";


export default function TransactionHistoryTable() {

	const [state, setState] = React.useState({
		columns: [
			{ title: "Username", field: "username", editable: 'onAdd', lookup: {} },
			{ title: "Transaction Time", field: "transaction_time", editable: 'never' },
			{ title: "Transaction Amount", field: "transaction_amount", editable: 'onAdd' },
		],
		data: [],
		tableLoading: false
	});
	function pdfGenerator() {
		console.log("pdf generator");
		var doc = new jsPDF("p", "pt", "a4");
		let temp = "Transaction History";
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
			return {
				label: q.title,
				title: q.title,
				field: q.field,
				dataKey: q.field
			};
		}
		);
		doc.autoTable(columns, state.data, options);
		console.log(doc);
		var name = 'TransactionHistory-' + new Date().toLocaleString();
		doc.save(name);
	}
	useEffect(() => {
		axios.get('http://localhost:3000/api/transaction/readall')
			.then(res => {
				var data = [...res.data.data]; axios.get('http://localhost:3000/api/policy/pickpolicy').then(res => {
					var users_lookup = {};

					res.data.users.map((q) => {
						users_lookup[q] = q;
					});
					setState({
						...state, columns: [
							{ title: "Username", field: "username", editable: 'onAdd', lookup: { ...users_lookup } },
							{ title: "Transaction Time", field: "transaction_localetime", editable: 'never' },
							{ title: "Transaction Amount", field: "transaction_amount", editable: 'onAdd' },
						], data: [...data]
					});
				});
			});


		// 	setState({
		// 		...state, columns: [{ title: "Username", field: "username", editable: 'never' },
		// 		{ title: "Policy", field: "policy", editable: 'never' },
		// 		{ title: "Admin Email ID", field: "admin_email_id", lookup: { ...lookup } }]
		// 	})
		// }).catch(err => console.log);

	}, []);





	return (
		<div>
			<Button onClick={pdfGenerator}>
				Generate PDF
			</Button>
			<MaterialTable
				Style="overflowX:'auto'"
				icons={tableIcons}
				title="Transaction History"
				columns={state.columns}
				data={state.data}
				editable={{
					onRowAdd: (newData) =>
						new Promise((resolve) => {
							setTimeout(() => {
								resolve();
								setState((prevState) => {
									const data = [...prevState.data];
									if (newData.transaction_amount < 0) {
										alert("Transaction Amount cannot be negative!");
										return prevState;
									}
									newData.id = data.length;
									axios.post('http://localhost:3000/api/transaction/create', newData).then(res => { window.location.reload(true); }).catch(err => {
										if (err.response) {
											console.log(err.response.data.message);
											alert(err.response.data.message);
										} else {
											alert('Not connected to Internet');
										}
									});
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

										data[data.indexOf(oldData)] = newData;
										axios.post('http://localhost:3000/api/transaction/update', newData).then(res => { window.location.reload(true); }).catch(err => {
											if (err.response) {
												console.log(err.response.data.message);
												alert(err.response.data.message);
											} else {
												alert('Not connected to Internet');
											}
										});
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
									axios.post('http://localhost:3000/api/transaction/delete', oldData).then(res => { window.location.reload(true); }).catch(err => {
										if (err.response) {
											console.log(err.response.data.message);
											alert(err.response.data.message);
										} else {
											alert('Not connected to Internet');
										}
									});
									return { ...prevState, data };
								});
							}, 600);
						}),
				}}
			/>
		</div>

	);
}
