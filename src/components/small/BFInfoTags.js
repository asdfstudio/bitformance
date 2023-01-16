import BFIcon from '../BFIcon'
import moment from 'moment'

export default function BFInfoTags({ style = '', timestamp, weightingMethod, rebalancingInterval }) {
	
	const WEIGHT_TITLE = {
		'equal_weight': 'Equal Weighing',
		'market_cap': 'Weighted by Market Cap',
		'custom': 'Custom'
	}


	const Items = () => (<>
		<p className="px-4 py-1 bg-gray-100 rounded"><BFIcon iconName="time" color="gray" />&nbsp;&nbsp;{moment(timestamp).format('MM/DD/YY hh:mm:ss A')}</p>
		<div className="my-1">
			<span className="px-4 py-1 mx-1 bg-gray-100 rounded whitespace-nowrap	">{WEIGHT_TITLE[weightingMethod]}</span>
			<span className="px-4 py-1 bg-gray-100 rounded whitespace-nowrap">Rebalanced {rebalancingInterval.toLowerCase()}</span>
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