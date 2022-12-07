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

export default function CryptoPage() {
	const params = useParams()
	const { data, isLoading, isError } = useCryptoById(params.id)

	console.log(data)

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

	if (isLoading) return (
		<div role="status" className="flex flex-row justify-center items-center h-[90vh]">
		    <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
		        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
		    </svg>
		    <span className="sr-only">Loading...</span>
		</div>
	)

	const totalReturn = calculateReturn(data.index.value, data.index.initial_value)

	const returnGraphData = () => {
		return {
			data: data || {},
			isLoading: false,
			isError: false
		}
	}

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
					<h2 className="text-xl font-bold">Holdings <span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">5</span></h2>
					<BFHoldingsTable holdings={data.rawStocks} />
				</div>


			</div>
		</div>
	)
}