import { useParams } from 'react-router-dom'
import BFIcon from '../components/BFIcon'
import SocialIconsRow from '../components/small/SocialIconsRow'
import GraphCard from '../components/GraphCard'
import BFInfoTags from '../components/small/BFInfoTags'
import BFHoldingsTable from '../components/small/BFHoldingsTable'
import BFUpDownTag from '../components/small/BFUpDownTag'
import { useCryptoById } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'
import BFCryptoInfo from '../components/BFCryptoInfo'
import { baseUrl, favoriteIndex, useFavoriteIndexes } from '../endpoints/index'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFImage from '../components/small/BFImage'

export default function CryptoPage({ isAuth }) {
	const params = useParams()
	const { data, isLoading, isError } = useCryptoById(params.id, isAuth)

	const navigate = useNavigate()
	const { mutate } = useSWRConfig()
	const { data: favoriteData, isLoading: favoriteIsLoading } = useFavoriteIndexes()

	const [loadingFavorites, setLoadingFavorites] = useState(false)

	const compareRow = (e) => {
		e.stopPropagation()
		navigate(`/compare?id=${params.id}`)
	}

	const favoriteRow = async (e) => {
		e.stopPropagation()
		if (localStorage.getItem('userId')) {
			setLoadingFavorites(true)
			const result = await favoriteIndex(params.id)
			await mutate(baseUrl('/get-favorited-indexes'))
			setLoadingFavorites(false)
			return
		}
	}

	const PanelOne = ({ id, name, description }) => (
		<div className="col-span-3 p-6 space-y-4 border h-[94vh] bg-white">
			<div className="flex flex-row items-center gap-2">
				<BFImage style="shadow-md w-16 h-16 rounded-full bg-white p-1" alt="crypto" src={data.index.logo} />
				<h2 className="text-xl">{name}</h2>
			</div>
			<div className="flex flex-row gap-2 justify-between">
				<button onClick={(e) => favoriteRow(e)} className="w-full text-white px-5 py-2 rounded bg-blue-500 text-sm font-bold flex flex-row gap-2 justify-center items-center">
					{loadingFavorites ? <BFLoading isInline={true} />
						: favoriteData?.some(obj => obj.index._id.$oid === params.id) ? <BFIcon iconName="favorite" /> 
						: <BFIcon iconName="open-favorite" /> 
					} Favorite
				</button>
				<button onClick={(e) => compareRow(e)} className="w-full text-green-500 bg-green-100 rounded px-6 py-2 font-bold text-sm">Compare</button>
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