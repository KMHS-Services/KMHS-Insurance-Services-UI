import React, { useState, useEffect } from "react";
import axios from '../assets/AxiosInstance'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const _MS_PER_DAY = 1000 * 60 * 60 * 24 * 365;

// a and b are javascript Date objects




export default function SignInSide() {

  const [state, setState] = React.useState({
    data: [],
    loading: false
  })
  const options = {
    title: {
      text: "Age Of Employees"
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "pie",
        dataPoints: state.data,
      }
    ]
  }
  function getDate(d)
{
    var day, month, year;

    let result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
    if(null != result) {
        let dateSplitted = result[0].split(result[1]);
        day = dateSplitted[0];
        month = dateSplitted[1];
        year = dateSplitted[2];
    }
    result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
    if(null != result) {
        let dateSplitted = result[0].split(result[1]);
        day = dateSplitted[2];
        month = dateSplitted[1];
        year = dateSplitted[0];
    }

    if(month>12) {
        let aux = day;
        day = month;
        month = aux;
    }

    return month+"/"+day+"/"+year;
}
  useEffect(() => {
    let ageData = [{label:"<20",y:0},{label:"20-30",y:0},{label:"30-40",y:0}]
    
    axios.get('http://localhost:3000/api/stats/age')
      .then(res => { 
        res.data.data.map((q) => {
          var today = new Date();
          var dd = today.getDate();

          var mm = today.getMonth() + 1;
          var yyyy = today.getFullYear();
          if (dd < 10) {
            dd = '0' + dd;
          }

          if (mm < 10) {
            mm = '0' + mm;
          }
          today = mm + '/' + dd + '/' + yyyy;
          const date1 = new Date(getDate(today));
          const date2 = new Date(getDate(q.dob));
          const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
          const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    
       
          const diffTime = Math.floor((utc1 - utc2) / _MS_PER_DAY);
          console.log(diffTime + " years");
          if(diffTime<20)
          ageData = ageData.map((q)=>{
            if(q.label === "<20")
            q.y+=1
            return q
          })
          else if(diffTime>=20 && diffTime<30)
          ageData = ageData.map((q)=>{
            if(q.label === "20-30")
            q.y+=1
            return q
          })
          else
          ageData = ageData.map((q)=>{
            if(q.label === "30-40")
            q.y+=1
            return q
          })
          return diffTime
        })
        setState({ ...state, data: ageData })
        console.log(ageData)
      })
      .catch(err => console.log);
  }, [])
  
  return (
    <div>
      <CanvasJSChart options={options}
      /* onRef={ref => this.chart = ref} */
      />
    </div >
  );
}
