import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'
import BFSelectCryptos from './small/BFSelectCryptos'
import { useState } from 'react'
import { useMyIndexes, useCoinBySymbol, useCryptoById } from '../endpoints/index'
import BFCryptoInfo from './BFCryptoInfo'
import BFLoading from './small/BFLoading'

export default function BFCryptoSelectorCard({ selectedCrypto, selectCrypto, panelId }) {
	

	const [selectedCryptos, setSelectedCryptos] = useState([])

	const selectC = (symbol) => {
		selectCrypto(symbol, panelId)
	}

	const selectIndex = (id) => {
		selectCrypto(id, panelId)
	}

	const DefaultView = () => (
		<div className="text-center my-auto py-28">
			<BFIcon iconName="scale" size="8x" color="#ECECEC" />
		</div>
	)

	const CoinView = () => {
		const { data, isLoading } = useCoinBySymbol(selectedCrypto)
		console.log(selectedCrypto)
		console.log(data)
		return (
			<div>
				 <BFCryptoInfo showIcon={true} isHalfGraph={true} data={{ index: data }} />
			</div>
		)
	}

	const IndexView = () => {
		const { data, isLoading } = useCryptoById(selectedCrypto, true)
		console.log(selectedCrypto)
		console.log(data)
		return (
			<div className="space-y-4 h-full">
				 {data && <BFCryptoInfo showIcon={true} data={data} isHalfGraph={true} />}
				 {isLoading && <BFLoading />}
			</div>
		)

	}

	return(
		<div className="bg-white shadow rounded-md p-4 flex flex-col space-y-2">
			<h2 className="text-lg mb-2">Choose Cryptocurrency</h2>
			<BFSelectCryptos 
				isSingleSelectMode={true} 
				selectedCryptos={selectedCryptos} 
				selectCrypto={selectC} 
				selectIndex={selectIndex}
				hook={useMyIndexes} 
			/>

			{selectedCrypto.length > 7 ? <IndexView />
			 : selectedCrypto.length > 0 ? <CoinView /> 
			 : <DefaultView />
			}
		</div>
	)
}