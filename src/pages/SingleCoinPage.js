import { useParams } from 'react-router-dom'
import SocialIconsRow from '../components/small/SocialIconsRow'
import BFLoading from '../components/small/BFLoading'
import BFCryptoInfo from '../components/BFCryptoInfo'
import { baseUrl, useCoinBySymbol } from '../endpoints/index'
import { useNavigate } from 'react-router-dom'
import BFCryptoImage from '../components/small/BFCryptoImage'

export default function SingleCoinPage() {
	const params = useParams()
	const { data, isLoading } = useCoinBySymbol(params.symbol)

	const navigate = useNavigate()

	const compareRow = (e) => {
		e.stopPropagation()
		navigate(`/compare?id=${params.symbol}`)
	}

	const PanelOne = ({ id, name, description }) => (
		<div className="col-span-3 p-6 space-y-4 border h-[94vh] bg-white">
			<div className="flex flex-row items-center gap-2">
				<BFCryptoImage symbol={data.symbol} index={0} isLarge={true} />
				<h2 className="text-xl">{data.name}</h2>
			</div>
			<div className="flex flex-row gap-2 justify-between">
				<button onClick={(e) => compareRow(e)} className="w-full text-green-500 bg-green-100 rounded px-6 py-2 font-bold text-sm">Compare</button>
			</div>
			<p>{data.description}</p>
		</div>
	)

	if (isLoading) return <BFLoading />

	return (
		<div className="grid grid-cols-1 md:grid-cols-10 bg-gray-50">
			<PanelOne {...data.index} />

			<div className="col-span-7 p-4 space-y-4">
				<BFCryptoInfo data={{ index: data }} />
			</div>
		</div>
	)
}