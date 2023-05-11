import { useParams } from 'react-router-dom'
import SocialIconsRow from '../components/small/SocialIconsRow'
import BFLoading from '../components/small/BFLoading'
import BFCryptoInfo from '../components/BFCryptoInfo'
import { baseUrl, useCoinBySymbol } from '../endpoints/index'
import { useNavigate } from 'react-router-dom'
import BFCryptoImage from '../components/small/BFCryptoImage'
import FooterMobile from '../components/small/FooterMobile'
import BFPerformance from '../components/small/BFPerformance'

export default function SingleCoinPage() {
	const params = useParams()
	const { data, isLoading } = useCoinBySymbol(params.symbol)

	const navigate = useNavigate()

	const compareRow = (e) => {
		e.stopPropagation()
		navigate(`/compare?id=${params.symbol}`)
	}

	const PanelOne = ({ id, name, description }) => (
		<div className="p-6 space-y-4 border bg-white xl:block col-span-3">
			<div className="flex flex-row items-center gap-2">
				<BFCryptoImage symbol={data.symbol} index={0} isLarge={true} />
				<h2 className="text-xl">{data.name}</h2>
			</div>
			<div className="flex flex-row gap-3 justify-between">
				<button onClick={(e) => compareRow(e)} className="px-6 py-1.5 w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded-lg shadow shadow-main-shadowBlue bg-main-lightGreen text-main-green">Compare</button>
			</div>
			<p>{data.description}</p>
			<BFPerformance data={{ index: data }}/>
		</div>
	)

	if (isLoading) return <BFLoading />

	return (
		<div className="grid grid-cols-1 md:grid-cols-12 bg-main-lightGray">
			<PanelOne {...data.index} />

			<div className="col-span-9 p-4 space-y-4">
				<BFCryptoInfo data={{ index: data }} singlePage={true}/>
			</div>
			<div className='bg-white rounded-xl border md:hidden'>
				<FooterMobile />
			</div>
		</div>
	)
}