import BFGraph from './BFGraph'
import { useState, useEffect } from 'react'

export default function GraphCard({ title, subtractWidth = 0, holdings, hook = function () { return { data: {}, isLoading: false, isError: false }} }) {

	const { data, isLoading, isError } = hook()

	const [graphColor, setGraphColor] = useState('Solid Colored')
	const [graphInterval, setGraphInterval] = useState('3Y')

	const [finalDates, setFinalDates] = useState([])
	const [finalPrices, setFinalPrices] = useState([])

	const colorOptions = ['Price Colored', 'Solid Colored']
	const dateOptions = ['24H', '7D', '1M', '3M', '6M', '1Y', '3Y']

	const [fullGraphData, setFullGraphData] = useState([])
	const [shownGraphData, setShownGraphData] = useState([])
	const [hourlyData, setHourlyData] = useState([])

	useEffect(() => {
		console.log('loading')
		if (data && data.index && fullGraphData.length === 0) {
			console.log(data.index)
			const { dates, prices } = data.index.daily_graph_data
			// switch (graphInterval)
			const array = []
			for (let i = 0; i < dates.length; i++) {
				array.push({
					name: dates[i],
					amt: prices[i]
				})
			}
			setFullGraphData(array)
			setShownGraphData(array.slice(-1095))
			const hourly = []
			const { dates: hourlyDates, prices: hourlyPrices} = data.index.fivemin_graph_data
			for (let z = 0; z < hourlyDates.length; z++) {
				hourly.push({
					name: hourlyDates[z],
					amt: hourlyPrices[z]
				})
			}
			setHourlyData(hourly)
		}

	}, [data])

	useEffect(() => {
		displayGraphData(graphInterval)
	}, [graphInterval])

	function displayGraphData(plotPeriod) {
	  switch (plotPeriod) {
	    case "24H":
				setShownGraphData(hourlyData)	      
				break;
	    case "7D":
	      setShownGraphData(fullGraphData.slice(-7))
	      break;
	    case "1M":
	      setShownGraphData(fullGraphData.slice(-30))
	      break;
	    case "3M":
	      setShownGraphData(fullGraphData.slice(-90))
	      break;
	    case "6M":
	     setShownGraphData(fullGraphData.slice(-180))
	     break;
	    case "1Y":
	      setShownGraphData(fullGraphData.slice(-365))
	      break;
	    case "3Y":
	      setShownGraphData(fullGraphData.slice(-1095))
	      break;
	    default:
	      setShownGraphData([])
	  }
	}

	if (isLoading) return 'Loading...'
	if (isError) {
		console.log(isError)
		return 'Error...'
	}

	return(
		<div className="bg-white p-4">
			<h1 className="text-lg mb-4 font-bold">{title}</h1>
			<div className="flex flex-row mb-6">
				<div className="border rounded-xl">
					{colorOptions.map(option => (
						<button 
							className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphColor && 'bg-transparent hover:bg-transparent'}`} 
							key={option} onClick={() => setGraphColor(option)}
						>
							{option}
						</button>
					))}
				</div>
				<div className="ml-auto border rounded-xl">
					{dateOptions.map(option => (
						<button className={`px-4 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphInterval && 'bg-transparent hover:bg-transparent'}`} key={option} onClick={() => setGraphInterval(option)}>{option}</button>
					))}
				</div>
			</div>

			<BFGraph subtractWidth={subtractWidth} data={shownGraphData} />
	
		</div>
	)
}