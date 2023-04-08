import CoinRow from '../CoinRow'
import BrowseCoinRow from '../BrowseCoinRow'
import BFHoldingsTable from './BFHoldingsTable'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFIcon from '../BFIcon'

export default function BFTable({ showHeader = true, handleHeaderClick = function() {}, condensedHeaders = false, rows, type, tableStyle = '', onRowClicked = function () {} }) {

	const navigate = useNavigate()
	const [showHoldingRow, setShowHoldingRow] = useState(null)
	const [holdings, setHoldings] = useState()
	const [indexesExpanded, setIndexesExpanded] = useState(false)

	let headers = [
		{ label: 'Cryptocurrency', id: 'name', type: 'alphabet' },
		{ label: 'Price', id: 'value' },
		{ label: '24h %', id: 'changepct_24hour' },
		{ label: '7d %', id: 'changepct_7d' },
		{ label: 'Market Cap', id: 'marketcap', type: 'computed' },
		{ label: 'Last Updated', id: 'updated' }, //updated backend check?
		{ label: 'Action', id: '' }, //favorites backend check?
	]

	if (condensedHeaders) {
		headers = [
			{ label: 'Cryptocurrency', id: 'name' },
			{ label: 'Tickers', id: 'symbol' },
			{ label: 'Price', id: 'price' },
			{ label: '24h %', id: 'changepct_24hour' },
			{ label: '7d %', id: 'changepct_7day' },
			{ label: 'Volume', id: 'volume' }
		]
	}



	const HeaderColumn = ({ item, onClick }) => (
		<th onClick={() => onClick(item.id, item.type)} key={item.label} scope="col" className="py-3">
			<div className="flex flex-row items-center justify-start">
		    <span className="ml-2">{item.label}</span>
		    {item.id && <div onClick={() => setIndexesExpanded(!indexesExpanded)} className="ml-1 w-3 h-3 text-[7px] flex justify-center items-center">
			{
					indexesExpanded == true ? <BFIcon iconName="arrowUp" color={"#111111"}/> : <BFIcon iconName="arrowDown" color={"#111111"}/>
				}
				</div>}
			</div>
		</th>
	)

	const showHoldings = (index) => {
		if (index === showHoldingRow) {
			setShowHoldingRow(null)
		} else {
			setShowHoldingRow(index)
		}
	}

	const onCoinRowClicked = (coin) => {
		console.log(coin)
		navigate(`/coins/${coin.symbol}`)
	}

	return(
		<div className="flex overflow-x-auto relative sm:rounded-xl">
		    <table className={`w-full text-sm text-left ${tableStyle}`}>

		        {showHeader &&
		        	<thead className="text-base cursor-pointer text-main-gray bg-main-lightGray font-DM_Sans font-normal leading-normal tracking-wide">
		            <tr>
	            		{headers.map(header => (
	            			<HeaderColumn
	            				key={header.label + '-coins'}
	            				item={header}
	            				onClick={handleHeaderClick}
	            			/>
	            		))}
		            </tr>
		        </thead>
		        }

		        <tbody>
		        		{rows.map((coin, index) => {
		        			return type === 'top-cryptos' ? 
							(<tr onClick={() => onCoinRowClicked(coin)} key={coin.id} className="p-4 bg-mian-black">
								<CoinRow key={coin.id} {...coin} headerShown={showHeader} />
								</tr>)
		        				: (type === 'browse-cryptos' || type === 'my-indexes') ? 
								(<React.Fragment key={coin.index._id.$oid}>
		        					<tr onClick={() => onRowClicked(coin.index)} className="bg-main-white rounded-2xl border">
		        						<BrowseCoinRow
		        							rowIndex={index}
		        							{...coin.index}
		        							marketcap={coin.index.marketcap || coin.rawStocks.reduce((sum, a) => a.market_cap + sum ,0)}
		        							showHoldings={showHoldings}
		        							showDelete={type === 'my-indexes'}
		        							isAuth={type === 'my-indexes'}
		        						/>
		        					</tr>
		        					{showHoldingRow === index && <tr>
		        						<td className="bg-main-white" colspan="8">
		        							<BFHoldingsTable holdings={coin.rawStocks.map(stock => {
														return {
															...stock,
															holdingQuantity: coin.index.holdings[stock.symbol],
															indexPrice: coin.index.value
														}
													})} />
		        						</td>
		        					</tr>}
		        					<div className="p-[6px]"/>
		        				</React.Fragment>)
		        				: (<tr key={coin.id}>no valid type</tr>)
		        		})}
		        </tbody>
		    </table>

		</div>

	)
}
