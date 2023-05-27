import { 
	CartesianGrid, 
	XAxis, 
	YAxis, 
	Area, 
	AreaChart,
	Tooltip,
	ReferenceLine,
	ResponsiveContainer,
} from 'recharts';

import moment from 'moment'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { formatMoney } from '../helpers';

export default function BFGraph2({ 
	subtractWidth = 0, 
	indexPrice, data = [], 
	showOverlay = false, 
	halfGraph = false, 
	isCompare = false, 
	createIndex = false, 
	showPriceColored = false, 
	graphInterval = "All"  
}) {

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
	      return date.format("H:MM")
	    case "7D":
	      return date.format("MMM D")
	    case "1M":
	      return date.format("MMM D")
	    case "3M":
	      return date.format("MMM")
	    case "6M":
	     return date.format("MMM")
	    case "1Y":
	      return date.format("MMM") //MMM D
	    case "3Y":
	      return date.format("MMM D Y")
		case "All":
	      return date.format("Y")
		case "Hover":
	      return date.format("MM/DD/YY")
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
			case "All":
				return formatDate(value, 'All')
			default:
				return formatDate(value, 'All')
		  }
	}
	const XAxisInterval = () => {
		{
			if (width < 1024 || isCompare) {
				switch (graphInterval) {
					case "24H":
					  return 55
					case "7D":
						return null
					case "1M":
						return 7
					case "3M":
						return 30
					case "6M":
						return 60
					case "1Y":
						return 120
					case "3Y":
						return 182
					case "All":
						return 1095
					default:
						return 1095
				  }
			} else {
				switch (graphInterval) {
					case "24H":
					  return 36
					case "7D":
						return null
					case "1M":
						return 2
					case "3M":
						return 28
					case "6M":
						return 28
					case "1Y":
						return 28
					case "3Y":
						return 365
					case "All":
						return 365
					default:
						return 365
				  }
			} 
		}
	}

	const CustomTooltip = ({ active, payload, label }) => {
	  if (active && payload && payload.length) {
	  	if (payload.length > 1 && !showOverlay) {
	  		return (
				<div className="w-48 border border-main-lightGrayBorder rounded-lg bg-white p-4 text-[14px] font-DM_Sans font-bold leading-normal tracking-wide text-main-black">
				<div className="flex flex-row justify-between items-center pb-2">
				  <p className="text-main-black">{formatDate(label, 'Hover')}</p>
				  <p className="text-main-gray">{formatDate(label, '24H')}</p>
			  </div>
			  <div className="flex flex-col">
				  {/* <p className="text-main-gray font-medium pr-1">Price: </p> */}
				  <p className={showOverlay ? 'text-blue-400' : ''}>{showOverlay ? `${Math.min(payload[0].value).toFixed(2)}%` : formatter.format(payload[0].value)}</p>
				  {showOverlay && <p className="text-green-400">{showOverlay ? `${Math.min(payload[1].value).toFixed(2)}%` : formatter.format(payload[1].value)}</p>}
			  </div>
			</div>
	  		)
	  	}
	    return (
	      <div className="w-48 border border-main-lightGrayBorder rounded-lg bg-white p-4 text-[14px] font-DM_Sans font-bold leading-normal tracking-wide text-main-black">
	      	<div className="flex flex-row justify-between items-center pb-2">
				<p className="text-main-black">{formatDate(label, 'Hover')}</p>
				<p className="text-main-gray">{formatDate(label, '24H')}</p>
			</div>
			<div className="flex flex-col">
				{/* <p className="text-main-gray font-medium pr-1">Price: </p> */}
				<p className={showOverlay ? 'text-blue-400' : ''}>{showOverlay ? `${Math.min(payload[0].value).toFixed(2)}%` : formatter.format(payload[0].value)}</p>
	        	{showOverlay && <p className="text-green-400">{showOverlay ? `${Math.min(payload[1].value).toFixed(2)}%` : formatter.format(payload[1].value)}</p>}
			</div>
	      </div>
	    );
	  }

	  return null;
	};


	// const firstPrice = indexPrice || 0
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

		if (data.length > index + 1	) {
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
	  const gradientOffset = () => {
		const dataMax = Math.max(...data.map((i) => i.amt));
		const dataMin = Math.min(...data.map((i) => i.amt));
	  
		return (1-((firstPrice -dataMin)/(dataMax-dataMin)));
	  };
	  
	  const off = gradientOffset();
	return(console.log('graph 2', off),
		<ResponsiveContainer height={400}>
		<AreaChart 
			className='text-[14px] font-DM_Sans font-normal leading-normal tracking-wide w-full' 
			data={showPriceColored ? priceData : data}
			baseValue={showPriceColored && firstPrice}
			margin={{ top: 0, right: 30, bottom: 0, left: 10 }}
		>
			<defs>
				<linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
					{/* #8884d8 */}
					<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
					<stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
				</linearGradient>

				{/* price color */}
				<linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
					{/* #82ca9d */}
					<stop offset="5%" stopColor="#40c8b8" stopOpacity={0.8}/>
					<stop offset="95%" stopColor="#40c8b8" stopOpacity={0}/>
				</linearGradient>
				<linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
					{/* #FF0000 */}
					<stop offset="5%" stopColor="#fd5d60" stopOpacity={0}/>
					<stop offset="95%" stopColor="#fd5d60" stopOpacity={0.8}/>
				</linearGradient>

				<linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="#40c8b8" stopOpacity={0.9} />
					<stop offset={off} stopColor="#40c8b8" stopOpacity={0} />
					<stop offset={off} stopColor="#fd5d60" stopOpacity={0} />
				<stop offset="100%" stopColor="#fd5d60" stopOpacity={0.9} />
				</linearGradient>
				<linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
					<stop offset={off} stopColor="#40c8b8" stopOpacity={1} />
					<stop offset={off} stopColor="#fd5d60" stopOpacity={1} />
				</linearGradient>
				
			</defs>
			<CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
			{data.length > 0 && <>
				{!showPriceColored && 
					<Area type="monotone" stackId="1" dataKey="amt" strokeWidth={1} stroke="#8884d8" fillOpacity={showOverlay ? 0 : 1} fill="url(#colorBlue)" />

				}
					
				{showPriceColored && <>
					{/* <Area type="monotone" dataKey="green" strokeWidth={2} stroke="#40c8b8" fillOpacity={0.5} fill="url(#colorGreen)" />
					<Area type="monotone" dataKey="red" strokeWidth={2} stroke="#fd5d60" fillOpacity={0.5} fill="url(#colorRed)" /> */}
					<ReferenceLine 
						y={firstPrice} 
						label={{ 
							position: 'insideRight',
							offset: 10,
							value: formatMoney(firstPrice), 
							fill: 'black', 
							fontSize: 13, 
							fontWeight: 800,
						}} 
						strokeWidth={1} 
						stroke="gray" 
						strokeDasharray="2 3"
						 
					/>

					<Area type="monotone" dataKey="amt" stroke="url(#strokeColor)" strokeWidth={2} fillOpacity={0.5} fill="url(#splitColor)" />
				</>
				}

				{showOverlay && 
					<Area type="monotone" stackId="2" dataKey="amt2" strokeWidth={1} stroke="#40c8b8" fillOpacity={0} fill="url(#colorGreen)" />
				}

					
				<XAxis
					dataKey="name" 
					tickFormatter={formatXAxis} 
					interval={XAxisInterval()}
				 />
				<YAxis 
					type="number" 
					allowDataOverflow 
					tickFormatter={formatYAxis} 
					domain={[showOverlay ? Math.min(lowestPrice, lowestPercentTwo) : lowestPrice, 'auto']} 
				/>
				<Tooltip content={<CustomTooltip />} />
				</>
		}
	</AreaChart>
	</ResponsiveContainer>
		
	)
}