import { useParams } from 'react-router-dom'
import exampleIcon from '../exampleIcon.png'
import { COINS } from '../data/fakeData'
import BFIcon from '../components/BFIcon'
import SocialIconsRow from '../components/small/SocialIconsRow'
import GraphCard from '../components/GraphCard'
import BFInfoTags from '../components/small/BFInfoTags'
import BFHoldingsTable from '../components/small/BFHoldingsTable'
import { useCryptoById } from '../endpoints/index'

export default function CryptoPage() {
	const params = useParams()
	console.log(params.id)
	const { data, loading, error } = useCryptoById(params.id)
	console.log(data)

	//TODO: get crypto

	const coin = COINS.find(coin => coin.id == 209)

	const PanelOne = ({ id, name }) => (
		<div className="col-span-3 p-6 space-y-4 border h-fit bg-white">
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
			<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
		</div>
	)


	return (
		<div className="grid grid-cols-1 md:grid-cols-10 bg-gray-50">
			<PanelOne {...coin} />

			<div className="col-span-7 p-4 space-y-4">

				<div className="p-4 bg-white rounded-md border space-y-4">
					<h2 className="font-bold text-xl">Overview</h2>
					<div className="flex flex-row justify-between text-sm">
						<div className="space-y-2">
							<label className="text-gray-500">Price</label>
							<p className="font-bold">${coin.price}</p>
						</div>
						<div className="space-y-2">
							<label className="text-gray-500">24h %</label>
							<p className="font-bold">${coin.price}</p>
						</div>
						<div className="space-y-2">
							<label className="text-gray-500">7d %</label>
							<p className="font-bold">${coin.price}</p>
						</div>
						<div className="space-y-2">
							<label className="text-gray-500">Market Cap</label>
							<p className="font-bold">${coin.price}</p>
						</div>
						<BFInfoTags />
					</div>
				</div>

				<div className="bg-white rounded-md border">
					<GraphCard title="Currency Indexes" subtractWidth={380} />
				</div>

				<div className="bg-white rounded-md border p-4 flex flex-row justify-between items-center">
					<h2 className="text-xl font-bold">Performance Metrics</h2>
					<div className="flex flex-row space-x-6">
						<p className="flex flex-row items-center">
							<span className="text-xl text-red-500"><BFIcon iconName="down-left-arrow" /> 35.91%</span> 
							<span className="ml-2 mt-0.5 text-sm">Maximum Drawdown</span>
						</p>
						<p className="flex flex-row items-center">
							<span className="text-xl text-green-500"><BFIcon iconName="up-right-arrow" /> 2.41%</span> 
							<span className="ml-2 mt-0.5 text-sm">Total Return</span>
						</p>
					</div>
				</div>

				<div className="bg-white rounded-md border p-4 min-w-full overflow-y-auto space-y-4">
					<h2 className="text-xl font-bold">Holdings <span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">5</span></h2>
					<BFHoldingsTable holdings={COINS} />
				</div>


			</div>
		</div>
	)
}