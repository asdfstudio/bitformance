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
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-red-100">
				<FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />
				<p className="text-sm text-red-400">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="w-20">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-green-100">
				<FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
				<p className="text-sm text-green-500">{Math.abs(change).toFixed(2)}%</p>
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
			<td className={`ml-2 w-64`}>
				<div className="flex flex-row items-center gap-2">
					<img className="w-10 h-10 rounded-full" src={fixUrl(logo)} alt={name} />
					<p className="font-bold">{name || findName(symbol)}</p>
				</div>
			</td>

			<td className="text-gray-400 w-28">{symbol}</td>
			<td className="w-32">{formatMoney(price)}</td>
			<td className="w-24">
				{changepct_24hour > 0
					? <UpTag change={changepct_24hour} />
					: <DownTag change={changepct_24hour} />
				}
			</td>
			<td className="w-32">
				{changepct_7day > 0
					? <UpTag change={changepct_7day} />
					: <DownTag change={changepct_7day} />
				}
			</td>
			<td>{formatMoney(volume)}</td>
		</>
	)
}
