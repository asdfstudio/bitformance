import BFIcon from './BFIcon'
import BFInfoTags from './small/BFInfoTags'
import BFCryptoImage from './small/BFCryptoImage'
import BFUpDownTag from './small/BFUpDownTag'
import BFImage from './small/BFImage'
import BFLoading from './small/BFLoading'
import { baseUrl, favoriteIndex, useFavoriteIndexes } from '../endpoints/index'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BrowseCoinRow({
	_id,
	rowIndex,
	logo,
	name,
	ticker,
	value,
	changepct_24hour,
	changepct_7d,
	marketcap,
	cryptos = [],
	favorites = [],
	updated = { $date: null },
	weighting_method,
	rebalancing_interval,
	showHoldings
}) {
	const navigate = useNavigate()
	const { mutate } = useSWRConfig()
	const { data, isLoading } = useFavoriteIndexes()

	const [loadingFavorites, setLoadingFavorites] = useState(false)
	const [favoriteValue, setFavoriteValue] = useState(0)

	const compareRow = (e, { $oid }) => {
		e.stopPropagation()
		navigate(`/compare?id=${$oid}`)
	}

	const favoriteRow = async(e, { $oid }) => {
		e.stopPropagation()
		if (localStorage.getItem('userId')) {
			setLoadingFavorites(true)
			const result = await favoriteIndex($oid)
			if (result.message === 'Index added to favourites') {
				setFavoriteValue(1)
			}
			if (result.message === 'Index removed from favourites') {
				setFavoriteValue(-1)
			}

			await mutate(baseUrl('/get-favorited-indexes'))
			setLoadingFavorites(false)
			return
		}
	}

	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	});

	return(<>
		<td>
			<div className="flex flex-row items-center gap-2 mb-2">
				<BFImage src={logo} alt={name} style="shadow border rounded-full p-1 bg-white w-16 h-16 object-cover" />
				<p className="font-bold text-lg">{name}</p>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
			}} className="hidden md:flex">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
				{cryptos.slice(0, 4).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
				{cryptos.length > 4 && <BFCryptoImage symbol={cryptos.length - 4} index={4} showNumber={true} /> }
				<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-blue-200 text-blue-400"> View</button>
				</div>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
			}} className="flex md:hidden">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
				{cryptos.slice(0, 2).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
				{cryptos.length > 2 && <BFCryptoImage symbol={cryptos.length - 2} index={3} showNumber={true} /> }
				<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-blue-200 text-blue-400"> View</button>
				</div>
			</div>
		</td>
		<td className="text-sm align-top pt-8">{formatter.format(value)}</td>
		<td className="align-top pt-7">
			<BFUpDownTag change={changepct_24hour} />
		</td>
		<td className="align-top pt-7">	
			<BFUpDownTag change={changepct_7d} />
		</td>
		<td className="text-sm pl-5 align-top pt-8">{formatter.format(marketcap)}</td>
		<td className="align-top pt-8">
			<BFInfoTags timestamp={updated.$date} weightingMethod={weighting_method} rebalancingInterval={rebalancing_interval} />
		</td>
		<td className="text-right pr-4 cursor-pointer">
			{loadingFavorites ? <BFLoading isSmall="true" />
			: (<>
				<span onClick={(e) => favoriteRow(e, _id)} >
					{favorites.length + favoriteValue} <BFIcon iconName="favorite" size="sm" color={data?.some(obj => obj.index._id.$oid === _id.$oid) ? 'blue' : 'gray'}  />&nbsp;&nbsp;
				</span>
				<span onClick={(e) => compareRow(e, _id)}> <BFIcon iconName="compare" size="sm" color="gray" /> </span>
			</>)
			}
		</td>

	</>)
}	