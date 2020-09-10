import React from "react";
import MaterialTable from "material-table";
import tableIcons from "./tableIcons";

export default function PolicyTable() {
  let localData = JSON.parse(localStorage.getItem('policies'));
  if (!localData) {
    localData = [{ id: 1, name: "Jeevan", rules: "no rules", interest: 12, isActive: 0, scheme: 1 }];
  }
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Rules", field: "rules" },
      { title: "Interest(in %)", field: "interest", type: 'numeric' },
      { title: "Is Active?", field: "isActive", lookup: { 1: 'Active', 0: 'Inactive' } },
      {
        title: "Scheme",
        field: "scheme",
        lookup: { 0: "Life", 1: "Medical", 2: "Motor", 3: "Home", 4: "Travel" },
      },
    ],
    data: localData,
  });

  return (
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
                if (!newData.name || newData.name.length === 0) {
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
                if (newData.isActive !== 0 && newData.isActive !== 1) {
                  newData.isActive = 0;
                }
                if (!newData.scheme) {
                  alert('scheme field cannot be empty');
                  return {...prevState};
                }
                newData.id = data.length;

                data.push(newData);

                localStorage.setItem('policies', JSON.stringify(data));
                return { ...prevState, data };
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

                  if (!newData.name || newData.name.length === 0) {
                    alert('name field cannot be empty');
                    return { ...prevState };
                  }
                  if (!newData.rules || newData.rules.length === 0) {
                    alert('rules field cannot be empty');
                    return { ...prevState };
                  } if (newData.isActive !== 0 && newData.isActive !== 1) {
                    newData.isActive = 0;
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
                  localStorage.setItem('policies', JSON.stringify(data));
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
                localStorage.setItem('policies', JSON.stringify(data));
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
