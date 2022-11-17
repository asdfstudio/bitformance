import BFIcon from './BFIcon'

export default function BFCryptoSelectorCard({ selectedCrypto, selectCrypto, id }) {
	
	//TODO: show cryptos list from DB 
	const showOptions = (text) => {
		selectCrypto(text, id)
	}

	const DefaultView = () => (
		<div className="text-center my-auto">
			<BFIcon iconName="scale" size="8x" color="#ECECEC" />
		</div>
	)

	const CryptoView = () => (
		<div>
			{JSON.stringify(selectedCrypto)}
		</div>
	)

	return(
		<div className="bg-white shadow rounded-md p-4 flex flex-col">
			<h2 className="text-lg">Choose Cryptocurrency</h2>
			<div className="mt-2 flex flex-row items-center gap-2 border rounded px-2 py-1 bg-gray-50">
				<BFIcon iconName="search" color="gray" /> 
				<input onChange={(e) => showOptions(e.target?.value)} className="w-full !outline-none bg-gray-50" type="text" placeholder="Search indexes to compare.." />
			</div>

			{selectedCrypto ? <CryptoView /> : <DefaultView />}
		</div>
	)
}