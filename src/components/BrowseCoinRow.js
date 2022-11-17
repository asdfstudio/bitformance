import BFIcon from './BFIcon'

export default function BrowseCoinRow({
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
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded">
				<BFIcon iconName="down-left-arrow" size="xs" color="red" />
				<p className="text-sm">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="w-20 mx-auto">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded">
				<BFIcon iconName="up-right-arrow" size="xs" color="green" />
				<p className="text-sm">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const compareRow = (id) => {
		//TODO: nav compare add graph
	}

	const favoriteRow = (id) => {
		//TODO: favorite
	}

	return(<>
		<td className="flex flex-row items-center gap-2">
			<img className="w-6 h-6" src={image} alt={name} />
			<p>{name}</p>
		</td>
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
		<td>date time tag, weighting balancing</td>
		<td className="text-right">
			<span onClick={() => favoriteRow(id)} >1.2k <BFIcon iconName="favorite" size="sm" color="gray" />&nbsp;&nbsp;</span>
			<span onClick={() => compareRow(id)}> <BFIcon iconName="compare" size="sm" color="gray" /> </span>
		</td>

	</>)
}	