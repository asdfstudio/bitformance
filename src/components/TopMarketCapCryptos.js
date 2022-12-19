import { useState } from 'react'
import BFTable from './small/BFTable'
import { COINS } from '../data/fakeData'
import { useCryptosByMarketCap } from '../endpoints/index'
import BFLoading from './small/BFLoading'

export default function TopMarketCapCryptos() {


	const [sortField, setSortField] = useState('market_cap')
	const [sortOrder, setSortOrder] = useState('desc') //'asc'


	const sortBy = (label) => {
		console.log(label)
		if (label === sortField) {
			setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
			return
		}
		setSortField(label)
		setSortOrder('desc')
	}

	const SortedTable = ({ sortField, sortOrder }) => {
		const { data, isLoading } = useCryptosByMarketCap(sortField, sortOrder)
		return (<>
			<BFTable 
				condensedHeaders={true} 
				rows={data || []} 
				type="top-cryptos" 
				handleHeaderClick={sortBy}
			/>
			{isLoading &&
				<div className="h-96 bg-white">
					<BFLoading heightAdjust="h-[45vh]" />
				</div>
			}
		</>)
	}

	return(
		<div className="bg-white min-w-full overflow-y-auto p-4 space-y-4 rounded shadow">
			<h1>Top Cryptocurrencies by Market Cap</h1>
			<SortedTable sortField={sortField} sortOrder={sortOrder} />
		</div>
	)
}