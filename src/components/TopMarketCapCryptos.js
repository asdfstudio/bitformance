import { useState } from 'react'
import BFTable from './small/BFTable'
import { COINS } from '../data/fakeData'
import { useCryptosByMarketCap } from '../endpoints/index'
import BFLoading from './small/BFLoading'
import { Link } from 'react-router-dom'

export default function TopMarketCapCryptos({ title = 'Top Cryptocurrencies by Market Cap' }) {

	const [sortField, setSortField] = useState('market_cap')
	const [sortOrder, setSortOrder] = useState('desc') //'asc'
	const [page, setPage] = useState(0)

	const sortBy = (label) => {
		if (label === sortField) {
			setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
			return
		}
		setSortField(label)
		setSortOrder('desc')
	}

	const SortedTable = ({ sortField, sortOrder, page }) => {
		//TODO: add page to endpoint
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

	const loadNextPage = () => {
		setPage(page + 1)
	}

	return(
		<div className="bg-white min-w-full overflow-y-auto p-4 space-y-4 rounded shadow">
			<h1>{title}</h1>
			<SortedTable sortField={sortField} sortOrder={sortOrder} page={page} />
			{window.location.pathname === '/coins' 
				?	<div className="text-center mt-2">
						<button onClick={() => loadNextPage()} className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">Load more</button>
					</div>
				: <div className="text-center mt-2">
						<Link to="/coins" className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">See all coins</Link>
					</div>
			}
			
		</div>
	)
}