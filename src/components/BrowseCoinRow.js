import BFIcon from './BFIcon'
import BFInfoTags from './small/BFInfoTags'
import BFCryptoImage from './small/BFCryptoImage'
import BFUpDownTag from './small/BFUpDownTag'

export default function BrowseCoinRow({
	id,
	logo,
	name,
	ticker,
	value,
	changepct_24hour,
	changepct_7d,
	marketcap,
	cryptos,
	favorites,
	updated,
	weighting_method,
	rebalancing_interval,
	showHoldings
}) {

	const compareRow = (id) => {
		//TODO: nav compare add graph
	}

	const favoriteRow = (id) => {
		//TODO: favorite
	}

	const formatter = new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	});

	return(<>
		<td>
			<div className="flex flex-row items-center gap-2 mb-2">
				<img className="shadow border rounded-full p-1 bg-white w-16 h-16" src={logo} alt={name} />
				<p className="font-bold text-lg">{name}</p>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(id)
			}} className="hidden md:flex">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
				{cryptos.slice(0, 4).map((crypto, index) => <BFCryptoImage symbol={crypto} index={index} />)}
				{cryptos.length > 4 && <BFCryptoImage symbol={cryptos.length - 4} index={4} showNumber={true} /> }
				<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-blue-200 text-blue-400"> View</button>
				</div>
			</div>
			<div onClick={(e) => {
				e.stopPropagation()
				showHoldings(id)
			}} className="flex md:hidden">
				<div className="flex flex-row items-center rounded-full px-2 py-1 border shadow">
				{cryptos.slice(0, 2).map((crypto, index) => <BFCryptoImage symbol={crypto} index={index} />)}
				{cryptos.length > 2 && <BFCryptoImage symbol={cryptos.length - 2} index={3} showNumber={true} /> }
				<button className="ml-2 mr-1 px-4 h-6 text-sm rounded-xl shadow bg-blue-200 text-blue-400"> View</button>
				</div>
			</div>
		</td>
		<td className="text-sm align-top pt-8">{formatter.format(value)}</td>
		<td className="align-top pt-7">
			<BFUpDownTag change={changepct_24hour} />
		</td>
		<td className="align-top pt-7">	
			<BFUpDownTag change={changepct_7d} />
		</td>
		<td className="text-sm pl-5 align-top pt-8">{formatter.format(marketcap)}</td>
		<td className="align-top pt-8">
			<BFInfoTags timestamp={updated.$date} weightingMethod={weighting_method} rebalancingInterval={rebalancing_interval} />
		</td>
		<td className="text-right pr-4">
			<span onClick={() => favoriteRow(id)} >{favorites.length} <BFIcon iconName="favorite" size="sm" color="gray" />&nbsp;&nbsp;</span>
			<span onClick={() => compareRow(id)}> <BFIcon iconName="compare" size="sm" color="gray" /> </span>
		</td>

	</>)
}	