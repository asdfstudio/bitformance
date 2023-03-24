import { formatMoney, calculateReturn, calculateDrawdown } from '../helpers/index'
import BFInfoTags from './small/BFInfoTags'
import BFUpDownTag from './small/BFUpDownTag'
import BFIcon from './BFIcon'
import GraphCard from './GraphCard'
import BFHoldingsTable from './small/BFHoldingsTable'
import BFCryptoImage from './small/BFCryptoImage'
import BFImage from './small/BFImage'

export default function BFCryptoInfo({
	data,
	isHalfGraph = false,
	showIcon = false,
	hideGraph = false,
	panelId = '',
}) {

	const totalReturn = calculateReturn(data.index.value || data.index.price, data.index.initial_value)
	const drawdown = calculateDrawdown(data.index.daily_graph_data.prices || data.index.daily_graph_data.price || [])

	let formattedHoldings = []
	let marketCap = 0
	if (data.rawStocks) {
		formattedHoldings  = data.rawStocks.map(stock => {
			return {
				...stock,
				holdingQuantity: data.index.holdings[stock.symbol],
				indexPrice: data.index.value
			}
		})
		marketCap = data.rawStocks.reduce((sum, a) => a.market_cap + sum, 0)
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

		<div className="relative p-4 bg-white rounded-md border space-y-4">
			<div className="flex flex-row gap-2 items-center">
				<h2 className="font-bold text-xl">{showIcon ? data.index.name : 'Overview'}</h2>
				{(showIcon && data.index.symbol) && <BFCryptoImage symbol={data.index.symbol} />}
				{(showIcon && data.index.logo !== undefined) && <BFImage style="w-8 h-8 object-cover rounded-full" src={data.index.logo} alt={data.index.name} /> }
			</div>

			<div className="absolute -top-1 right-3">
				{(showIcon && hideGraph && panelId == '1') && <div className="bg-blue-500 rounded-full w-2 h-2" />}
				{(showIcon && hideGraph && panelId == '2') && <div className="bg-green-500 rounded-full w-2 h-2" />}
			</div>

			<div className="flex flex-row justify-between text-sm">
				<div className="space-y-2">
					<label className="text-gray-500">Price</label>
					<p className="font-bold">{formatMoney(data.index.value || data.index.price)}</p>
				</div>
				<div className="space-y-2">
					<label className="text-gray-500">24h %</label>
					<BFUpDownTag style="font-bold" change={data.index.changepct_24hour} />
				</div>
				<div className="space-y-2">
					<label className="text-gray-500">7d %</label>
					<BFUpDownTag style="font-bold" change={data.index.changepct_7d || data.index.changepct_7day} />

				</div>
				<div className="space-y-2">
					<label className="text-gray-500">Market Cap</label>
					<p className="font-bold">{formatMoney(data.index.marketcap || marketCap)}</p>
				</div>
				{(data.index.updated && !isHalfGraph) && <BFInfoTags timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />}
			</div>
			{(data.index.updated && isHalfGraph) && <BFInfoTags style="normal" timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />}
		</div>

		{!hideGraph &&
		<div className="bg-white rounded-md border">
			<GraphCard title="Currency Indexes" subtractWidth={adjustGraphWidth} hook={returnGraphData} />
		</div>
		}

		{(totalReturn && !hideGraph) &&
		<div className="bg-white rounded-md border p-4 flex flex-row justify-between items-center">
			<h2 className="text-xl font-bold">Performance Metrics</h2>
			<div className="flex flex-row space-x-6">
				<p className="flex flex-row items-center">
					{data.index.drawdown > 0 ? <UpTag value={data.index.drawdown || drawdown} /> : <DownTag value={data.index.drawdown || drawdown} /> }
					<span className="ml-2 mt-0.5 text-sm">Maximum Drawdown</span>
				</p>
				<p className="flex flex-row items-center">
					{totalReturn > 0 ? <UpTag value={totalReturn} /> : <DownTag value={totalReturn} /> }
					<span className="ml-2 mt-0.5 text-sm">Total Return</span>
				</p>
			</div>
		</div>
		}
		{(formattedHoldings.length > 0 && !hideGraph) &&
			<div className="bg-white rounded-md border p-4 min-w-full overflow-y-auto space-y-4">
				<h2 className="text-xl font-bold">Holdings <span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">{data.rawStocks.length}</span></h2>
				<BFHoldingsTable holdings={formattedHoldings} />
			</div>
		}
	</>)
}
