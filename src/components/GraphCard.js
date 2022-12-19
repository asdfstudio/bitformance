import BFGraph from './BFGraph'
import { useState, useEffect } from 'react'

export default function GraphCard({ title, subtractWidth = 0, holdings, isOverlay = false, hook = function () { return { data: {}, isLoading: false, isError: false }} }) {

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
		if (isOverlay && fullGraphData.length === 0) {
			loadOverlayData()
		}
		if (data && data.index && fullGraphData.length === 0) {
			loadData()
		}

	}, [data])

	const loadOverlayData = () => {
		const dataOne = data[0]
		const dataTwo = data[1]

		let daily_graph_data_one = dataOne.data.daily_graph_data
		let daily_graph_data_two = dataTwo.data.daily_graph_data
		let fivemin_graph_data_one = dataOne.data.fivemin_graph_data
		let fivemin_graph_data_two = dataTwo.data.fivemin_graph_data

		if (dataOne.isCrypto) {
			daily_graph_data_one = dataOne.data.index.daily_graph_data
			fivemin_graph_data_one = dataOne.data.index.fivemin_graph_data
		}
		if (dataTwo.isCrypto) {
			daily_graph_data_two = dataTwo.data.index.daily_graph_data
			fivemin_graph_data_two = dataTwo.data.index.fivemin_graph_data
		}


		const { dates, prices, price } = daily_graph_data_one
		const { dates: datesTwo, prices: pricesTwo, price: priceTwo } = daily_graph_data_two
		const array = []

		//Make date array lengths match
		let useLessDates = []
		let formatPrice = []
		let formatPriceTwo = []
		if (dates.length > datesTwo.length) {
			useLessDates = datesTwo
			if (pricesTwo) {
				formatPriceTwo = pricesTwo.slice(-1 * datesTwo.length)
			} else {
				formatPriceTwo = priceTwo.slice(-1 * datesTwo.length)
			}
			if (prices) {
				formatPrice = prices
			} else {
				formatPrice = price
			}
		} else if (datesTwo.length > dates.length) {
			useLessDates = dates
			if (prices) {
				formatPrice = prices.slice(-1 * dates.length)
				console.log(formatPrice.length)
			} else {
				formatPrice = price.slice(-1 * dates.length)
			}
			if (pricesTwo) {
				formatPriceTwo = pricesTwo
			} else {
				formatPriceTwo = priceTwo
			}
		} else {
			//do nothing, same length, maybe check similar timestamps
			useLessDates = dates
			formatPrice = prices ? prices : price
			formatPriceTwo = pricesTwo ? pricesTwo : priceTwo
		}


		console.log(formatPrice.length)
		console.log(formatPriceTwo.length)


		for (let i = 0; i < useLessDates.length; i++) {
			array.push({
				name: useLessDates[i],
				amt:  formatPrice[i],
				amt2: formatPriceTwo[i]
			})
		}
		setFullGraphData(array)
		setShownGraphData(array.slice(-1095))
		const hourly = []
		const { dates: hourlyDates, prices: hourlyPrices, price: hourlyPrice } = fivemin_graph_data_one
		const { dates: hourlyDatesTwo, prices: hourlyPricesTwo, price: hourlyPriceTwo } = fivemin_graph_data_two

		for (let z = 0; z < hourlyDates.length; z++) {
			hourly.push({
				name: hourlyDates[z],
				amt: hourlyPrices ? hourlyPrices[z] : hourlyPrice[z],
				amt2: hourlyPricesTwo ? hourlyPricesTwo[z] : hourlyPriceTwo[z]
			})
		}
		setHourlyData(hourly)
		
	}


	const loadData = () => {
		if (data.index.daily_graph_data) {
			const { dates, prices, price } = data.index.daily_graph_data
			const array = []
			for (let i = 0; i < dates.length; i++) {
				array.push({
					name: dates[i],
					amt: prices ? prices[i] : price[i]
				})
			}
			setFullGraphData(array)
			setShownGraphData(array.slice(-1095))
			const hourly = []
			const { dates: hourlyDates, prices: hourlyPrices, price: hourlyPrice } = data.index.fivemin_graph_data
			for (let z = 0; z < hourlyDates.length; z++) {
				hourly.push({
					name: hourlyDates[z],
					amt: hourlyPrices ? hourlyPrices[z] : hourlyPrice[z]
				})
			}
			setHourlyData(hourly)
		}
	}

	useEffect(() => {
		if (fullGraphData.length) {
			displayGraphData(graphInterval)
		}
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

	// if (isLoading) return 'Loading...'
	// if (isError) {
	// 	console.log(isError)
	// 	return 'Error...'
	// }

	return(
		<div className="bg-white p-4">
			<h1 className="text-lg mb-4 font-bold">{title}</h1>
			<div className="flex flex-col md:flex-row items-center mb-6">
				<div className="border rounded-xl">
					{colorOptions.map(option => (
						<button 
							className={`text-sm px-2 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphColor && 'bg-transparent hover:bg-transparent'}`} 
							key={option} onClick={() => setGraphColor(option)}
						>
							{option}
						</button>
					))}
				</div>
				<div className="ml-0 md:ml-auto mt-2 md:mt-0 border rounded-xl">
					{dateOptions.map(option => (
						<button className={`text-sm px-3 md:px-2 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphInterval && 'bg-transparent hover:bg-transparent'}`} key={option} onClick={() => setGraphInterval(option)}>{option}</button>
					))}
				</div>
			</div>

			<BFGraph subtractWidth={subtractWidth} data={shownGraphData} showOverlay={isOverlay} />
	
		</div>
	)
}