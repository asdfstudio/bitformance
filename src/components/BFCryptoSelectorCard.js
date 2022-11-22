import BFSearchBar from './small/BFSearchBar'
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
			display data
		</div>
	)

	return(
		<div className="bg-white shadow rounded-md p-4 flex flex-col">
			<h2 className="text-lg mb-2">Choose Cryptocurrency</h2>
			<BFSearchBar onChange={showOptions} />

			{selectedCrypto ? <CryptoView /> : <DefaultView />}
		</div>
	)
}