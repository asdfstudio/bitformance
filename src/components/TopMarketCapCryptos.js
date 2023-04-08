import { useState } from 'react'
import BFTable from './small/BFTable'
import { COINS } from '../data/fakeData'
// import { useCryptosByMarketCap } from '../endpoints/index'
import { useCryptosByVolume } from '../endpoints/index'
import BFLoading from './small/BFLoading'
import { Link } from 'react-router-dom'

export default function TopMarketCapCryptos({ title = 'Top Cryptocurrencies by Volume' }) {

	const [sortField, setSortField] = useState('volume')
	const [sortOrder, setSortOrder] = useState('desc') //'asc'
	const [page, setPage] = useState(0)

	const sortBy = (label) => {
		if (label === sortField) {
			setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
			return
		}
		setSortField(label)
		setSortOrder('desc')
		setPage(0)
	}

	const SortedTable = ({ showHeader, sortField, sortOrder, page }) => {
		const { data, isLoading } = useCryptosByVolume(sortField, sortOrder, page)
		return (<>
			<BFTable
				showHeader={showHeader}
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

	const pages = []

	for (let i = 0; i < page + 1; i++) {
		pages.push(<SortedTable showHeader={i === 0} sortField={sortField} sortOrder={sortOrder} index={i} page={i} />)
	}

	return(
		<div className="bg-main-white min-w-full overflow-y-auto p-4 space-y-4 shadow rounded-2xl">
			<h1 className="text-lg px-2 pt-2 text-[22px] mb-4 font-DM_Sans font-medium leading-normal tracking-wide text-main-black">{title}</h1>
			{pages}
			{window.location.pathname === '/coins'
				?	<div className="text-center mt-2">
						<button onClick={() => loadNextPage()} className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">Load more</button>
					</div>
				: <div className="text-center mt-2 pb-4">
					<div class="static h-24 w-full bg-gradient-to-t from-white -mb-10 -mt-28 opacity-80"></div>
					<Link to="/coins" className="relative text-[15px] text-white px-20 py-2 rounded-lg bg-main-buttonBlue text-cente shadow-sm shadow-main-shadowBlue font-DM_Sans font-normal leading-normal tracking-wide">See all Indexes</Link>
				</div>
			}
		</div>
	)
}
