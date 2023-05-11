import BFGraph from './BFGraph'
import { useState, useEffect } from 'react'

export default function GraphCard({ title, indexPrice, subtractWidth = 0, holdings, isOverlay = false, halfGraph = false, isCompare = false,  hook = function () { return { data: {}, isLoading: false, isError: false }} }) {

	const { data, isLoading, isError } = hook()

	const [graphColor, setGraphColor] = useState('Solid Colored')
	const [graphInterval, setGraphInterval] = useState('All')

	const [finalDates, setFinalDates] = useState([])
	const [finalPrices, setFinalPrices] = useState([])

	const colorOptions = ['Price Colored', 'Solid Colored']
	const dateOptions = ['24H', '7D', '1M', '3M', '6M', '1Y', 'All']

	const [fullGraphData, setFullGraphData] = useState([])
	const [shownGraphData, setShownGraphData] = useState([])
	const [hourlyData, setHourlyData] = useState([])

	useEffect(() => {
	 	if (isOverlay && fullGraphData.length === 0) {
			loadOverlayData()
		} 
		else if (data && data.index && fullGraphData.length === 0) {
			loadData()
		}

	}, [data])

	const loadOverlayData = (timeInterval = -3000) => {
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

		let smallerLength = formatPrice.length > formatPriceTwo.length ? formatPriceTwo.length: formatPrice.length
		for (let i = 0; i < smallerLength; i++) {
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

		// console.log('computed array', array)

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
			setShownGraphData(array.slice(-3000))//1095
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
	    	isOverlay ? loadOverlayData(-7) : setShownGraphData(fullGraphData.slice(-7)) //7
	      break;
	    case "1M":
	    	isOverlay ? loadOverlayData(-30) : setShownGraphData(fullGraphData.slice(-30)) //30
	      break;
	    case "3M":
	    	isOverlay ? loadOverlayData(-90) : setShownGraphData(fullGraphData.slice(-90)) //90
	      break;
	    case "6M":
	    	isOverlay ? loadOverlayData(-180) : setShownGraphData(fullGraphData.slice(-180)) //180
	     break;
	    case "1Y":
	    	isOverlay ? loadOverlayData(-365) : setShownGraphData(fullGraphData.slice(-365)) //365
	      break;
	    case "3Y":
	    	isOverlay ? loadOverlayData(-1095) :setShownGraphData(fullGraphData.slice(-1095)) //1095
	      break;
	    case "All":
	    		isOverlay ? loadOverlayData(-3000) :setShownGraphData(fullGraphData.slice(-3000)) ///3000
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
		<div className="bg-white sm:rounded-xl">
			<h1 className="px-5 pt-6 text-[22.1px] font-DM_Sans font-medium leading-normal tracking-wide text-main-black">{title}</h1>
			<div className={`flex flex-col lg:flex-row items-center mb-6 px-5 pt-4 
				${isCompare && 'xl:flex-col gap-1 2xl:flex-row'}`
			}>
				<div className="rounded-lg bg-main-lightGray px-1 py-1 text-main-gray">
					{colorOptions.map(option => (
						<button 
							className={`text-[12px] px-3 py-2 font-DM_Sans font-normal leading-normal tracking-wide ${option === graphColor && 'bg-main-white py-1 px-4 rounded-lg shadow text-main-black text-[12px] font-bold'}`}
							key={option} onClick={() => setGraphColor(option)}
							disabled={(isOverlay && option === 'Price Colored')}
						>
							{(isOverlay && option === 'Price Colored') ? 'DISABLED' : option}
						</button>
					))}
				</div>
				<div className={`flex flex-row ml-0 lg:ml-auto mt-2 lg:mt-0 rounded-lg py-1 bg-main-lightGray items-center 
				${isCompare && 'xl:ml-0 2xl:ml-auto'}
				`}>
					{dateOptions.map(option => (
						<button 
							className={`text-[12px] text-main-gray font-DM_Sans font-normal leading-normal tracking-wide px-3 py-2 
							${halfGraph ? 'px-3 py-2' : 'sm:px-7 py-2'}
							${option != "All" && 'border-r-[1px]'} 
							${option != "24H" && 'border-l-[1px]'} 
							${option === graphInterval && 'ml-2 mr-2 bg-main-white rounded-lg shadow text-main-black'}`} 
							key={option} 
							onClick={() => setGraphInterval(option)}
						>
							{option}
						</button>
					))}
				</div>
			</div>
			<div className='pb-4 text-[14px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray'>
				<BFGraph subtractWidth={subtractWidth} indexPrice={indexPrice} halfGraph={halfGraph} isCompare={isCompare} data={shownGraphData} showOverlay={isOverlay} showPriceColored={graphColor === 'Price Colored'} graphInterval={graphInterval}/>
			</div>
		</div>
	)
}