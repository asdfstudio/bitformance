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
import { baseUrl, favoriteIndex, useFavoriteIndexes, deleteIndex } from '../endpoints/index'
import { useSWRConfig } from 'swr'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFImage from '../components/small/BFImage'
import FooterMobile from '../components/small/FooterMobile'

export default function CryptoPage({ isAuth }) {
	const params = useParams()
	const { data, isLoading, isError } = useCryptoById(params.id, isAuth)

	const navigate = useNavigate()
	const { mutate } = useSWRConfig()
	const { data: favoriteData, isLoading: favoriteIsLoading } = useFavoriteIndexes()

	const [loadingFavorites, setLoadingFavorites] = useState(false)
	const [loadingDelete, setLoadingDelete] = useState(false)

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


	const deleteRow = async () => {
		setLoadingDelete(true)
		const result = await deleteIndex(params.id)
		await mutate(baseUrl('/get-user-indexes'))
		setLoadingDelete(false)
		navigate('/indexes/my-indexes')
	}

	const PanelOne = ({ id, name, description, isAuth }) => (
		<div>
			<div className="flex flex-row items-center gap-2">
				<BFImage style="shadow-md w-16 h-16 rounded-full bg-white p-1" alt="crypto" src={data.index.logo} />
				<h2 className="text-[18px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">{name}</h2>
			</div>
			<div className="flex flex-row gap-3 justify-between w-full my-4">
				<button 
					onClick={(e) => favoriteRow(e)} 
					className="w-full flex flex-row gap-2 justify-center items-center shadow shadow-main-shadowBlue text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded-lg bg-main-gColor hover:bg-main-buttonBlue text-white h-[38px]">
					{loadingFavorites ? <BFLoading isInline={true} />
						: favoriteData?.some(obj => obj.index._id.$oid === params.id) ? <BFIcon iconName="favorite" /> 
						: <BFIcon iconName="open-favorite" /> 
					} Favorite
				</button>
				<button 
					onClick={(e) => compareRow(e)} 
					className="w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow shadow-main-shadowBlue rounded-lg bg-main-lightGreen text-main-green h-[38px]">
						Compare
				</button>
			</div>
			
			<div>
				<p className="text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-grayText mb-2">Share this index</p>
				<div className="flex flex-row justify-between cursor-pointer text-main-gray">
					<SocialIconsRow showCopyLink={true} />
				</div>
			</div>
			{/* <p className='text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-grayText'>{'Share this Index'}</p> */}
			<p className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray pt-2 my-4'>{description}</p>

			{isAuth && <div className="absolute bottom-2 w-1/5 flex flex-row gap-2 justify-between">
				<button onClick={() => editRow()} className="w-full text-gray-500 bg-gray-100 rounded px-6 py-2 font-bold text-sm">Edit</button>
				<button onClick={() => deleteRow()} className="w-full text-red-500 bg-red-100 rounded px-6 py-2 font-bold text-sm">
					{loadingDelete ? <BFLoading isCenter={true} /> : 'Delete'}
				</button>
			</div>}
		</div>
	)

	if (isLoading) return <BFLoading />

	const editRow = async () => {
		navigate('/indexes/create-index', {
			state: {
				name: data.index.name,
				description: data.index.description,
				initialValue: data.index.initial_value,
				rebalancePeriod: data.index.rebalancing_interval,
				weightingMethod: data.index.weighting_method,
				selectedCryptos: data.index.cryptos,
				logo: data.index.logo,
				previousId: data.index._id.$oid
			}
		})
	}

	return (
		<div className="grid grid-cols-1 xl:grid-cols-12 bg-main-lightGray pt-8 sm:pt-0">
			<div className="p-6 space-y-4 border bg-white hidden xl:block col-span-3">
				<PanelOne {...data.index} isAuth={isAuth} />
			</div>

			<div className="col-span-9 space-y-4 sm:p-4">
				<div className='block bg-main-white p-4 border-[1px] border-main-lightGrayBorder md:hidden'>
					<PanelOne {...data.index} isAuth={isAuth} />
				</div>
				<BFCryptoInfo data={data} singlePage={true}/>
			</div>
			<div className='bg-white md:hidden'>
				<FooterMobile />
			</div>
		</div>
	)
}