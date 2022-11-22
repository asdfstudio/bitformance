import BFIcon from '../BFIcon'

export default function BFSearchBar({ onChange }) {

	return(
		<div className="flex flex-row items-center gap-2 border rounded px-2 py-1 bg-gray-50">
			<BFIcon iconName="search" color="gray" /> 
			<input onChange={(e) => onChange(e.target?.value)} className="w-full !outline-none bg-gray-50" type="text" placeholder="Search indexes to compare.." />
		</div>
	)
}