import { useState } from 'react'
import BFIcon from '../components/BFIcon'

export default function ComparePage() {

	const [typeSelected, setTypeSelected] = useState('side-by-side')

	return(
		<div className="p-4">
			<div className="flex flex-row gap-2">
				<h1>Compare Currencies</h1>
				<button className="">
					<BFIcon iconName="checked-circle" />
					<label>Side-by-side</label>
				</button>
				<button>
					<BFIcon iconName="open-circle" />
					<label>Overlay</label>
				</button>
			</div>
		</div>
	)
}