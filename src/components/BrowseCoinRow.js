import BFIcon from './BFIcon'
import BFInfoTags from './small/BFInfoTags'

export default function BrowseCoinRow({
	id,
	image,
	name,
	ticker,
	price,
	hourlyPercentageChange,
	weeklyPercentageChange,
	marketCap,
	showHoldings
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
		<td>
			<div className="flex flex-row items-center gap-2 mb-2">
				<img className="shadow border rounded-full p-1 bg-white w-16 h-16" src={image} alt={name} />
				<p className="font-bold text-lg">{name}</p>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(id)
			}} className="flex flex-row items-center rounded-full p-1 border shadow ">
				<img className="w-8 h-8 shadow border rounded-full p-0.5 bg-white z-10" src={image} alt={name} />
				<img className="w-8 h-8 shadow border rounded-full p-0.5 bg-white z-20 ml-[-8px]" src={image} alt={name} />
				<img className="w-8 h-8 shadow border rounded-full p-0.5 bg-white z-30 ml-[-8px]" src={image} alt={name} />
				<button className="ml-auto mr-1 px-4 h-6 text-sm rounded-xl shadow bg-blue-200 text-blue-400"> View</button>
			</div>
		</td>
		<td className="text-sm align-top pt-8">${price}</td>
		<td className="align-top pt-7">
			{hourlyPercentageChange > 0 
				? <UpTag change={hourlyPercentageChange} />
				: <DownTag change={hourlyPercentageChange} />
			}
		</td>
		<td className="align-top pt-7">	
			{weeklyPercentageChange > 0 
				? <UpTag change={weeklyPercentageChange} />
				: <DownTag change={weeklyPercentageChange} />
			}
		</td>
		<td className="text-sm pl-5 align-top pt-8">{marketCap}</td>
		<td className="align-top pt-8"><BFInfoTags /></td>
		<td className="text-right pr-4">
			<span onClick={() => favoriteRow(id)} >1.2k <BFIcon iconName="favorite" size="sm" color="gray" />&nbsp;&nbsp;</span>
			<span onClick={() => compareRow(id)}> <BFIcon iconName="compare" size="sm" color="gray" /> </span>
		</td>

	</>)
}	