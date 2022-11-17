import { useState } from 'react'
import BFTable from './small/BFTable'
import exampleIcon from '../exampleIcon.png'
import { COINS } from '../data/fakeData'

export default function TopMarketCapCryptos() {

	const [sortOrder, setSortOrder] = useState('ASC') //'DESC'

	const sortables = ['Cryptocurrency', 'Tickers', 'Price    ', '     24h %', '      7d %   ', 'Market Cap']

	const sortBy = (label) => {
		//TODO: backend query
	}

	//TODO: fetch data
	const data = COINS

	return(
		<div className="bg-white min-w-full overflow-y-auto p-4 space-y-4 rounded shadow">
			<h1>Top Cryptocurrencies by Market Cap</h1>
			<BFTable headers={sortables} rows={data} type="top-cryptos" />
		</div>
	)
}