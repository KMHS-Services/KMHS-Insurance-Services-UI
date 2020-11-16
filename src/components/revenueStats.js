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
		title: {
			text: ""
    },
    axisX: {
      title: "Time in Milliseconds",
      reversed: true,
    },
    axisY: {
      title: "Revenue",
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
			.then(res => setState({ ...state, data: res.data.data }))
			.catch(err => console.log);
	}, [])
	return (
		<div>
			<CanvasJSChart options={options}
			/>
		</div >
	);
}
