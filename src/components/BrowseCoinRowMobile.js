import BFIcon from './BFIcon'
import BFInfoTags from './small/BFInfoTags'
import BFCryptoImage from './small/BFCryptoImage'
import BFUpDownTag from './small/BFUpDownTag'
import BFImage from './small/BFImage'
import BFLoading from './small/BFLoading'
import { baseUrl, favoriteIndex, useFavoriteIndexes, deleteIndex } from '../endpoints/index'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../helpers/index'

export default function BrowseCoinRowMobile({
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
	showHoldings,
	onClickView,
	showDelete = false,
	isAuth = false
}) {
	const navigate = useNavigate()
	const { mutate } = useSWRConfig()
	const { data, isLoading } = useFavoriteIndexes()

	const [loadingFavorites, setLoadingFavorites] = useState(false)
	const [favoriteValue, setFavoriteValue] = useState(0)
	const [indexesExpanded, setIndexesExpanded] = useState(false)

	const compareRow = (e, { $oid }) => {
		e.stopPropagation()
		navigate(`/compare?id=${$oid}&isAuth=${isAuth}`)
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

	const handleDeleteIndex = async(e, { $oid }) => {
		e.stopPropagation()
		setLoadingFavorites(true)
		const result = await deleteIndex($oid)
		await mutate(baseUrl('/get-user-indexes'))
		setLoadingFavorites(false)
	}

	return(<>
		<div className="pl-4 p-3 overflow-y-hidden">
			<div className='flex flex-row justify-between items-center'>
				<div className="flex flex-row items-center gap-2">
					<BFImage src={logo} alt={name} style="shadow border-1 rounded-full p-1 bg-white w-16 h-16 object-cover" />
					<p className="text-main-black font-DM_Sans font-medium leading-normal tracking-normal text-[18px]">{name}</p>
				</div>

				<div className="text-right text-main-gray font-DM_Sans font-medium leading-normal tracking-wide text-[14px]">
					{loadingFavorites ? <BFLoading isSmall="true" />
					: (<>
						<span onClick={(e) => favoriteRow(e, _id)} >
							{favorites.length + favoriteValue} <BFIcon iconName="favorite" size="sm" color={data?.some(obj => obj.index._id.$oid === _id.$oid) ? '#40c8b8' : '#566375'}  />&nbsp;&nbsp;
						</span>
						<span onClick={(e) => compareRow(e, _id)}> <BFIcon iconName="compare" size="sm" color="#566375" /> </span>
						{showDelete && <span className="mx-2" onClick={(e) => handleDeleteIndex(e, _id)}> <BFIcon iconName="delete" size="sm" color="#566375" /> </span> }
					</>)
					}
				</div>
			</div>

			<div className="space-y-4 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-row items-center gap-2">
					<label className="font-normal text-main-gray pt-3">Price</label>
					<p className="font-bold text-main-black">{formatMoney(value)}</p>
			</div>
			<div className='border-t my-2 border-main-lightGrayBorder'/>
			<div className='flex flex-row justify-between items-center'>
				<div className="space-y-1 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-col items-center">
						<label className="font-normal text-main-gray pt-3">24h %</label>
						<p className='font-bold'><BFUpDownTag change={changepct_24hour} /></p>
				</div>
				<div className="space-y-1 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-col items-center">
						<label className="font-normal text-main-gray pt-3">7d %</label>
						<p className='font-bold'><BFUpDownTag change={changepct_7d} /></p>
				</div>
				<div className="space-y-1 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-col items-center">
						<label className="font-normal text-main-gray pt-3">Market Cap</label>
						<p className="font-bold text-main-black">{formatMoney(marketcap)}</p>
				</div>
			</div>

			<div className='border-t my-2 border-main-lightGrayBorder'/>

			<div className="space-y-1 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-col items-start mb-2">
				<label className="font-normal text-main-gray pt-3">Market Cap</label>
				<BFInfoTags timestamp={updated.$date} weightingMethod={weighting_method} rebalancingInterval={rebalancing_interval} />
			</div>

			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
				onClickView()
			}} className="flex md:hidden">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
					{cryptos.slice(0, 2).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
					{cryptos.length > 2 && <BFCryptoImage symbol={cryptos.length - 2} index={3} showNumber={true} /> }
					<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-main-skyBlue text-main-buttonBlue font-DM_Sans font-medium leading-normal tracking-normal"> View</button>
				</div>
			</div>
		</div>
	</>)
}	