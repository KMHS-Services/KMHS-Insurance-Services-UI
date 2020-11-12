import React, { useState, useEffect } from "react";
import axios from '../assets/AxiosInstance'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export default function SignInSide() {

	const [state, setState] = React.useState({
		data: [],
		loading: false
	})
	const options = {
		title: {
			text: ""
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
				axios.get('http://localhost:3000/api/stats/policy').then(res => setState({ ...state, data: res.data.data })).catch(err => console.log);
			}, [])
  return(
	  <div>
		<CanvasJSChart options={options}
		/* onRef={ref => this.chart = ref} */
		/>
	{ JSON.stringify(state.data) }
	  </div >
  );
}
