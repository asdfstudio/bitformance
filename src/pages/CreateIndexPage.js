import BFIcon from '../components/BFIcon'
import BFSearchBar from '../components/small/BFSearchBar'

export default function CreateIndexPage() {

	const addCrypto = (text) => {
		//TODO:
	}

	return (
		<div className="flex flex-row bg-gray-50">
			<div className="space-y-4 bg-white rounded border p-4 m-4">
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
							<select className="rounded border px-2 py-[5px]">
								<option>Never</option>
							</select>
						</div>
					</div>

					<div>
						<label className="font-bold text-sm">Description</label>
						<textarea className='w-full border h-32'></textarea>
					</div>

				</div>

			</div>

			<div>

			</div>
		</div>
	)
}