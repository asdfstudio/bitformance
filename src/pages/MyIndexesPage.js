import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFTable from '../components/small/BFTable'
import { useMyIndexes } from '../endpoints/index'

export default function MyIndexesPages() {

	const navigate = useNavigate()
	const { data, isLoading } = useMyIndexes()


	const sortBy = () => {
		//TODO: 
	}

	const [sortOrder, setSortOrder] = useState('ASC')


	const rowClicked = (coin) => {
		navigate(`/indexes/my-indexes/${coin._id.$oid}`)
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