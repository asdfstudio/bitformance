import { useState } from 'react'

export default function BrowsePage() {

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

	const data = [

	]

	return (
		<div className="p-4">
			<table className="table-fixed w-full border-separate border rounded-md">
				<thead>
					<tr>
						{sortables.map(label => (<th key={label}>
							<button 
								className="px-4 py-2 whitespace-pre text-sm"
								onClick={() => sortBy(label)} 
							>
								{label} {sortOrder === 'ASC' ? '^' : 'v'}
							</button></th>
						))}
					</tr>
				</thead>
				<tbody>
				
				</tbody>
			</table>
		</div>
	)
}