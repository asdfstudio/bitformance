import { formatMoney, calculateReturn } from '../helpers/index'
import BFInfoTags from './small/BFInfoTags'
import BFUpDownTag from './small/BFUpDownTag'
import BFIcon from './BFIcon'
import GraphCard from './GraphCard'
import BFHoldingsTable from './small/BFHoldingsTable'

export default function BFCryptoInfo({
	data,
	isHalfGraph = false
}) {	

	const totalReturn = calculateReturn(data.index.value, data.index.initial_value)

	let formattedHoldings =[]
	if (data.rawStocks) {
		formattedHoldings  = data.rawStocks.map(stock => {
			return {
				...stock,
				holdingQuantity: data.index.holdings[stock.symbol],
				indexPrice: data.index.value
			}
		})
	}


	const returnGraphData = () => {
		return {
			data: data || {},
			isLoading: false,
			isError: false
		}
	}

	const UpTag = ({ value }) => (
		<span className="text-xl text-green-500"><BFIcon iconName="up-right-arrow" /> {Math.abs(value).toFixed(2)}%</span> 
	)

	const DownTag = ({ value }) => (
		<span className="text-xl text-red-500"><BFIcon iconName="down-left-arrow" /> {Math.abs(value).toFixed(2)}%</span> 
	)

	let adjustGraphWidth = 380
	if (isHalfGraph) {
		adjustGraphWidth += 250
	}

	return (<>

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
				{data.index.updated && <BFInfoTags timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />}
			</div>
		</div>

		<div className="bg-white rounded-md border">
			<GraphCard title="Currency Indexes" subtractWidth={adjustGraphWidth} hook={returnGraphData} />
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
		{formattedHoldings.length &&
			<div className="bg-white rounded-md border p-4 min-w-full overflow-y-auto space-y-4">
				<h2 className="text-xl font-bold">Holdings <span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">{data.rawStocks.length}</span></h2>
				<BFHoldingsTable holdings={formattedHoldings} />
			</div>
		}
	</>)
}