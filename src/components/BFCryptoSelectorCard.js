import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'
import BFSelectCryptos from './small/BFSelectCryptos'
import { useState } from 'react'
import { useMyIndexes } from '../endpoints/index'
import BFCryptoInfo from './BFCryptoInfo'

export default function BFCryptoSelectorCard({ selectedCrypto, selectCrypto, panelId }) {
	
	const [selectedCryptos, setSelectedCryptos] = useState([])

	const selectC = (symbol) => {
		selectCrypto(symbol, panelId)
	}

	const selectIndex = (object) => {
		selectCrypto(object, panelId)
	}

	const DefaultView = () => (
		<div className="text-center my-auto">
			<BFIcon iconName="scale" size="8x" color="#ECECEC" />
		</div>
	)

	const CryptoView = ({ selectedIndex }) => (
		<div>
			{/* <BFCryptoInfo data={selectedIndex} />*/}
		</div>
	)

	return(
		<div className="bg-white shadow rounded-md p-4 flex flex-col">
			<h2 className="text-lg mb-2">Choose Cryptocurrency</h2>
			<BFSelectCryptos 
				isSingleSelectMode={true} 
				selectedCryptos={selectedCryptos} 
				selectCrypto={selectC} 
				selectIndex={selectIndex}
				hook={useMyIndexes} 
			/>

			{selectedCrypto ? <CryptoView selectedIndex={selectedCrypto} /> : <DefaultView />}
		</div>
	)
}