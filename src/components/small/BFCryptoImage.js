import { coinImageMappings } from '../../data/coinImages'

export default function BFCryptoImage({ symbol, index = 0, showNumber = false, isLarge }) {

	const coin = coinImageMappings.find(coin => coin.symbol === symbol)

	const zIndex = `z-${(index + 1)}00`
	let adjust = ''
	if (index > 0) {
		adjust = 'ml-[-10px]'
	}

	if (showNumber) {
		return (<span className={`flex flex-row justify-center items-center w-8 h-8 shadow border rounded-full p-0.25 bg-blue-50 ${zIndex} ${adjust}`}>
			<p className="text-xs text-gray-500">+{symbol}</p>
		</span>)
	}

	if (coin) {
		if (isLarge) {
			return <img className={`w-12 h-12 rounded-full ${zIndex} ${adjust}`} src={coin.image_url} alt={symbol} />
		} 
		return <img className={`w-8 h-8 shadow border-[3px] border-main-white rounded-full p-0.25 bg-white ${zIndex} ${adjust}`} src={coin.image_url} alt={symbol} />
	}
	return <div>image</div>
}