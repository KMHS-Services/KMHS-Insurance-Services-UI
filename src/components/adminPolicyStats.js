import Axios from 'axios';
import React, { Component, useState } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const AdminPolicyStats =()=> {
  const [state, setState] = React.useState({
    data: [],
    loading: false
  })

		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Number of Policies under Management"
			},
			axisX: {
				title: "Admin",
				reversed: true,
			},
			axisY: {
				title: "Number Of Policies",
			},
			data: [{
				type: "bar",
				dataPoints: state.data
			}]
		}
		React.useEffect(() => {
      Axios.get('http://localhost:3000/api/stats/adminpolicies')
        .then(res => setState({ ...state, data: res.data.data }))
        .catch(err => {
			if (err.response) {
			  console.log(err.response.data.message);
			  alert(err.response.data.message)
			}else{
			  alert('Not connected to Internet')
			}
		  })
    }, [])
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}

export default AdminPolicyStats;