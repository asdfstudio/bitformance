import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { usePopularIndexes } from '../endpoints/index'
import { formatMoney } from '../helpers/index'
import BFImage from './small/BFImage'
import BFLoading from './small/BFLoading'

export default function MostPopularCard() {
	const { data, isLoading } = usePopularIndexes()

	if (isLoading) return (
		<div className="pt-4 pl-6 pb-8 pr-6 bg-white sm:border-[1px] sm:border-main-lightGrayBorder sm:rounded-2xl">
			<h1 className="text-[22px] mb-6 font-DM_Sans font-medium leading-normal tracking-wide text-main-black">Most Popular</h1>
			<div className="h-40"><BFLoading heightAdjust="h-2/3" /></div>
			<div className="text-right mt-6 -mr-2">
				<Link className="text-[15px] text-white px-16 py-2 rounded-lg bg-main-buttonBlue text-cente shadow-sm shadow-main-buttonBlue font-DM_Sans font-normal leading-normal tracking-wide">See all indexes</Link>
			</div>
		</div>
	)

	return(
		<div className="pt-4 pl-6 pb-8 pr-6 bg-white sm:border-[1px] sm:border-main-lightGrayBorder sm:rounded-2xl">
			<h1 className="text-[22px] mb-6 font-DM_Sans font-medium leading-normal tracking-wide text-main-black">Most Popular</h1>
			<div>
				{data.map(coin => (
					<Link to={`/indexes/browse/${coin._id.$oid}`}  key={coin.name + '-recently-added'} className="grid grid-cols-12 gap-4 py-1.5">
						<div className="flex flex-row items-center gap-2 col-span-5 pt-4">
							<BFImage src={coin.logo} alt={coin.name} style="w-[30px] h-[30px] object-cover rounded-full border-2 border-white drop-shadow-md"/>
							<p className='text-[18px] font-DM_Sans font-medium leading-normal tracking-wide text-main-black pl-1'>{coin.name}</p>
						</div>
						<div className="ml-4 col-span-3">
							<label className="text-[16px] font-DM_Sans font-normal leading-normal tracking-wide text-main-gray">24h %</label>
							<div className="flex flex-row items-center gap-1.5 pl-1">	
								{coin.changepct_24hour > 0 
									? <FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="#40c8b8" />
									: <FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="#fd5d60" />

								}
								<p className="text-[16px] font-DM_Sans font-medium leading-normal tracking-wide text-main-black">{Math.abs(coin.changepct_24hour).toFixed(2)}%</p>
							</div>
						</div>
						<div className="col-span-4 flex flex-col items-end">
							<label className="text-[16px] font-DM_Sans font-normal leading-normal tracking-wide text-main-gray">Market cap</label>
							<p className="text-[14px] font-DM_Sans font-bold leading-normal tracking-wide text-main-black">{formatMoney(coin.marketcap)}</p>
						</div>
					</Link>
				))}
			</div>
			<div className="text-right mt-6 -mr-2">
				<Link to="/indexes/browse" className="text-[15px] text-white px-16 py-2 rounded-lg bg-main-buttonBlue text-cente shadow-sm shadow-main-buttonBlue font-DM_Sans font-normal leading-normal tracking-wide">See all Indexes</Link>
			</div>
		</div>
	)
}