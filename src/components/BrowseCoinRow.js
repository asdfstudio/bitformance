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
	showHoldings,
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
		<td className="pl-4 p-3">
			<div className="flex flex-row items-center gap-2 mb-2 w-52">
				<BFImage src={logo} alt={name} style="shadow border-1 rounded-full p-1 bg-white w-16 h-16 object-cover" />
				<p className="text-main-black font-DM_Sans font-medium leading-normal tracking-normal text-[18px]">{name}</p>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
			}} className="hidden md:flex">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
					{cryptos.slice(0, 4).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
					{cryptos.length > 4 && <BFCryptoImage symbol={cryptos.length - 4} index={4} showNumber={true} /> }
					<div onClick={() => setIndexesExpanded(!indexesExpanded)} className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-main-skyBlue text-main-buttonBlue font-DM_Sans font-medium leading-normal tracking-normal flex items-center cursor-pointer"> 
						<div className='text-[7px] pr-1'>
							{
								indexesExpanded == true ? <BFIcon iconName="arrowUP" color={"#5290f4"}/> : <BFIcon iconName="arrowDown" color={"#5290f4"}/>
							}
						</div>
						{"View"}
					</div>
				</div>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
			}} className="flex md:hidden">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
					{cryptos.slice(0, 2).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
					{cryptos.length > 2 && <BFCryptoImage symbol={cryptos.length - 2} index={3} showNumber={true} /> }
					<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-main-skyBlue text-main-buttonBlue font-DM_Sans font-medium leading-normal tracking-normal"> View</button>
				</div>
			</div>
		</td>
		<td className="flex justify-center align-top pt-8 text-main-black font-DM_Sans font-bold leading-normal tracking-wide text-base">{formatMoney(value)}</td>
		<td className="align-top pt-7 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base">
			<BFUpDownTag change={changepct_24hour} />
		</td>
		<td className="align-top pt-7 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base">	
			<BFUpDownTag change={changepct_7d} />
		</td>
		<td className="flex justify-end align-top pt-8 text-main-black font-DM_Sans font-bold leading-normal tracking-wide text-base">{formatMoney(marketcap)}</td>
		<td className="align-top pt-8 w-72 -mr-[50px]">
			<BFInfoTags timestamp={updated.$date} weightingMethod={weighting_method} rebalancingInterval={rebalancing_interval} />
		</td>
		<td className="text-right pr-6 cursor-pointer text-main-gray font-DM_Sans font-medium leading-normal tracking-wide text-[14px] pt-8 w-32">
			{loadingFavorites ? <BFLoading isSmall="true" />
			: (<>
				<span onClick={(e) => favoriteRow(e, _id)} >
					{favorites.length + favoriteValue} <BFIcon iconName="favorite" size="sm" color={data?.some(obj => obj.index._id.$oid === _id.$oid) ? '#40c8b8' : '#566375'}  />&nbsp;&nbsp;
				</span>
				<span onClick={(e) => compareRow(e, _id)}> <BFIcon iconName="compare" size="sm" color="#566375" /> </span>
				{showDelete && <span className="mx-2" onClick={(e) => handleDeleteIndex(e, _id)}> <BFIcon iconName="delete" size="sm" color="#566375" /> </span> }
			</>)
			}
		</td>

	</>)
}	