import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function CoinRow({
	id,
	image,
	name,
	ticker,
	price,
	hourlyPercentageChange,
	weeklyPercentageChange,
	marketCap,
}) {

	const DownTag = ({ change }) => (<div className="w-20 mx-auto">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-red-100">
				<FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />
				<p className="text-sm text-red-400">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="w-20 mx-auto">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-green-100">
				<FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
				<p className="text-sm text-green-500">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	return (
		<>
			<td className="flex flex-row items-center gap-2">
				<img className="w-6 h-6" src={image} alt={name} />
				<p>{name}</p>
			</td>

			<td className="text-sm text-gray-400">{ticker}</td>
			<td className="text-sm">${price}</td>
			<td>
				{hourlyPercentageChange > 0 
					? <UpTag change={hourlyPercentageChange} />
					: <DownTag change={hourlyPercentageChange} />
				}
			</td>
			<td>	
				{weeklyPercentageChange > 0 
					? <UpTag change={weeklyPercentageChange} />
					: <DownTag change={weeklyPercentageChange} />
				}
			</td>
			<td className="text-sm pl-5">{marketCap}</td>
		</>
	)
}