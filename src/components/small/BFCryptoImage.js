import { coinImageMappings } from '../../data/coinImages'

export default function BFCryptoImage({ symbol, index = 0, showNumber = false }) {

	const coin = coinImageMappings.find(coin => coin.symbol === symbol)

	const zIndex = `z-${(index + 1)}0`
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
		return <img className={`w-8 h-8 shadow border rounded-full p-0.25 bg-white ${zIndex} ${adjust}`} src={coin.image_url} alt={symbol} />
	}
	return <div>image</div>
}