import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { usePerformers } from '../endpoints/index'
import { formatMoney } from '../helpers/index'
import BFImage from './small/BFImage'
import BFLoading from './small/BFLoading'

export default function PerfomersCards() {
	const { data, isLoading } = usePerformers()

	if (isLoading) return (
		<div className="pt-4 pl-4 pb-4  bg-white shadow rounded">
			<h1 className="text-xl tracking-wider mb-6">24h Performers</h1>
			<div className="h-40"><BFLoading heightAdjust="h-2/3" /></div>
			<div className="text-right mt-4 mr-4">
				<Link className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">See all indexes</Link>
			</div>
		</div>
	)

	const sorted = data.indexes.sort((a, b) => {
		if (a.changepct_24hour > b.changepct_24hour) {
			return -1
		}
		return 1
	})

	return(
		<div className="pt-4 pl-4 pb-4  bg-white shadow rounded">
			<h1 className="text-xl tracking-wider mb-6">24h Performers</h1>
			<div>
				{sorted.slice(0,3).map(coin => (
					<div key={coin.name + '-recently-added'} className="grid grid-cols-4 gap-4 py-1">
						<div className="flex flex-row items-center gap-2">
							<BFImage src={coin.logo} alt={coin.name} style="w-6 h-6 object-cover rounded-full" />
							<p>{coin.name}</p>
						</div>
						<div className="ml-4">
							<label className="text-xs text-gray-400">24h %</label>
							<div className="flex flex-row items-center gap-1">	
								{coin.changepct_24hour > 0 
									? <FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
									: <FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />

								}
								<p className="text-sm">{Math.abs(coin.changepct_24hour).toFixed(2)}%</p>
							</div>
						</div>
						<div className="col-span-2">
							<label className="text-xs text-gray-400">Market cap</label>
							<p className="text-sm">{formatMoney(coin.marketcap)}</p>
						</div>
					</div>
				))}
			</div>
			<div className="text-right mt-4 mr-4">
				<Link to="/indexes/browse" className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">See all indexes</Link>
			</div>
		</div>
	)
}