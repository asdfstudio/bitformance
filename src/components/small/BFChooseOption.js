import BFIcon from '../BFIcon'

export default function BFChooseOption({ onSelect, selected, options }) {

	const selectedStyle = 'border shadow rounded-md bg-blue-400 text-white px-2 py-1 cursor flex flex-row items-center'
	const notSelectedStyle = 'rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 px-2 py-1 cursor flex flex-row items-center'

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
				return option.id === selected ? <SelectedButton id={option.id} label={option.label} /> : <NotSelectedButton id={option.id} label={option.label} />
			})}
		</>
	)
}