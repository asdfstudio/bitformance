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
		} else if (data && data.index && fullGraphData.length === 0) {
			loadData()
		}

	}, [data])

	const loadOverlayData = (timeInterval = -1095) => {
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

		if (!dataOne.isCrypto) {
			if (prices) {
				dataOne.data.index = { initial_value: prices.slice(timeInterval)[0] }
			} else {
				dataOne.data.index = { initial_value: price.slice(timeInterval)[0] }
			}
		}
		if (!dataTwo.isCrypto) {
			if (pricesTwo) {
				dataTwo.data.index = { initial_value: pricesTwo.slice(timeInterval)[0] }
			} else {
				dataTwo.data.index = { initial_value: priceTwo.slice(timeInterval)[0] }
			}

		}

		//Make date array lengths match
		let formatPrice = prices ? prices : price
		let formatPriceTwo = pricesTwo ? pricesTwo : priceTwo

		formatPrice = formatPrice.slice(timeInterval)
		formatPriceTwo = formatPriceTwo.slice(timeInterval)
		const properDateRange = dates.slice(timeInterval)

		for (let i = 0; i < formatPrice.length; i++) {
			array.push({
				name: properDateRange[i],
				amt:  ((formatPrice[i] - dataOne.data.index.initial_value) / dataOne.data.index.initial_value) * 100,
				amt2: ((formatPriceTwo[i] - dataTwo.data.index.initial_value) / dataTwo.data.index.initial_value) * 100
			})
			// array.splice(0, 0, {
			// 	name: useLessDates[i],
			// 	amt:  ((formatPrice[i] - dataOne.data.index.initial_value) / dataOne.data.index.initial_value) * 100,
			// 	amt2: ((formatPriceTwo[i] - dataTwo.data.index.initial_value) / dataTwo.data.index.initial_value) * 100
			// })
		}
		// array.sort((a, b) => a.name - b.name)
		// console.log('computed array')
		// console.log(array)

		console.log(array)

		setFullGraphData(array)
		setShownGraphData(array.slice(timeInterval))
		const hourly = []
		const { dates: hourlyDates, prices: hourlyPrices, price: hourlyPrice } = fivemin_graph_data_one
		const { dates: hourlyDatesTwo, prices: hourlyPricesTwo, price: hourlyPriceTwo } = fivemin_graph_data_two

		const initialValueOne = hourlyPrices ? hourlyPrices[0] : hourlyPrice[0]
		const initialValueTwo = hourlyPricesTwo ? hourlyPricesTwo[0] : hourlyPriceTwo[0]

		for (let z = 0; z < hourlyDates.length; z++) {
			const hourlyT = hourlyPrices ? hourlyPrices[z] : hourlyPrice[z] 
			const hourlyTwo = hourlyPricesTwo ? hourlyPricesTwo[z] : hourlyPriceTwo[z]
			hourly.push({
				name: hourlyDates[z],
				amt: ((hourlyT - initialValueOne) / initialValueOne) * 100,
				amt2: ((hourlyTwo - initialValueTwo) / initialValueTwo) * 100,
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
	    	isOverlay ? loadOverlayData(-7) : setShownGraphData(fullGraphData.slice(-7))
	      break;
	    case "1M":
	    	isOverlay ? loadOverlayData(-30) : setShownGraphData(fullGraphData.slice(-30))
	      break;
	    case "3M":
	    	isOverlay ? loadOverlayData(-90) : setShownGraphData(fullGraphData.slice(-90))
	      break;
	    case "6M":
	    	isOverlay ? loadOverlayData(-180) : setShownGraphData(fullGraphData.slice(-180))
	     break;
	    case "1Y":
	    	isOverlay ? loadOverlayData(-365) : setShownGraphData(fullGraphData.slice(-365))
	      break;
	    case "3Y":
	    	isOverlay ? loadOverlayData(-1095) :setShownGraphData(fullGraphData.slice(-1095))
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

// console.log(shownGraphData)
	return(
		<div className="bg-white p-4">
			<h1 className="text-lg mb-4 font-bold">{title}</h1>
			<div className="flex flex-col md:flex-row items-center mb-6">
				<div className="border rounded-xl">
					{colorOptions.map(option => (
						<button 
							className={`text-sm px-2 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphColor && 'bg-transparent hover:bg-transparent'}`} 
							key={option} onClick={() => setGraphColor(option)}
							disabled={(isOverlay && option === 'Price Colored')}
						>
							{(isOverlay && option === 'Price Colored') ? 'DISABLED' : option}
						</button>
					))}
				</div>
				<div className="ml-0 md:ml-auto mt-2 md:mt-0 border rounded-xl">
					{dateOptions.map(option => (
						<button className={`text-sm px-3 md:px-2 py-2 bg-gray-200 hover:bg-gray-300 ${option === graphInterval && 'bg-transparent hover:bg-transparent'}`} key={option} onClick={() => setGraphInterval(option)}>{option}</button>
					))}
				</div>
			</div>

			<BFGraph subtractWidth={subtractWidth} data={shownGraphData} showOverlay={isOverlay} showPriceColored={graphColor === 'Price Colored'} />
	
		</div>
	)
}