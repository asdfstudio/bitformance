import BFIcon from '../BFIcon'
import moment from 'moment'

export default function BFInfoTags({ style = '', timestamp, weightingMethod, rebalancingInterval }) {
	
	const WEIGHT_TITLE = {
		'equal_weight': 'Equal Weighing',
		'market_cap': 'Weighted by Market Cap',
		'custom': 'Custom'
	}


	const Items = () => (<>
			<p className="px-3 py-1 bg-main-lightGray rounded text-main-gray font-DM_Sans font-medium leading-normal tracking-wide text-[14px]">
				<BFIcon iconName="time" color="#566375" />
				&nbsp;&nbsp;{moment(timestamp).format('MM/DD/YY hh:mm:ss A')}
			</p>
		<div className="my-1.5 -ml-1.5">
			<span className="px-4 py-1 mr-1.5 bg-main-lightGray rounded text-main-gray font-DM_Sans font-medium leading-normal tracking-wide text-[14px]">{WEIGHT_TITLE[weightingMethod]}</span>
			<span className="px-4 py-1 bg-main-lightGray rounded text-main-gray font-DM_Sans font-medium leading-normal tracking-wide text-[14px]">Rebalanced {rebalancingInterval.toLowerCase()}</span>
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
		<div className="flex flex-col flex-start text-xs gap-0.5 items-start sm:items-end">
			<Items />
		</div>
	)
}