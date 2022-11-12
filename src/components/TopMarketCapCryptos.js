import { useState } from 'react'
import CoinRow from './CoinRow'
import exampleIcon from '../exampleIcon.png'

export default function TopMarketCapCryptos() {

	const [sortOrder, setSortOrder] = useState('ASC') //'DESC'

	const sortables = ['Cryptocurrency', 'Tickers', 'Price', '24h %', '7d %', 'Market Cap']

	const sortBy = (label) => {
		//TODO: backend query
	}

	const data = [
		{
			id: 1,
			image: exampleIcon,
			name: 'Bitcoin',
			ticker: 'BTC',
			price: 20928.35,
			hourlyPercentageChange: -0.91,
			weeklyPercentageChange: -2.11,
			marketCap: '$380.44B'
		},
		{
			id: 2,
			image: exampleIcon,
			name: 'Ethereum',
			ticker: 'ETH',
			price: 928.35,
			hourlyPercentageChange: 1.31,
			weeklyPercentageChange: 21.1,
			marketCap: '$320.44B'
		},
		{
			id: 3,
			image: exampleIcon,
			name: 'Tether',
			ticker: 'USDT',
			price: 28.35,
			hourlyPercentageChange: 12.04,
			weeklyPercentageChange: -62.09,
			marketCap: '$10.44M'
		},
	]

	return(
		<div className="bg-white min-w-full overflow-y-auto p-4 space-y-4 rounded shadow">
			<h1>Top Cryptocurrencies by Market Cap</h1>
			<table className="table-fixed">
				<thead className="bg-gray-200">
					<tr>
						{sortables.map(label => (<th>
							<button 
								key={label}
								className="px-4 py-2"
								onClick={() => sortBy(label)} 
							>
								{label} {sortOrder === 'ASC' ? '^' : 'v'}
							</button></th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map(coin => (
						<tr><CoinRow key={coin.id} {...coin} /></tr>
					))}
				</tbody>

			</table>
{/*			{data.map(coin => (
				<CoinRow key={coin.id} {...coin} />
			))}*/}
		</div>
	)
}