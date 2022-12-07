import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFTable from '../components/small/BFTable'
import { useBrowsableIndexes } from '../endpoints/index'

export default function BrowsePage() {
	const navigate = useNavigate()
	const { data, isLoading } = useBrowsableIndexes()


	const sortBy = () => {
		//TODO: 
	}

	const [sortOrder, setSortOrder] = useState('ASC')


	const rowClicked = (coin) => {
		console.log(coin)
		navigate(`/indexes/browse/${coin._id.$oid}`)
	}

	return (
		<div className="p-4 bg-gray-50">
			<BFTable 
				rows={data || []} 
				type="browse-cryptos" 
				tableStyle="border-separate border-spacing-y-5" 
				onRowClicked={rowClicked}
			/>
		</div>
	)
}