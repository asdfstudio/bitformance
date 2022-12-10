import { useParams } from 'react-router-dom'
import exampleIcon from '../exampleIcon.png'
import { COINS } from '../data/fakeData'
import BFIcon from '../components/BFIcon'
import SocialIconsRow from '../components/small/SocialIconsRow'
import GraphCard from '../components/GraphCard'
import BFInfoTags from '../components/small/BFInfoTags'
import BFHoldingsTable from '../components/small/BFHoldingsTable'
import BFUpDownTag from '../components/small/BFUpDownTag'
import { useCryptoById } from '../endpoints/index'
import { calculateReturn, formatMoney } from '../helpers/index'
import BFLoading from '../components/small/BFLoading'

export default function CryptoPage({ isAuth }) {
	const params = useParams()
	const { data, isLoading, isError } = useCryptoById(params.id, isAuth)

	const PanelOne = ({ id, name, description }) => (
		<div className="col-span-3 p-6 space-y-4 border h-[94vh] bg-white">
			<div className="flex flex-row items-center gap-2">
				<img className="shadow-md w-16 h-16 rounded-full bg-white p-1" src={exampleIcon} alt="crypto" />
				<h2 className="text-xl">{name}</h2>
			</div>
			<div className="flex flex-row gap-2 justify-between">
				<button className="w-full text-white px-5 py-2 rounded bg-blue-500 text-sm font-bold">
					<BFIcon iconName="open-favorite" /> Favorite
				</button>
				<button className="w-full text-green-500 bg-green-100 rounded px-6 py-2 font-bold text-sm">Compare</button>
			</div>

			<div>
				<p className="text-gray-400 text-sm mb-2">Share this index</p>
				<div className="flex flex-row gap-8 cursor-pointer text-gray-500">
					<SocialIconsRow showCopyLink={true} />
				</div>
			</div>
			<p>{description}</p>
		</div>
	)


	const UpTag = ({ value }) => (
		<span className="text-xl text-green-500"><BFIcon iconName="up-right-arrow" /> {Math.abs(value).toFixed(2)}%</span> 
	)

	const DownTag = ({ value }) => (
		<span className="text-xl text-red-500"><BFIcon iconName="down-left-arrow" /> {Math.abs(value).toFixed(2)}%</span> 
	)

	if (isLoading) return <BFLoading />

	const totalReturn = calculateReturn(data.index.value, data.index.initial_value)

	const returnGraphData = () => {
		return {
			data: data || {},
			isLoading: false,
			isError: false
		}
	}

	console.log(data)
	const formattedHoldings = data.rawStocks.map(stock => {
		return {
			...stock,
			holdingQuantity: data.index.holdings[stock.symbol],
			indexPrice: data.index.value
		}
	})


	return (
		<div className="grid grid-cols-1 md:grid-cols-10 bg-gray-50">
			<PanelOne {...data.index} />

			<div className="col-span-7 p-4 space-y-4">

				<div className="p-4 bg-white rounded-md border space-y-4">
					<h2 className="font-bold text-xl">Overview</h2>
					<div className="flex flex-row justify-between text-sm">
						<div className="space-y-2">
							<label className="text-gray-500">Price</label>
							<p className="font-bold">{formatMoney(data.index.value)}</p>
						</div>
						<div className="space-y-2">
							<label className="text-gray-500">24h %</label>
							<BFUpDownTag style="font-bold" change={data.index.changepct_24hour} />
						</div>
						<div className="space-y-2">
							<label className="text-gray-500">7d %</label>
							<BFUpDownTag style="font-bold" change={data.index.changepct_7d} />

						</div>
						<div className="space-y-2">
							<label className="text-gray-500">Market Cap</label>
							<p className="font-bold">{formatMoney(data.index.marketcap)}</p>
						</div>
						<BFInfoTags timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />
					</div>
				</div>

				<div className="bg-white rounded-md border">
					<GraphCard title="Currency Indexes" subtractWidth={380} hook={returnGraphData} />
				</div>

				<div className="bg-white rounded-md border p-4 flex flex-row justify-between items-center">
					<h2 className="text-xl font-bold">Performance Metrics</h2>
					<div className="flex flex-row space-x-6">
						<p className="flex flex-row items-center">
							{data.index.drawdown > 0 ? <UpTag value={data.index.drawdown} /> : <DownTag value={data.index.drawdown} /> }
							<span className="ml-2 mt-0.5 text-sm">Maximum Drawdown</span>
						</p>
						<p className="flex flex-row items-center">
							{totalReturn > 0 ? <UpTag value={totalReturn} /> : <DownTag value={totalReturn} /> }
							<span className="ml-2 mt-0.5 text-sm">Total Return</span>
						</p>
					</div>
				</div>

				<div className="bg-white rounded-md border p-4 min-w-full overflow-y-auto space-y-4">
					<h2 className="text-xl font-bold">Holdings <span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">{data.rawStocks.length}</span></h2>
					<BFHoldingsTable holdings={formattedHoldings} />
				</div>


			</div>
		</div>
	)
}