import React, { useState, useEffect } from "react";
import axios from '../assets/AxiosInstance'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export default function PolicyStats() {

	const [state, setState] = React.useState({
		data: [],
		loading: false
	})
	const options = {
		title: {
			text: "Policy Statistics"
		},
		data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: state.data,
			}
		]
	}
	useEffect(() => {
		axios.get('http://localhost:3000/api/stats/policy')
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
			<CanvasJSChart options={options}
			/* onRef={ref => this.chart = ref} */
			/>
		</div >
	);
}
