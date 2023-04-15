import { formatMoney, calculateReturn, calculateDrawdown } from '../helpers/index'
import BFInfoTags from './small/BFInfoTags'
import BFUpDownTag from './small/BFUpDownTag'
import BFIcon from './BFIcon'
import GraphCard from './GraphCard'
import BFHoldingsTable from './small/BFHoldingsTable'
import BFCryptoImage from './small/BFCryptoImage'
import BFImage from './small/BFImage'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function BFCryptoInfo({
	data,
	isHalfGraph = false,
	showIcon = false,
	hideGraph = false,
	panelId = '',
	halfGraph = false,
	singlePage = false,
}) {
	const { width } = useWindowDimensions();

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
		<span className="text-[30px] font-DM_Sans font-medium leading-normal tracking-normal text-main-green"><BFIcon iconName="up-right-arrow" /> {Math.abs(value).toFixed(2)}%</span>
	)

	const DownTag = ({ value }) => (
		<span className="text-[30px] font-DM_Sans font-medium leading-normal tracking-normal text-main-deepOrange"><BFIcon iconName="down-left-arrow" /> {Math.abs(value).toFixed(2)}%</span>
	)

	let adjustGraphWidth = 0

	if (width < 1200) {
		adjustGraphWidth = 0
	} else if (isHalfGraph) {
		adjustGraphWidth += 860
	} else if(width < 1400){
		adjustGraphWidth = 260
	} else  {
		adjustGraphWidth = 420
	}

	return (<>

		<div className={`relative p-4 bg-white border-main-lightGrayBorder space-y-4 mt-1 ${singlePage ? 'border rounded-xl' : 'border-t-2'}`}>
			<div className="flex flex-row gap-3 items-center">
				{(showIcon && data.index.symbol) && <BFCryptoImage symbol={data.index.symbol} />}
				{(showIcon && data.index.logo !== undefined) && <BFImage style="w-[55px] h-[55px] object-cover rounded-full border-2 border-white drop-shadow-md" src={data.index.logo} alt={data.index.name} /> }
				<h2 className="text-[18px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">{showIcon ? data.index.name : 'Overview'}</h2>
			</div>

			<div className="absolute -top-1 right-3">
				{(showIcon && hideGraph && panelId == '1') && <div className="bg-blue-500 rounded-full w-2 h-2" />}
				{(showIcon && hideGraph && panelId == '2') && <div className="bg-green-500 rounded-full w-2 h-2" />}
			</div>

			<div className="flex flex-row justify-between text-sm">
				<div className="space-y-2 text-[16px] font-DM_Sans leading-normal tracking-normal">
					<label className="font-normal text-main-gray">Price</label>
					<p className="font-bold text-main-black">{formatMoney(data.index.value || data.index.price)}</p>
				</div>
				<div className="space-y-2 text-[16px] font-DM_Sans leading-normal tracking-normal">
					<label className="font-normal text-main-gray">24h %</label>
					<BFUpDownTag style="font-medium text-main-black" change={data.index.changepct_24hour} />
				</div>
				<div className="space-y-2 text-[16px] font-DM_Sans leading-normal tracking-normal">
					<label className="font-normal text-main-gray">7d %</label>
					<BFUpDownTag style="font-medium text-main-black" change={data.index.changepct_7d || data.index.changepct_7day} />

				</div>
				<div className="space-y-2 text-[16px] font-DM_Sans leading-normal tracking-normal">
					<label className="font-normal text-main-gray">Market Cap</label>
					<p className="font-bold text-main-black">{formatMoney(data.index.marketcap || marketCap)}</p>
				</div>
				{(data.index.updated && !isHalfGraph) && <BFInfoTags timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />}
			</div>
			{(data.index.updated && isHalfGraph) && <BFInfoTags style="normal" timestamp={data.index.updated.$date} weightingMethod={data.index.weighting_method} 	rebalancingInterval={data.index.rebalancing_interval} />}
		</div>

		{!hideGraph &&
		<div className={`bg-white border-main-lightGrayBorder ${singlePage ? 'border rounded-xl' : 'border-t-2'}`}>
			<GraphCard title="Currency Indexes" subtractWidth={adjustGraphWidth} halfGraph={true} hook={returnGraphData} />
		</div>
		}

		{(totalReturn && !hideGraph) &&
		<div className={`bg-white border-main-lightGrayBorder p-4 ${singlePage ? 'border rounded-xl' : 'border-t-2'}`}>
			<h2 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Performance Metrics</h2>
			<div className="p-4 flex flex-col justify-between items-start">
				<div className="flex flex-row space-x-6">
					<p className="flex flex-col items-start ">
						{data.index.drawdown > 0 ? <UpTag value={data.index.drawdown || drawdown} /> : <DownTag value={data.index.drawdown || drawdown} /> }
						<span className="ml-2 mt-0.5 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black">Maximum Drawdown</span>
					</p>
					<p className='border-r-[1px] border-main-lightGrayBorder'/>
					<p className="flex flex-col items-start">
						{totalReturn > 0 ? <UpTag value={totalReturn} /> : <DownTag value={totalReturn} /> }
						<span className="ml-2 mt-0.5 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black">Total Return</span>
					</p>
				</div>
			</div>
		</div>
		}
		{(formattedHoldings.length > 0 && !hideGraph) &&
			<div className={`bg-white border-main-lightGrayBorder p-4 min-w-full overflow-y-auto space-y-4 ${singlePage ? 'border rounded-xl' : 'border-t-2'}`}>
				<h2 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Holdings <span className="bg-main-lightSkyBlue rounded py-1 px-2 text-[13px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gray">{data.rawStocks.length}</span></h2>
				<BFHoldingsTable holdings={formattedHoldings} />
			</div>
		}
	</>)
}
