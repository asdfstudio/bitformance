import CoinRow from '../CoinRow'
import BrowseCoinRow from '../BrowseCoinRow'
import BFHoldingsTable from './BFHoldingsTable'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFIcon from '../BFIcon'
import BrowseCoinRowMobile from '../BrowseCoinRowMobile'

export default function BFTable({ showHeader = true, handleHeaderClick = function() {}, condensedHeaders = false, rows, type, tableStyle = '', onRowClicked = function () {} }) {

	const navigate = useNavigate()
	const [showHoldingRow, setShowHoldingRow] = useState(null)
	const [orderItem, setOrderItem] = useState(false)
	const [indexesExpanded, setIndexesExpanded] = useState("")

	let headers = [
		{ label: 'Cryptocurrency', id: 'name', type: 'alphabet' },
		{ label: 'Price', id: 'value' },
		{ label: '24h %', id: 'changepct_24hour' },
		{ label: '7d %', id: 'changepct_7d' },
		{ label: 'Market Cap', id: 'marketcap', type: 'computed' },
		{ label: 'Last Updated', id: 'updated' }, //updated backend check?
		{ label: 'Action', id: 'action' }, //favorites backend check?
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
		<th onClick={() => onClick(item.id, item.type) && setOrderItem(!orderItem)} key={item.label} scope="col" className="py-2 rounded-xl">
			<div className={`flex flex-row items-center ${item.id === "name" && 'w-56'} ${item.id === "updated" && 'w-56'} ${item.id === "volume" && 'w-40'}`}>
		    <span className="ml-2 font-DM_Sans font-normal leading-normal tracking-wide">{item.label}</span>
		    {item.id && item.id != "action" && <div className="ml-1 w-3 h-3 text-[7px] flex justify-center items-center">
			{
					orderItem === true ? <BFIcon iconName="arrowUP" color={"#566375"}/> : <BFIcon iconName="arrowDown" color={"#566375"}/>
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
	const onClickView = (value) => {
		setIndexesExpanded(value)
	}

	const onCoinRowClicked = (coin) => {
		// console.log(coin)
		navigate(`/coins/${coin.symbol}`)
	}

	return(
		<div className="overflow-x-auto relative sm:rounded-xl">
		    <table className={`w-full text-sm text-left ${tableStyle}`}>
		        {showHeader &&
					<thead className='text-base cursor-pointer text-main-gray rounded-xl'>
						{
							type === 'top-cryptos' ? 
								<tr className='grid grid-flow-col justify-between rounded-xl border-[1px] border-main-lightGrayBorder bg-main-lightGray'>
									{headers.map(header => (
										<HeaderColumn
											key={header.label + '-coins'}
											item={header}
											onClick={handleHeaderClick}
										/>
									))}
								</tr>
							:
							<div className='hidden sm:block'>
								<tr className='px-4 grid grid-flow-col justify-between rounded-xl border-[1px] border-main-lightGrayBorder'>
									{headers.map(header => (
										<HeaderColumn
											key={header.label + '-coins'}
											item={header}
											onClick={handleHeaderClick}
										/>
									))}
								</tr>
							</div>
						}
					</thead>
		        }
		        <tbody>
					{rows.map((coin, index) => {
						return type === 'top-cryptos' ? 
						(<tr onClick={() => onCoinRowClicked(coin)} key={coin.id} className="p-2 bg-mian-black grid grid-flow-col justify-between">
							<CoinRow key={coin.id} {...coin} headerShown={showHeader} />
							</tr>)
							: (type === 'browse-cryptos' || type === 'my-indexes') ? 
							(<React.Fragment key={coin.index._id.$oid}>
								<tr className={`bg-main-white flex flex-col justify-between mt-3 border-[1px] border-main-lightGrayBorder sm:rounded-2xl p-1 ${indexesExpanded ? '' : ''}`}>
									<div className='hidden sm:block'>
										<td onClick={() => onRowClicked(coin.index)} className='grid grid-flow-col justify-between cursor-pointer mb-8'>
											<BrowseCoinRow
												rowIndex={index}
												{...coin.index}
												marketcap={coin.index.marketcap || coin.rawStocks.reduce((sum, a) => a.market_cap + sum ,0)}
												showHoldings={showHoldings}
												onClickView={onClickView}
												showDelete={type === 'my-indexes'}
												isAuth={type === 'my-indexes'}
											/>
										</td>
									</div>
									<div>
										<td onClick={() => onRowClicked(coin.index)} className='block sm:hidden'>
											<BrowseCoinRowMobile
												rowIndex={index}
												{...coin.index}
												marketcap={coin.index.marketcap || coin.rawStocks.reduce((sum, a) => a.market_cap + sum ,0)}
												showHoldings={showHoldings}
												onClickView={onClickView}
												showDelete={type === 'my-indexes'}
												isAuth={type === 'my-indexes'}

											/>
										</td>
									</div>
									<div className='flex flex-row overflow-auto w-screen -mx-2 sm:w-auto pl-2 pr-2 pb-2'>
										{showHoldingRow === index && 
										<td 
											className={`bg-main-white rounded-b-xl border-t-[1px] border-main-lightGrayBorder pt-4 cursor-pointer`} 
											colspan="8">
											<BFHoldingsTable holdings={coin.rawStocks.map(stock => {
												return {
													...stock,
													holdingQuantity: coin.index.holdings[stock.symbol],
													indexPrice: coin.index.value
												}
											})} />
										</td>
										}
									</div>
								</tr>
							</React.Fragment>)
							: (<tr key={coin.id}>no valid type</tr>)
					})}
		        </tbody>
		    </table>
		</div>

	)
}
