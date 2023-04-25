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
			{/* <h1 className="text-lg px-2 pt-2 text-[22px] mb-4 font-DM_Sans font-medium leading-normal tracking-wide text-main-black">{title}</h1> */}
			{pages}
			{window.location.pathname === '/coins'
				?	<div className="text-center mt-2">
						<button onClick={() => loadNextPage()} className="relative text-[15px] text-white py-3 rounded-lg bg-main-buttonBlue text-cente shadow-sm shadow-main-shadowBlue font-DM_Sans font-medium leading-normal tracking-wide w-full sm:w-[300px]">Load more</button>
					</div>
				: <div className="text-center mt-2 pb-6">
					<div className="static h-24 w-full bg-gradient-to-t from-white -mb-14 -mt-28 opacity-90"></div>
					<div className="static h-24 w-full bg-gradient-to-t from-white -mb-12 -mt-28 opacity-30"></div>
					<div className="static h-24 w-full bg-gradient-to-t from-white -mb-6 -mt-28 opacity-80 md:hidden"></div>
					<div className='flex justify-center w-full -mb-1'>
						<Link to="/coins" className="relative text-[15px] text-white py-3 rounded-lg bg-main-buttonBlue text-cente shadow-sm shadow-main-shadowBlue font-DM_Sans font-medium leading-normal tracking-wide w-full sm:w-[300px]">See all Indexes</Link>
					</div>
				</div>
			}
		</div>
	)
}
