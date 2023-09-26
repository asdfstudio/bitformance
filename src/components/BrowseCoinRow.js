import BFIcon from './BFIcon'
import BFInfoTags from './small/BFInfoTags'
import BFCryptoImage from './small/BFCryptoImage'
import BFUpDownTag from './small/BFUpDownTag'
import BFImage from './small/BFImage'
import BFLoading from './small/BFLoading'
import { baseUrl, favoriteIndex, useFavoriteIndexes, deleteIndex } from '../endpoints/index'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
	const [showMenu, setShowMenu] = useState(false)

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
		setShowMenu(!showMenu)
	}
	const DeleteIndex = async(e, { $oid }) => {
		e.stopPropagation()
		setLoadingFavorites(true)
		const result = await deleteIndex($oid)
		await mutate(baseUrl('/get-user-indexes'))
		setLoadingFavorites(false)
		setShowMenu(false)

		navigate("/indexes/my-indexes")
	}

	return(<>
		<td className="pl-4 p-3 flex flex-col justify-between">
			<div className="flex flex-row items-center gap-2 mb-2 w-52">
				<BFImage src={logo} alt={name} style="border-1 rounded-full p-1 bg-white w-16 h-16 object-cover shadow-lg shadow-main-shadow" />
				<p className="text-main-black font-DM_Sans font-medium leading-normal tracking-normal text-[18px]">{name}</p>
			</div>
			<div>
				<div className="absolute flex flex-row items-center rounded-full px-2 py-1 border shadow shadow-main-shadow">
					{cryptos.slice(0, 4).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
					{cryptos.length > 4 && <BFCryptoImage symbol={cryptos.length - 4} index={4} showNumber={true} /> }
					<div onClick={(e) => {
						e.stopPropagation()
						showHoldings(rowIndex)
						onClickView(indexesExpanded)
						setIndexesExpanded(!indexesExpanded)
							}}className="w-[65px] h-[24px] ml-2 mr-1 text-sm rounded-xl bg-main-skyBlue text-main-buttonBlue font-DM_Sans font-medium leading-normal tracking-normal flex items-center justify-center cursor-pointer"> 
							<div className='text-[12px] pr-1'>
								{
									indexesExpanded === true ? <BFIcon iconName="arrowUP" color={"#5290f4"}/> : <BFIcon iconName="arrowDown" color={"#5290f4"}/>
								}
							</div>
						{"View"}
					</div>
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
		<td className="align-top pt-8 w-72 -mr-[50px] whitespace-nowrap">
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

		{showMenu &&
			<div className="relative z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
   			    <div className="fixed inset-0 z-[70] overflow-y-auto">
			      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		           <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		             <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-main-white"/>
						<div className="p-4 space-y-6">
						  <div className='text-[38px] flex justify-center'>
							<BFIcon color="#b7c3d1" iconName="delete" />
						  </div>
							<p className='text-[18px] font-DM_Sans font-medium leading-normal tracking-normal flex justify-center text-center'>Are you sure you want to remove this index from My Indexes?</p>
					  	<div className="mt-auto flex flex-col gap-2">
						  <Link onClick={(e) => DeleteIndex(e, _id)}>
							<button 
								type="submit" 
								className="w-full rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow-sm shadow-main-shadowBlue text-white py-2"
							>
								{loadingFavorites ? 
									<div className="flex justify-center py-1">
										<BFLoading isSmall="true" />
									</div> 
									: "Yes"
								}
							</button>
							</Link>
						  <Link to='/indexes/my-indexes' onClick={(e) => e.stopPropagation() & setShowMenu(false)}>
							<button 
								className="w-full rounded-lg bg-main-gColor bg-opacity-10 text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gColor py-2"
							>
								No
							</button>
							</Link>
				    	</div>
					</div>
				  </div>
				</div> 
			</div>
		  </div>
		  }
	</>)
}	