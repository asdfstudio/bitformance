import { useState, useEffect } from 'react'
import BFCryptoSelectorCard from '../components/BFCryptoSelectorCard'
import exampleIcon from '../exampleIcon.png'
import BFChooseOption from '../components/small/BFChooseOption'

export default function ComparePage() {

	const [typeSelected, setTypeSelected] = useState('side-by-side')

	const [selectedCryptoOne, setSelectedCryptoOne] = useState(null)
	const [selectedCryptoTwo, setSelectedCryptoTwo] = useState(null)

	const selectCrypto = (objectId, panelId) => {
		console.log(objectId)
		//TODO: load object data with fetch

		const setCall = panelId == 1 ? setSelectedCryptoOne : setSelectedCryptoTwo
		setCall(objectId)
	}

	return(
		<div className="p-4 h-5/6">
			<div className="flex flex-row gap-4 rounded-lg border bg-white p-4 shadow items-center">
				<h1 className="text-xl mr-2">Compare Currencies</h1>
				<BFChooseOption onSelect={setTypeSelected} selected={typeSelected} options={[
					{
						id: 'side-by-side',
						label: 'Side-by-side'
					},
					{
						id: 'overlay',
						label: 'Overlay'
					}
				]} />
			</div>

			<div className="grid grid-cols-2 gap-2 p-1 h-4/5 overflow-y-auto">
				<BFCryptoSelectorCard selectedCrypto={selectedCryptoOne} selectCrypto={selectCrypto} panelId="1" />
				<BFCryptoSelectorCard selectedCrypto={selectedCryptoTwo} selectCrypto={selectCrypto} panelId="2" />
			</div>
		</div>
	)
}