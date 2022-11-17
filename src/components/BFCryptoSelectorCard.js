import BFIcon from './BFIcon'

export default function BFCryptoSelectorCard() {
	return(
		<div className="bg-white shadow rounded-md p-4 flex flex-col">
			<h2 className="text-lg">Choose Cryptocurrency</h2>
			<div className="mt-2 flex flex-row items-center gap-2 border rounded p-1 bg-gray-50">
				<BFIcon iconName="search" color="gray" /> 
				<input className="w-full !outline-none bg-gray-50" type="text" placeholder="Search indexes to compare.." />
			</div>
			<div className="text-center my-auto">
				<BFIcon iconName="scale" size="8x" color="#ECECEC" />
			</div>
		</div>
	)
}