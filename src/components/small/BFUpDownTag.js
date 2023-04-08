import BFIcon from '../BFIcon'

export default function BFUpDownTag({ change, style = 'px-2 py-1' }) {
		
	const DownTag = ({ change }) => (<div className="">
			<div className={`flex flex-row ${style} rounded-lg justify-center items-center gap-1 text-[12px]`}>
				<BFIcon iconName="down-left-arrow" size="xs" color="#fd5d60" />
				<p className="text-sm">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="">
			<div className={`flex flex-row ${style} rounded-lg justify-center items-center gap-1 text-[12px]`}>
				<BFIcon iconName="up-right-arrow" size="xs" color="#40c8b8" />
				<p className="text-sm">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	return change > 0 ? <UpTag change={change} /> : <DownTag change={change} />
}