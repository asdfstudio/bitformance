import BFGraph from './BFGraph'
import { useState } from 'react'

export default function TopFiveCryptos() {

	const [graphColor, setGraphColor] = useState('Solid Colored')
	const [graphInterval, setGraphInterval] = useState('7D')

	const colorOptions = ['Price Colored', 'Solid Colored']
	const dateOptions = ['24H', '7D', '1M', '3M', '6M', '1Y', '3Y']


	return(
		<div className="bg-white p-4 mt-4">
			<h1 className="text-xl mb-4">Top 5 Currency Indexes</h1>
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

			<BFGraph />

			<hr />

			<div>
				holdings TODO
			</div>
		</div>
	)
}