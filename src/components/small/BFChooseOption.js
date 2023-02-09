import BFIcon from '../BFIcon'

export default function BFChooseOption({ isMarketCapWeightAvailable, onSelect, selected, options }) {

	const selectedStyle = 'border shadow rounded-md bg-blue-400 text-white px-2 py-1 cursor flex flex-row items-center'
	const notSelectedStyle = 'rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 px-2 py-1 cursor flex flex-row items-center'
	const disabledStyle = 'rounded-md bg-gray-200 hover:bg-gray-200 text-gray-500 px-2 py-1 cursor flex flex-row items-center'

	const SelectedButton = ({ id, label }) => (
		<button onClick={() => onSelect(id)} className={selectedStyle}>
			<BFIcon iconName="checked-circle" />&nbsp;&nbsp;
			<span className="text-sm">{label}</span>
		</button>
	)

	const NotSelectedButton = ({ id, label }) => (
		<button onClick={() => onSelect(id)} className={notSelectedStyle}>
			<BFIcon iconName="open-circle" />&nbsp;&nbsp;
			<span className="text-sm">{label}</span>
		</button>
	)

	return(
		<>
			{options.map(option => {
				if (!isMarketCapWeightAvailable && option.id === 'market_cap') {
					return (
						<button disabled key={option.id} className={disabledStyle}>
							<BFIcon iconName="close-circle" />&nbsp;&nbsp;
							<span className="text-sm">{option.label}</span>
						</button>
					)
				}
				return option.id === selected 
					? <SelectedButton key={option.id} id={option.id} label={option.label} /> 
					: <NotSelectedButton key={option.id} id={option.id} label={option.label} />
			})}
		</>
	)
}