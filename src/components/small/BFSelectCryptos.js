import { useState } from 'react'
import BFIcon from '../BFIcon'
import BFCryptoImage from './BFCryptoImage'
import { coinImageMappings } from '../../data/coinImages'

export default function BFSelectCryptos({ selectedCryptos = [], setSelectedCryptos = function() {} }) {

	const [showMenu, setShowMenu] = useState(false)
	const [shownCryptos, setShownCryptos] = useState(coinImageMappings)
	const [hover, setHover] = useState('')

	const searchCrypto = (text) => {
		setShowMenu(true)
		const matchingCryptos = coinImageMappings.filter(crypto => crypto.name.includes(text))
		setShownCryptos(matchingCryptos)
	}

	const handleSelectCrypto = (symbol) => {
		const indexOf = selectedCryptos.indexOf(symbol)
		const newArray = [...selectedCryptos]
		if (indexOf > -1) {
			newArray.splice(indexOf, 1)
		} else {
			newArray.push(symbol)
		}
		setSelectedCryptos(newArray)
	}

	return(
		<div className="flex flex-col w-full">
	    <div className="w-full flex flex-col items-center">
	        <div className="w-full">
	            <div className="flex flex-col items-center relative">
	                <div className="w-full">
	                    <div className="bg-white flex border border-gray-200 rounded">
	                        <div className="flex flex-auto flex-wrap"></div>
	                        <input onChange={(e) => searchCrypto(e.target?.value)} placeholder="Search cryptos..." className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
	                        <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
	                            <button onClick={() => setShowMenu(!showMenu)} className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
	                                {showMenu ? <BFIcon iconName="close" /> : <BFIcon iconName="menu" />}
	                            </button>
	                        </div>
	                    </div>
	                </div>
	                {showMenu &&
	                <div className="absolute shadow bg-white top-[100%] z-40 w-full left-0 rounded max-h-[300px] overflow-y-auto svelte-5uyqqj">
                    <div className="flex flex-col w-full">
                    	{shownCryptos.map(crypto => (
                        <div onClick={() => handleSelectCrypto(crypto.symbol)} key={crypto.symbol} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
                            <div className="flex flex-row items-center gap-2 p-2">
                            	<BFCryptoImage symbol={crypto.symbol} index={0} isLarge={true} />
                              <p>{crypto.name.slice(0, crypto.name.length - 6)}</p>
                              <p className="text-xs mt-0.5 text-gray-500">{crypto.symbol}</p>
                              {selectedCryptos.includes(crypto.symbol) && <div className="ml-auto"><BFIcon iconName="checked-circle" color="blue" /></div>}
                            </div>
                        </div>
                    	))}
                    </div>
	                </div>
	              	}
	            </div>
	        </div>
	    </div>

	    <div className="mt-2 flex flex-row flex-wrap gap-1">
	    	{selectedCryptos.map(symbol => 
	    		<div onClick={() => handleSelectCrypto(symbol)} key={symbol} className="relative flex flex-row justify-center" onMouseEnter={() => setHover(symbol)} onMouseLeave={() => setHover('')}>
	    			<BFCryptoImage symbol={symbol} index={0}  />
	    			{hover === symbol && <div className="z-50 absolute left-1/3 top-1"><BFIcon iconName="close" color="gray" /></div>}
	    		</div>
	    	)}
	    </div>


		</div>
	)
}