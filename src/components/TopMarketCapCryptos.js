import { useState } from 'react'
import BFTable from './small/BFTable'
import { COINS } from '../data/fakeData'
import { useCryptosByMarketCap } from '../endpoints/index'
import BFLoading from './small/BFLoading'

export default function TopMarketCapCryptos() {

	const { data, isLoading } = useCryptosByMarketCap()


	const [sortOrder, setSortOrder] = useState('ASC') //'DESC'


	const sortBy = (label) => {
		//TODO: backend query
	}


	console.log(data)
	return(
		<div className="bg-white min-w-full overflow-y-auto p-4 space-y-4 rounded shadow">
			<h1>Top Cryptocurrencies by Market Cap</h1>
			<BFTable condensedHeaders={true} rows={data || []} type="top-cryptos" />
			{isLoading &&
				<div className="h-96 bg-white">
					<BFLoading heightAdjust="h-[45vh]" />
				</div>
			}
		</div>
	)
}