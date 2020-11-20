import React, { useState, useEffect } from "react";
import axios from '../assets/AxiosInstance'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export default function RevenueStats() {

	const [state, setState] = React.useState({
		data: [],
		loading: false
	})
	const options = {
		exportEnabled: true,animationEnabled: true,
		title:{
			text: "Revenue Statistics"
		},
    axisX: {
      title: "Time in Milliseconds",
      reversed: true,
    },
    axisY: {
	  title: "Revenue",
	  includeZero: false
    },
		data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "line",
				dataPoints: state.data,
			}
		]
	}
	useEffect(() => {
		axios.get('http://localhost:3000/api/stats/financegraph')
			.then(res =>{ console.log(res.data.data);setState({ ...state, data: res.data.data })})
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
			<CanvasJSChart options={options}
			/>
		</div >
	);
}
