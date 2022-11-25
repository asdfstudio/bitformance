import { 
	CartesianGrid, 
	XAxis, 
	YAxis, 
	Area, 
	AreaChart,
	Tooltip,
} from 'recharts';

import moment from 'moment'
import { useState, useEffect } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function BFGraph({ subtractWidth = 0, data = [] }) {

	const { width } = useWindowDimensions();

	const createData = () => {
		let start = new Date('2022-10-01')
		const end = new Date('2022-10-31')

		const array = []
		while (start < end) {
			array.push({
				name: moment(start).format().slice(0, 10),
				uv: Math.floor((Math.random() * 100)),
				pv: Math.floor((Math.random() * 100)),
				amt: Math.floor((Math.random() * 100)),
			})
			const newDate = start.setDate(start.getDate() + 1)
			start = new Date(newDate)
		}
		return array
	}

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

	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  // These options are needed to round to whole numbers if that's what you want.
	  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	const formatYAxis = (value) => {
		return formatter.format(value)
	}

	const formatXAxis = (value) => {
		return formatDate(value, '3Y')
	}
 
	return(
		<AreaChart width={width - 286 - subtractWidth} height={400} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 14 }}>
		 	<defs>
        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
      </defs>
		  <CartesianGrid stroke="#ccc" />
		  <Tooltip />
		  <Area type="monotone" dataKey="amt" strokeWidth={1} stroke="#8884d8" fillOpacity={1} fill="url(#colorBlue)" />
		  <XAxis dataKey="name" tickFormatter={formatXAxis} />
		  <YAxis tickFormatter={formatYAxis} domain={['dataMin', 'auto']} />
		</AreaChart>
	)
}