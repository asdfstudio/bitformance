import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'
import BFSelectCryptos from './small/BFSelectCryptos'
import { useState } from 'react'
import { useMyIndexes, useCoinBySymbol, useCryptoById } from '../endpoints/index'
import BFCryptoInfo from './BFCryptoInfo'
import BFLoading from './small/BFLoading'

export default function BFCryptoSelectorCard({ mode, selectedCrypto, isAuthRequired, selectCrypto, panelId, isCompare }) {
	const [selectedCryptos, setSelectedCryptos] = useState([])

	const selectC = (symbol) => {
		selectCrypto(symbol, panelId, false)
	}

	const selectIndex = (id, isAuth) => {
		selectCrypto(id, panelId, isAuth)
	}

	const DefaultView = () => (
		<div>
			<div className='ml-4'>
				<BFIcon iconName="arrowUP" color="#b7c3d1" />
			</div>
			<div className='ml-[23px] -mt-4 w-8 h-12 border-l-[2px] border-b-[1px] border-main-symbol rounded-bl-full'/>
			<h1 className="text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray mr-2 p-4 pl-20 -mt-10">
				You haven’t added any currency to compare. Please all from above.
			</h1>
			<div className="text-center my-auto py-28">
				<BFIcon iconName="scale" size="8x" color="#ECECEC" />
			</div>
		</div>
	)

	const CoinView = () => {
		const { data, isLoading } = useCoinBySymbol(selectedCrypto)
		return (
			<div className="space-y-4 h-full">
				{data && 
					<BFCryptoInfo 
						showIcon={true} 
						hideGraph={mode === 'overlay'} 
						isHalfGraph={true} 
						data={{ index: data }} 
						panelId={panelId}
						halfGraph={true}
						isCompare={isCompare}
					/>
				}
				{isLoading && <BFLoading />}
			</div>
		)
	}

	const IndexView = () => {
		const { data, isLoading } = useCryptoById(selectedCrypto, isAuthRequired)
		return (
			<div className="space-y-4 h-full">
				 {data && 
				 		<BFCryptoInfo 
				 			showIcon={true} 
				 			hideGraph={mode === 'overlay'} 
				 			data={data} 
				 			isHalfGraph={true} 
				 			panelId={panelId}
							halfGraph={true}
							isCompare={isCompare}
				 		/>
				 	}
				 {isLoading && <BFLoading />}
			</div>
		)
	}

	return(
		<div className="bg-main-white rounded-xl border p-4 px-6 flex flex-col space-y-2">
		  <h2 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black mb-2">Choose Cryptocurrency</h2>
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