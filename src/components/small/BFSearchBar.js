import BFIcon from '../BFIcon'

export default function BFSearchBar({ onChange, placeholder = "Search indexes to compare.." }) {

	return(
		<div className="flex flex-row items-center gap-2 border rounded-lg px-4 py-2 bg-main-lightGray">
			<BFIcon iconName="search" color="#566375" /> 
			<input onChange={(e) => onChange(e.target?.value)} className="w-full !outline-none bg-gray-50 text-main-gray text-[15px] opacity-80 font-DM_Sans font-normal leading-normal tracking-normal" type="text" placeholder={placeholder} />
		</div>
	)
}