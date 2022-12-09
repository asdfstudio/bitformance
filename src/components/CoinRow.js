import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { formatMoney } from '../helpers/index'

export default function CoinRow({
	id,
	logo,
	name,
	symbol,
	price,
	changepct_24hour,
	changepct_7day,
	market_cap,
}) {

	const DownTag = ({ change }) => (<div className="w-20 mx-auto">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-red-100">
				<FontAwesomeIcon icon={faArrowLeft} size="xs" transform={{ rotate: -45}} color="red" />
				<p className="text-sm text-red-400">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	const UpTag = ({ change }) => (<div className="w-20 mx-auto">
			<div className="flex flex-row px-2 py-1 rounded-lg justify-center items-center gap-1 rounded bg-green-100">
				<FontAwesomeIcon icon={faArrowRight} size="xs" transform={{ rotate: -45}} color="green" />
				<p className="text-sm text-green-500">{Math.abs(change).toFixed(2)}%</p>
			</div>
		</div>
	)

	return (
		<>
			<td className="flex flex-row items-center ml-2 gap-2">
				<img className="w-10 h-10 rounded-full" src={logo} alt={name} />
				<p className="font-bold">{name}</p>
			</td>

			<td className="text-gray-400">{symbol}</td>
			<td>{formatMoney(price)}</td>
			<td>
				{changepct_24hour > 0 
					? <UpTag change={changepct_24hour} />
					: <DownTag change={changepct_24hour} />
				}
			</td>
			<td>	
				{changepct_7day > 0 
					? <UpTag change={changepct_7day} />
					: <DownTag change={changepct_7day} />
				}
			</td>
			<td className="pl-5">{formatMoney(market_cap)}</td>
		</>
	)
}