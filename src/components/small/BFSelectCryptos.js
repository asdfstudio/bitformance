import { useState, useEffect } from 'react'
import BFIcon from '../BFIcon'
import BFCryptoImage from './BFCryptoImage'
import { coinImageMappings } from '../../data/coinImages'
import BFImage from './BFImage'
import BFLoading from './BFLoading'

export default function BFSelectCryptos({ 
	isSingleSelectMode = false, 
	selectedCryptos = [], 
	setSelectedCryptos = function() {},
	selectCrypto = function() {},
	selectIndex = function() {},
	hook = function() { return { data: [], isLoading: false }}
}) {
	const { data, isLoading } = hook()

	const [showMenu, setShowMenu] = useState(false)
	const [shownCryptos, setShownCryptos] = useState(coinImageMappings)
	const [shownIndexes, setShownIndexes] = useState(data || [])
	const [hover, setHover] = useState('')

	useEffect(() => {
		if (data) {
			setShownIndexes(data)
		}
	}, [data])

	const searchCrypto = (text) => {
		setShowMenu(true)
		const matchingCryptos = coinImageMappings.filter(crypto => crypto.name.toLowerCase().includes(text.toLowerCase()))
		setShownCryptos(matchingCryptos)
		const matchingIndexes = data.filter(obj => obj.index.name.toLowerCase().includes(text) || obj.rawStocks.some(stock => stock.name.toLowerCase().includes(text.toLowerCase())))
		setShownIndexes(matchingIndexes)
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
		if (isSingleSelectMode) {
			setShowMenu(false)
			selectCrypto(symbol)
		}
	}

	const handleSelectIndex = (id) => {
		selectIndex(id)
		setShowMenu(false)
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
                    	{isLoading ? <BFLoading isCenter={true} /> : shownIndexes.map(obj => (
                    	    <div onClick={() => handleSelectIndex(obj.index._id.$oid)} key={obj.index._id} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
                    	        <div className="flex flex-row items-center gap-2 p-2">
                    	        	<BFImage src={obj.index.logo} alt={obj.index.name} style="shadow border rounded-full p-1 bg-white w-16 h-16 object-cover" />
                    	        	<p className="font-bold text-lg">{obj.index.name}</p>
                    	          <div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
                    	          	{obj.rawStocks.slice(0, 4).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto.symbol} index={index} />)}
                    	          	{obj.rawStocks.length > 4 && <BFCryptoImage symbol={obj.rawStocks.length - 4} index={4} showNumber={true} /> }
                    	          </div>
                    	          {selectedCryptos.includes(crypto.symbol) && <div className="ml-auto"><BFIcon iconName="checked-circle" color="blue" /></div>}
                    	        </div>
                    	    </div>
                    	))}
                    	{shownIndexes && <hr />}
                    	{shownIndexes && <hr />}

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

	    {!isSingleSelectMode &&
	    <div className="mt-2 flex flex-row flex-wrap gap-1">
	    	{selectedCryptos.map(symbol => 
	    		<div onClick={() => handleSelectCrypto(symbol)} key={symbol} className="relative flex flex-row justify-center" onMouseEnter={() => setHover(symbol)} onMouseLeave={() => setHover('')}>
	    			<BFCryptoImage symbol={symbol} index={0}  />
	    			{hover === symbol && <div className="z-50 absolute left-1/3 top-1"><BFIcon iconName="close" color="gray" /></div>}
	    		</div>
	    	)}
	    </div>
	  	}


		</div>
	)
}