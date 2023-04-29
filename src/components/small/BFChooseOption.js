import BFIcon from '../BFIcon'

export default function BFChooseOption({ isMarketCapWeightAvailable, onSelect, selected, options }) {

	// const selectedStyle = 'w-full h-[38px] shadow shadow-main-shadow rounded-lg bg-main-gColor text-main-white px-3 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal whitespace-nowrap md:w-[146px]'
	// const notSelectedStyle = 'w-full h-[38px] rounded-lg bg-main-lightGray text-main-gray px-3 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal whitespace-nowrap md:w-[146px]'
	// const disabledStyle = 'rounded-lg bg-main-lightGray text-main-gray px-3 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal'

	const selectedStyle = 'border shadow rounded-lg bg-main-gColor text-main-white px-3 py-1 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal whitespace-nowrap'
	const notSelectedStyle = 'rounded-lg bg-main-lightGray hover:bg-gray-200 text-main-gray px-3 py-1 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal whitespace-nowrap'
	const disabledStyle = 'rounded-lg bg-main-lightGray hover:bg-gray-200 text-main-gray px-3 py-1 cursor flex flex-row items-center text-[15px] font-DM_Sans font-medium leading-normal tracking-normal'

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