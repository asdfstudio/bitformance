import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import exampleIcon from '../exampleIcon.png'
import BFTable from '../components/small/BFTable'
import { COINS } from '../data/fakeData'

export default function BrowsePage() {
	const navigate = useNavigate()

	const sortables = [
		'Cryptocurrency',
		'Price',
		'24 %',
		'7d %',
		'Market Cap',
		'Last Updated',
		'Action'
	]

	const sortBy = () => {
		//TODO: 
	}

	const [sortOrder, setSortOrder] = useState('ASC')

	//TODO
	const data = COINS;

	const rowClicked = (coin) => {
		console.log(coin)
		navigate(`/indexes/browse/${coin.id}`)
	}

	return (
		<div className="p-4 bg-gray-50">
			<BFTable 
				headers={sortables} 
				rows={data} 
				type="browse-cryptos" 
				tableStyle="border-separate border-spacing-y-5" 
				onRowClicked={rowClicked}
			/>
		</div>
	)
}