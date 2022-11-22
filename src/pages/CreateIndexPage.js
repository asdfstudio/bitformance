import BFIcon from '../components/BFIcon'
import BFSearchBar from '../components/small/BFSearchBar'
import BFChooseOption from '../components/small/BFChooseOption'
import GraphCard from '../components/GraphCard'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CreateIndexPage() {

	const navigate = useNavigate()

	const [weightingMethod, setWeightingMethod] = useState('equal-weight')
	const [rebalancePeriod, setRebalancePeriod] = useState('never')
	const addCrypto = (text) => {
		//TODO:
	}

	const createIndex = () => {

	}

	return (
		<div className="grid grid-cols-5 bg-gray-50">
			<div className="col-span-2 space-y-4 bg-white rounded border p-4 m-4">
				<h1 className="text-xl font-bold mb-4">Basic</h1>
				<label>Index Logo</label>
				<div className="flex flex-row items-center gap-4">
					<div className="bg-gray-100 rounded-full w-28 h-28 flex flex-row items-center justify-center">
						<BFIcon iconName="placeholder-image" size="2xl" color="gray" />
					</div>
					<div className="space-y-2">
						<label for="file-upload" className="rounded-md bg-blue-100 text-sm text-blue-500 px-6 py-2">Choose File</label>
						<input id="file-upload" type="file" hidden />
						<p className="text-gray-300 w-60">Minimum logo size is 150 x 150pixels, an aspect ratio of 1:1</p>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="font-bold text-sm">Index Name</label>
						<input className="w-full px-2 py-1 border rounded" type="text" placeholder="e.g. Windmaker" />
					</div>

					<div>
						<label className="font-bold text-sm">Choose Cryptocurrency</label>
						<BFSearchBar onChange={addCrypto} />
					</div>

					<div className="grid grid-cols-2 items-center gap-2">
						<div>
							<label className="font-bold text-sm">Initial Balance</label>
							<input className="w-full px-2 py-1 border rounded" type="text" placeholder="e.g. 123" />
						</div>

						<div className="flex flex-col mt-1">
							<label className="font-bold text-sm">Rebalance Period</label>
							<select onChange={(e) => setRebalancePeriod(e.target?.value)} value={rebalancePeriod} className="rounded border px-2 py-[5px]">
								<option value="never">Never</option>
								<option value="daily">Daily</option>
								<option value="weekly">Weekly</option>
								<option value="monthly">Monthly</option>
								<option value="quarterly">Quarterly</option>
								<option value="six-months">6 Months</option>
								<option value="yearly">Yearly</option>
							</select>
						</div>
					</div>

					<div>
						<label className="font-bold text-sm">Description</label>
						<textarea className='w-full border h-32'></textarea>
					</div>

				</div>
			</div>


			<div className="col-span-3 mr-4 mt-4 mb-4">
				<div className="bg-white p-4 rounded-md border space-y-4">
					<div className=" flex flex-row items-center gap-2">
						<h1 className="text-xl font-bold">Weighting Method</h1>
						<span className="bg-gray-100 rounded py-1 px-2 text-sm font-normal">5</span>
					</div>
					<div className="space-x-2 flex flex-row">
						<BFChooseOption onSelect={setWeightingMethod} selected={weightingMethod} options={[
							{
								id: 'equal-weight',
								label: 'Equal Weight'
							},
							{
								id: 'market-cap',
								label: 'Weighted by Market Cap'
							},
							{
								id: 'custom-weights',
								label: 'Custom Weights'
							}
						]} />
					</div>
					{weightingMethod === 'custom-weights' && <hr />}
					{weightingMethod === 'custom-weights' && 
						<div>
							for selected coins allow weight entry
						</div>
					}
				</div>

				<div className="bg-white mt-4 rounded-md border space-y-4">
					<GraphCard title="Chart Preview" subtractWidth={500} />
				</div>
			</div>

			<div className="bg-white fixed bottom-3 w-72 right-4">
				<div className="flex flex-row gap-2">
					<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => navigate(-1)}>Cancel</button>
					<button className="shadow font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => createIndex()}>Create</button>
				</div>
			</div>

		</div>
	)
}