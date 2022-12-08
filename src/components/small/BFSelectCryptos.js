import { useState } from 'react'
import BFIcon from '../BFIcon'
import BFCryptoImage from './BFCryptoImage'

export default function BFSelectCryptos() {

	const [showMenu, setShowMenu] = useState(false)

	const searchCrypto = (text) => {
		setShowMenu(true)
	}

	return(
		<div class="flex flex-col w-full">
		    <div class="w-full flex flex-col items-center">
		        <div class="w-full">
		            <div class="flex flex-col items-center relative">
		                <div class="w-full">
		                    <div class="bg-white flex border border-gray-200 rounded">
		                        <div class="flex flex-auto flex-wrap"></div>
		                        <input onChange={(e) => searchCrypto(e.target?.value)} placeholder="Search cryptos..." class="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
		                        <div class="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
		                            <button onClick={() => setShowMenu(!showMenu)} class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
		                                {showMenu ? <BFIcon iconName="close" /> : <BFIcon iconName="menu" />}
		                            </button>
		                        </div>
		                    </div>
		                </div>
		                {showMenu &&
		                <div class="absolute shadow bg-white top-[100%] z-40 w-full left-0 rounded max-h-[300px] overflow-y-auto svelte-5uyqqj">
	                    <div class="flex flex-col w-full">
	                        <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
	                            <div class="flex flex-row items-center gap-2 p-2">
	                            	<BFCryptoImage symbol="BTC" index={0} isLarge={true} />
                                <p>Bitcoin</p>
                                <p className="text-xs text-gray-500">BTC</p>
	                            </div>
	                        </div>
	                        <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
	                            <div class="flex flex-row items-center gap-2 p-2">
	                            	<BFCryptoImage symbol="BTC" index={0} isLarge={true} />
                                <p>Bitcoin</p>
                                <p className="text-xs text-gray-500">BTC</p>
	                            </div>
	                        </div>
	                        <div class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
	                            <div class="flex flex-row items-center gap-2 p-2">
	                            	<BFCryptoImage symbol="BTC" index={0} isLarge={true} />
                                <p>Bitcoin</p>
                                <p className="text-xs text-gray-500">BTC</p>
	                            </div>
	                        </div>
	                    </div>
		                </div>
		              	}
		            </div>
		        </div>
		    </div>
		</div>
	)
}