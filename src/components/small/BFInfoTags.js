export default function BFInfoTags({ style = '', timestamp, weightingMethod, rebalancingInterval }) {
	
	//TODO: icon, timestamp, map words
	const Items = () => (<>
		<p className="px-4 py-1 bg-gray-100 rounded">11/22/22 11:00:12AM</p>
		<div className="my-1">
			<span className="px-4 py-1 mx-1 bg-gray-100 rounded whitespace-nowrap	">{weightingMethod}</span>
			<span className="px-4 py-1 bg-gray-100 rounded whitespace-nowrap">{rebalancingInterval}</span>
		</div>
	</>)

	if (style === 'normal') {
		return (
			<div className="flex flex-row gap-1 text-xs">
				<Items />
			</div>
		)
	}

	return(
		<div className="flex flex-col flex-start text-xs items-end gap-0.5">
			<Items />
		</div>
	)
}