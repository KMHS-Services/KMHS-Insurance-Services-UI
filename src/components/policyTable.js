import React, { useEffect } from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";
import axios from 'axios'
import jsPDF from "jspdf/dist/jspdf.min.js";
import autoTable from "jspdf-autotable/dist/jspdf.plugin.autotable.min";
import { Button } from "@material-ui/core";


export default function PolicyTable() {

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "policy", editable:'onAdd' },
      { title: "Rules", field: "rules" },
      { title: "Interest(in %)", field: "interest", type: 'numeric' },
      { title: "Is Active?", field: "is_active", lookup: { 0: 'Inactive' ,1: 'Active'} },
      {
        title: "Scheme",
        field: "scheme",
        lookup: { 0: "Life", 1: "Medical", 2: "Motor", 3: "Home", 4: "Travel" },
      },
    ],
    data: [],
    tableLoading:false
  })
  useEffect(()=>{
    axios.get('http://localhost:3000/api/policy/readall').then(res=>setState({...state,data:res.data.data})).catch(err=>console.log);

  },[])

  function pdfGenerator() {
		console.log("pdf generator");
		var doc = new jsPDF("p", "pt", "a4");
		let temp = "Policies";
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
			}
		}
		)
		doc.autoTable(columns, state.data, options);
		console.log(doc)
		var name = 'Policy-'+ new Date().toLocaleString();
		doc.save(name);
	}



  return (
    <div>
			<Button onClick={pdfGenerator}>
				Generate PDF
			</Button>
      <MaterialTable
      icons={tableIcons}
      title="Policies"
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
                if (newData.is_active !== 0 &&newData.is_active !== '0' && newData.is_active !== 1&&newData.is_active !== '1') {
                  newData.is_active = 0;
                }
                if (!newData.scheme) {
                  alert('scheme field cannot be empty');
                  return {...prevState};
                }
                newData.id = data.length;
                axios.post('http://localhost:3000/api/policy/create',newData).then(res=>{window.location.reload(true)}).catch(err=>{alert(err.message)})
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
                  if (newData.is_active !== 0 &&newData.is_active !== '0' && newData.is_active !== 1&&newData.is_active !== '1') {
                    newData.is_active = 0;
                  }
                  if (!newData.scheme) {
                    alert('scheme field cannot be empty');
                    return {...prevState};
                  }
                  console.log(newData.interest);
                  if (!newData.interest || `${newData.interest}`.length === 0 || newData.interest < 0 || newData.interest > 100) {
                    alert('interest must be in the range of 0 to 100');
                    return { ...prevState };
                  }
                  data[data.indexOf(oldData)] = newData;
                  // localStorage.setItem('policies', JSON.stringify(data));
                  axios.post('http://localhost:3000/api/policy/update',newData).then(res=>{window.location.reload(true)}).catch(err=>{alert(err.message)})
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
                let policy=oldData.policy
                console.log(policy);
                // localStorage.setItem('policies', JSON.stringify(data));
                axios.post('http://localhost:3000/api/policy/delete',{policy}).then(res=>{window.location.reload(true)}).catch(err=>{alert(err.message)})
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
      </div>
    
  );
}
