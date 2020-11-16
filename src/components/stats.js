import { Card } from '@material-ui/core';
import React, { useState } from 'react';
import PolicyStats from './policyStats';
import AgeStats from './ageStats';
const Stats = () => {

	const [component,setComponent] = useState(null)
	return ( 
		<div>
			{component===null? <React.Fragment>
			<Card onClick={()=>setComponent("policy stats")}>
				View Policy Stats
			</Card>
			<Card onClick={()=>setComponent("age stats")}>
				View Age Stats
			</Card>
			</React.Fragment>:(component==="policy stats"?<PolicyStats/>:<AgeStats />)}
		</div>
	 );
}
 
export default Stats;
