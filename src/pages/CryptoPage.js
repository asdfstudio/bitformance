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
import BFLoading from '../components/small/BFLoading'
import BFCryptoInfo from '../components/BFCryptoInfo'

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

	if (isLoading) return <BFLoading />

	return (
		<div className="grid grid-cols-1 md:grid-cols-10 bg-gray-50">
			<PanelOne {...data.index} />

			<div className="col-span-7 p-4 space-y-4">
				<BFCryptoInfo data={data} />
			</div>
		</div>
	)
}