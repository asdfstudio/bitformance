import { useState } from 'react'
import exampleIcon from '../exampleIcon.png'
import BFTable from '../components/small/BFTable'

export default function BrowsePage() {

	const sortables = [
		'Cryptocurrency',
		'Price',
		'24 %',
		'7d %',
		'Market Cap',
		'Last Updated',
		'Action'
	]

	const sortBy = () => {
		//TODO: 
	}

	const [sortOrder, setSortOrder] = useState('ASC')

	const data = [
		{
			id: 109,
			image: exampleIcon,
			name: 'Bitcoin',
			ticker: 'BTC',
			price: 20928.35,
			hourlyPercentageChange: -0.91,
			weeklyPercentageChange: -2.11,
			marketCap: '$380.44B'
		},
		{
			id: 209,
			image: exampleIcon,
			name: 'Ethereum',
			ticker: 'ETH',
			price: 928.35,
			hourlyPercentageChange: 1.31,
			weeklyPercentageChange: 21.1,
			marketCap: '$320.44B'
		},
		{
			id: 309,
			image: exampleIcon,
			name: 'Tether',
			ticker: 'USDT',
			price: 28.35,
			hourlyPercentageChange: 12.04,
			weeklyPercentageChange: -62.09,
			marketCap: '$10.44M'
		},
	]


	return (
		<div className="p-4 bg-gray-50">
			<BFTable headers={sortables} rows={data} type="browse-cryptos" tableStyle="border-separate border-spacing-y-5" />
		</div>
	)
}