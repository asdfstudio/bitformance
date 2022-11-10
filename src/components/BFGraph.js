import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

import moment from 'moment'
import { useState } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function BFGraph() {

	const { width } = useWindowDimensions();

	const createData = () => {
		let start = new Date('2022-10-01')
		const end = new Date('2022-10-31')

		const array = []
		while (start < end) {
			array.push({
				date: moment(start).format(),
				price: Math.floor((Math.random() * 100))
			})
			const newDate = start.setDate(start.getDate() + 1)
			start = new Date(newDate)
		}
		return array
	}

	//TODO: replace with real data
	const data = [
		{name: '11/20', uv: 400, pv: 2400, amt: 2400},
		{name: '11/21', uv: 500, pv: 2400, amt: 2400},
	];

	const [plotInterval, setPlotInterval] = useState('7D')
	const intervals = {
	  '24H': [60, 120, 180, 240, 295],
	  '7D' : [60, 116, 172, 228, 284],
	  '1M' : [5, 10, 15, 20, 25],
	  '3M' : [18, 36, 54, 72],
	  '6M' : [30, 60, 90, 120, 150],
	  '1Y' : [60, 121, 182, 243, 304],
	  '3Y' : [183, 366, 549, 732, 915]
	}

	function formatDate(unixTime, plotPeriod) {
	  const date = moment.unix(unixTime)
	  switch (plotPeriod) {
	    case "24H":
	      return date.format("HH:mm")
	    case "7D":
	      return date.format("MMM Do")
	    case "1M":
	      return date.format("MMM Do")
	    case "3M":
	      return date.format("MMM Do")
	    case "6M":
	     return date.format("MMM Do")
	    case "1Y":
	      return date.format("MMM Do")
	    case "3Y":
	      return date.format("MM/DD/YY")
	    default:
	      return date.format("MM/DD/YY")
	  }
	}

	// const options = {
	//   scales: {
	//     xAxes: {
	//       grid: {
	//         display: false,
	//       },
	//       ticks: {
	//         callback: (value, index) => {

	//           if (index === 0 || index === (graphDates.length - 1)) {
	//             if (plotInterval === "3Y") {
	//               return moment.unix(value).format("MM/DD/YY")
	//             }
	//             return moment.unix(value).format("MMM Do")
	//           } 
	//           return formatDate(value, plotInterval)
	           
	         
	//         },
	//       },
	//     },
	//     yAxes: {
	//       ticks: {
	//         callback: (value, index, values) => {
	//           return ("$" + value.toLocaleString('en-US'))
	//         }
	//       }
	//     }
	//   },
	//   plugins: {
	//     legend: {
	//       display: false,
	//     },
	//   },
	//   elements: {
	//     point: {
	//       radius: 2
	//     },
	//     line: {
	//       borderColor: '#0953F5',
	//       borderWidth: 2,
	//       borderJoinStyle: "round" //miter, round, bevel
	//     }
	//   }
	// };

	return(
		<LineChart width={width - 286} height={400} data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
		  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
		  <CartesianGrid stroke="#ccc" />
		  <XAxis dataKey="name" />
		  <YAxis />
		</LineChart>
	)
}