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

export default function BFGraph({ subtractWidth = 0, data = [], showOverlay = false, showPriceColored = false, graphInterval = "3Y"  }) {

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
	      return date.format("MM/DD")
	    default:
	      return date.format("MM/DD")
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
		if (showOverlay) {
			return `${value}%`
		}
		// return formatter.format(value)
		return Math.abs(value) > 999 ? Math.sign(value)*((Math.abs(value)/1000).toFixed(1)) + 'k' : Math.sign(value)*Math.abs(value)
	}

	const formatXAxis = (value) => {
		switch (graphInterval) {
			case "24H":
			  return formatDate(value, '24H')
			case "7D":
				return formatDate(value, '7D')
			case "1M":
				return formatDate(value, '1M')
			case "3M":
				return formatDate(value, '3M')
			case "6M":
				return formatDate(value, '6M')
			case "1Y":
				return formatDate(value, '1Y')
			case "3Y":
				return formatDate(value, '3Y')
			default:
				return formatDate(value, '3Y')
		  }
	}

	let finalWidth = 0
	if (width < 768) {
		finalWidth = width - 66
	} else {
		finalWidth = width - 320 - subtractWidth
	}

	const CustomTooltip = ({ active, payload, label }) => {
	  if (active && payload && payload.length) {
	  	if (payload.length > 1 && !showOverlay) {
	  		return (
	  			<div className="border bg-white p-4">
	  				<p>{formatDate(label, '3Y')}</p>
	  			  	<p>{formatter.format(payload[0].value || payload[1].value)}</p>
	  			</div>
	  		)
	  	}
	    return (
	      <div className="border bg-white p-4">
	      	<p>{formatDate(label, '3Y')}</p>
	        <p className={showOverlay ? 'text-blue-400' : ''}>{showOverlay ? `${Math.min(payload[0].value).toFixed(2)}%` : formatter.format(payload[0].value)}</p>
	        {showOverlay && <p className="text-green-400">{showOverlay ? `${Math.min(payload[1].value).toFixed(2)}%` : formatter.format(payload[1].value)}</p>}
	      </div>
	    );
	  }

	  return null;
	};


	const firstPrice = data[0]?.amt || 0
	const lowestPrice = data.reduce((prev, curr) => {
		return prev.amt < curr.amt ? prev : curr
	}, 0).amt

	const lowestPercentTwo = data.reduce((prev, curr) => {
		return prev.amt2 < curr.amt2 ? prev : curr
	}, 0).amt2

	const priceData = data.map((obj, index) => {
		let red = obj.amt > firstPrice ? null : obj.amt
		let green = obj.amt > firstPrice ? obj.amt : null

		if (data.length > index + 1) {
			const nextObj = data[index + 1]
			if (nextObj.amt > firstPrice && obj.amt <= firstPrice) {
				green = obj.amt
			}
			if (nextObj.amt < firstPrice && obj.amt > firstPrice) {
				red = obj.amt
			}
	
			return {
				...obj,
				red: red,
				green: green
			}
		}

		return {
			...obj,
			red: red,
			green: green
		}
	})

	return(
			<AreaChart width={finalWidth} height={400} className='text-[14px] font-DM_Sans font-normal leading-normal tracking-wide' data={showPriceColored ? priceData: data}  margin={{ top: 0, right: 0, bottom: 0, left: 18 }}>
				<defs>
					<linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
						{/* #8884d8 */}
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
					</linearGradient>
					<linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
						{/* #82ca9d */}
						<stop offset="5%" stopColor="#40c8b8" stopOpacity={0.8}/>
						<stop offset="95%" stopColor="#40c8b8" stopOpacity={0}/>
					</linearGradient>
					<linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
						{/* #FF0000 */}
						<stop offset="5%" stopColor="#fd5d60" stopOpacity={0.8}/>
						<stop offset="95%" stopColor="#fd5d60" stopOpacity={0}/>
					</linearGradient>
				</defs>
				<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
				{data.length > 0 && <>
					{!showPriceColored && 
						<Area type="monotone" stackId="1" dataKey="amt" strokeWidth={1} stroke="#8884d8" fillOpacity={showOverlay ? 0 : 1} fill="url(#colorBlue)" />
						
					}
						
					{showPriceColored && <>
						<Area type="monotone" stackId="1" dataKey="green" strokeWidth={1} stroke="#40c8b8" fillOpacity={0.5} fill="url(#colorGreen)" />
						<Area type="monotone" stackId="2" dataKey="red" strokeWidth={1} stroke="#fd5d60" fillOpacity={0.5} fill="url(#colorRed)" />
					</>
					}

					{showOverlay && 
						<Area type="monotone" stackId="2" dataKey="amt2" strokeWidth={1} stroke="#40c8b8" fillOpacity={0} fill="url(#colorGreen)" />
					}

						
					<XAxis dataKey="name" tickFormatter={formatXAxis}/>
					<YAxis type="number" allowDataOverflow tickFormatter={formatYAxis} domain={[showOverlay ? Math.min(lowestPrice, lowestPercentTwo) : lowestPrice, 'auto']} />
					<Tooltip content={<CustomTooltip />} />
					</>
			}
		</AreaChart>
		
	)
}