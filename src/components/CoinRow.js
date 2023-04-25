import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { formatMoney } from '../helpers/index'
import { coinImageMappings } from '../data/coinImages'

export default function CoinRow({
	id,
	logo,
	name,
	symbol,
	price,
	changepct_24hour,
	changepct_7day,
	volume,
	headerShown = true,
}) {

	const DownTag = ({ change }) => (<div className="w-20">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 bg-main-lightRed">
				<FontAwesomeIcon icon={faArrowLeft} size="sm" transform={{ rotate: -45}} color="#fd5d60" />
				<p className="text-sm text-main-deepOrange font-DM_Sans font-medium leading-normal tracking-wide">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="w-20">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 bg-main-lightGreen">
				<FontAwesomeIcon icon={faArrowRight} size="sm" transform={{ rotate: -45}} color="#40c8b8" />
				<p className="text-sm text-main-green font-DM_Sans font-medium leading-normal tracking-wide">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const findName = (symbol) => {
		const obj = coinImageMappings.find(obj => obj.symbol === symbol)
		const parts = obj.name.split(' (')
		return parts[0]
	}

	const fixUrl = (url) => {
		if (url && !url.includes('https://')) {
			return `https://www.cryptocompare.com${url}`
		}
		return url
	}

	return (
		<>
			<td className={`ml-2 w-64 cursor-pointer`}>
				<div className="flex flex-row items-center gap-2">
					<img className="w-10 h-10 rounded-full" src={fixUrl(logo)} alt={name} />
					<p className="font-DM_Sans font-bold leading-normal tracking-wide text-main-black text-base">{name || findName(symbol)}</p>
				</div>
			</td>

			<td className="text-main-gray w-28 font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{symbol}</td>
			<td className="w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer">{formatMoney(price)}</td>
			<td className="w-24 cursor-pointer">
				{changepct_24hour > 0
					? <UpTag change={changepct_24hour} />
					: <DownTag change={changepct_24hour} />
				}
			</td>
			<td className="w-32 cursor-pointer">
				{changepct_7day > 0
					? <UpTag change={changepct_7day} />
					: <DownTag change={changepct_7day} />
				}
			</td>
			<td className='w-32 text-main-black font-DM_Sans font-medium leading-normal tracking-wide text-base cursor-pointer'>{formatMoney(volume)}</td>
		</>
	)
}
