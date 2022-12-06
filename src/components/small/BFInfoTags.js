export default function BFInfoTags({ timestamp, weightingMethod, rebalancingInterval }) {
	
	//TODO: icon, timestamp, map words
	return(
		<div className="flex flex-col flex-start text-xs items-end gap-0.5">
			<p className="px-4 py-1 bg-gray-100 rounded">11/22/22 11:00:12AM</p>
			<div className="my-1">
				<span className="px-4 py-1 mx-1 bg-gray-100 rounded whitespace-nowrap	">{weightingMethod}</span>
				<span className="px-4 py-1 bg-gray-100 rounded whitespace-nowrap">{rebalancingInterval}</span>
			</div>
		</div>
	)
}