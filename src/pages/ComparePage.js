import { useState, useEffect } from 'react'
import BFCryptoSelectorCard from '../components/BFCryptoSelectorCard'
import BFChooseOption from '../components/small/BFChooseOption'
import { useSearchParams } from 'react-router-dom'
import { useCoinBySymbol, useCryptoById } from '../endpoints/index'
import GraphCard from '../components/GraphCard'
import BFLoading from '../components/small/BFLoading'

export default function ComparePage() {

	const [searchParams, setSearchParams] = useSearchParams()

	const [typeSelected, setTypeSelected] = useState('side-by-side')

	const [selectedCryptoOne, setSelectedCryptoOne] = useState('')
	const [selectedCryptoTwo, setSelectedCryptoTwo] = useState('')

	const selectCrypto = (objectId, panelId) => {
		const setCall = panelId == 1 ? setSelectedCryptoOne : setSelectedCryptoTwo
		setCall(objectId)
	}

	useEffect(() => {
		const id = searchParams.get('id')
		if (id) {
			setSelectedCryptoOne(id)
		}
	}, [])



	const OverlayGraph = ({ selectedCryptoOne, selectedCryptoTwo }) => {
		const isOneCrypto = selectedCryptoOne.length > 7
		const isTwoCrypto = selectedCryptoTwo.length > 7
		const hookChoiceOne = isOneCrypto ? useCryptoById : useCoinBySymbol
		const hookChoiceTwo = isTwoCrypto ? useCryptoById : useCoinBySymbol
		const { data, isLoading } = hookChoiceOne(selectedCryptoOne)
		const { data: dataTwo, isLoading: isLoadingTwo } = hookChoiceTwo(selectedCryptoTwo)
		
		if (isLoading || isLoadingTwo) {
			return <BFLoading />
		}
		return <GraphCard isOverlay={true} hook={() => {
			return { 
				data: [
					{ data, isCrypto: isOneCrypto }, 
					{ data: dataTwo, isCrypto: isTwoCrypto }
				], 
				isLoading: false, 
				isError: false
			}}
		} />
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1 items-start overflow-y-auto">
				<BFCryptoSelectorCard mode={typeSelected} selectedCrypto={selectedCryptoOne} selectCrypto={selectCrypto} panelId="1" />
				<BFCryptoSelectorCard mode={typeSelected} selectedCrypto={selectedCryptoTwo} selectCrypto={selectCrypto} panelId="2" />
			</div>
			{(typeSelected === 'overlay' && selectedCryptoOne && selectedCryptoTwo) && <OverlayGraph selectedCryptoOne={selectedCryptoOne} selectedCryptoTwo={selectedCryptoTwo} />}
		</div>
	)
}