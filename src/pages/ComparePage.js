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
	const [isAuthRequiredOne, setSelectedCryptoAuthOne] = useState(searchParams.get('isAuth') === 'true')

	const [selectedCryptoTwo, setSelectedCryptoTwo] = useState('')
	const [isAuthRequiredTwo, setSelectedCryptoAuthTwo] = useState(false)

	const selectCrypto = (objectId, panelId, isAuthRequired) => {
		const setCall = panelId == 1 ? setSelectedCryptoOne : setSelectedCryptoTwo
		const setAuthCall = panelId == 1 ? setSelectedCryptoAuthOne : setSelectedCryptoAuthTwo

		setCall(objectId)
		setAuthCall(isAuthRequired)
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
		<div className="p-4 h-5/6 bg-main-lightGray">
			<div className="flex flex-row gap-4 rounded-xl border bg-main-white p-4 items-center m-2 mb-4">
				<h1 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black mr-2">Compare Currencies</h1>
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1 items-start overflow-y-auto m-2">
				<BFCryptoSelectorCard mode={typeSelected} selectedCrypto={selectedCryptoOne} isAuthRequired={isAuthRequiredOne} selectCrypto={selectCrypto} panelId="1" />
				<BFCryptoSelectorCard mode={typeSelected} selectedCrypto={selectedCryptoTwo} isAuthRequired={isAuthRequiredTwo} selectCrypto={selectCrypto} panelId="2" />
			</div>
			{(typeSelected === 'overlay' && selectedCryptoOne && selectedCryptoTwo) && <OverlayGraph selectedCryptoOne={selectedCryptoOne} selectedCryptoTwo={selectedCryptoTwo} />}
		</div>
	)
}