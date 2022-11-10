import exampleIcon from '../exampleIcon.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function RecentlyAdded() {
	
	//TODO: get real data	
	const coins = [
		{
			image: exampleIcon,
			name: 'Bluechip',
			hourlyPercentageChange: -0.91,
			marketCap: '$380.44B'
		},
		{
			image: exampleIcon,
			name: 'Alient Coin',
			hourlyPercentageChange: 12.01,
			marketCap: '$120.44B'
		},
		{
			image: exampleIcon,
			name: 'Meme only',
			hourlyPercentageChange: 5.12,
			marketCap: '$12.24M'
		},
		{
			image: exampleIcon,
			name: 'YOLO',
			hourlyPercentageChange: -1.10,
			marketCap: '$50.29B'
		},
		{
			image: exampleIcon,
			name: 'What the Coin',
			hourlyPercentageChange: -41.56,
			marketCap: '$23.12B'
		}
	]

	return(
		<div className="pt-4 pl-4 pb-4  bg-white shadow rounded">
			<h1 className="text-xl tracking-wider mb-6">Recently Added</h1>
			<div>
				{coins.map(coin => (
					<div key={coin.name + '-recently-added'} className="grid grid-cols-3 gap-4 py-1">
						<div className="flex flex-row items-center gap-2">
							<img className="w-6 h-6" src={coin.image} alt={coin.name} />
							<p>{coin.name}</p>
						</div>
						<div className="">
							<label className="text-xs text-gray-400">24h %</label>
							<div className="flex flex-row items-center gap-1">	
								{coin.hourlyPercentageChange > 0 
									? <FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
									: <FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />

								}
								<p className="text-sm">{Math.abs(coin.hourlyPercentageChange).toFixed(2)}%</p>
							</div>
						</div>
						<div>
							<label className="text-xs text-gray-400">Market cap</label>
							<p className="text-sm">{coin.marketCap}</p>
						</div>
					</div>
				))}
			</div>
			<div className="text-right mt-4 mr-4">
				<Link className="text-sm w-60 rounded bg-blue-500 text-white px-12 py-2">See all indexes</Link>
			</div>
		</div>
	)
}