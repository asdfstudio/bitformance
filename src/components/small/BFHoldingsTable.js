import HoldingsRow from '../HoldingsRow'

export default function BFHoldingsTable({ holdings }) {
	
	const headers = ['Cryptocurrency', 'Tickers', 'Price', '24h %', '7d %', 'Market Cap', '% of Index', 'Quantity Held', 'Value of Holding']

	const HeaderColumn = ({ label, sortable }) => (
		<th key={label} scope="col" className="py-3 px-6">
			<div className="flex items-center">
		    <span>{label}</span>
		    {sortable && <button><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></button>}
			</div>
		</th>
	)

	console.log(holdings)

	return(
    <table className={`w-full text-sm text-left`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
        		{headers.map(header => (
        			<HeaderColumn key={header + '-holdings'} label={header} sortable={true} />
        		))}
          </tr>
        </thead>
        <tbody>
        	{holdings.map(coin => (
        		<tr key={coin.symbol + '-holdings-table'} className="shadow bg-white dark:bg-gray-800 dark:border-gray-700">
        			<HoldingsRow {...coin} />
        		</tr>
        	))}
        </tbody>
    </table>
	)
}