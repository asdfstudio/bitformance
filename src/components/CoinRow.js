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

	return (
		<>
			<td className="flex flex-row items-center gap-2">
				<img className="w-6 h-6" src={image} alt={name} />
				<p>{name}</p>
			</td>

			<td className="text-sm text-gray-400">{ticker}</td>
			<td className="text-sm">${price}</td>
			<td>
				<div className="flex flex-row items-center gap-1">
					{hourlyPercentageChange > 0 
						? <FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
						: <FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />
					}
					<p className="text-sm">{Math.abs(hourlyPercentageChange).toFixed(2)}%</p>
				</div>
			</td>
			<td>	
				<div className="flex flex-row items-center gap-1">
					{weeklyPercentageChange > 0 
						? <FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
						: <FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />
					}
					<p className="text-sm">{Math.abs(weeklyPercentageChange).toFixed(2)}%</p>
				</div>
			</td>
			<td className="text-sm">{marketCap}</td>
		</>
	)
}