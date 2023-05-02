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
	}

	return(<>
		<div className="overflow-y-hidden">
			<div className='px-2 flex flex-row justify-between items-center'>
				<div className="flex flex-row items-center gap-2">
					<BFImage src={logo} alt={name} style="shadow border-1 rounded-full p-1 bg-white w-16 h-16 object-cover shadow-lg shadow-main-shadow" />
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

			<div className="space-y-4 pl-2 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-row items-center gap-2">
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

			<div className="pl-2 space-y-1 text-[16px] font-DM_Sans leading-normal tracking-normal flex flex-col items-start mb-2">
				<label className="font-normal text-main-gray pt-3">Market Cap</label>
				<BFInfoTags timestamp={updated.$date} weightingMethod={weighting_method} rebalancingInterval={rebalancing_interval} />
			</div>

			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(rowIndex)
				onClickView()
			}} className="flex pl-2 mb-1 md:hidden">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow shadow-main-shadow">
					{cryptos.slice(0, 2).map((crypto, index) => <BFCryptoImage key={index} symbol={crypto} index={index} />)}
					{cryptos.length > 2 && <BFCryptoImage symbol={cryptos.length - 2} index={3} showNumber={true} /> }
					<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-main-skyBlue text-main-buttonBlue font-DM_Sans font-medium leading-normal tracking-normal"> View</button>
				</div>
			</div>
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
		</div>
	</>)
}	