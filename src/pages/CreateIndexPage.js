import BFIcon from '../components/BFIcon'
import BFSearchBar from '../components/small/BFSearchBar'
import BFChooseOption from '../components/small/BFChooseOption'
import GraphCard from '../components/GraphCard'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BFUploadImage from '../components/small/BFUploadImage'
import { generateChartPreview, uploadImage, createIndex, baseUrl } from '../endpoints/index'
import BFSelectCryptos from '../components/small/BFSelectCryptos'
import BFLoading from '../components/small/BFLoading'
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { coinImageMappings } from '../data/coinImages'
import BFCryptoImage from '../components/small/BFCryptoImage'

export default function CreateIndexPage() {

	const navigate = useNavigate()
	const { mutate } = useSWRConfig()
	const customWeightsForm = useRef(null);

	const [loadingPreview, setLoadingPreview] = useState(false)
	const [previewShown, setPreviewShown] = useState(false)

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [weightingMethod, setWeightingMethod] = useState('equal_weight')
	const [initialValue, setInitialValue] = useState('')
	const [rebalancePeriod, setRebalancePeriod] = useState('never')
	const [selectedCryptos, setSelectedCryptos] = useState([])
	const [returnData, setReturnData] = useState(function(){})

	const [fileSelected, setFileSelected] = useState(null)

	const handleCreateIndex = async () => {
		setLoadingPreview(true)
		const customWeights = getCustomWeights()
		const newIndex = await createIndex(name, weightingMethod, description, initialValue, selectedCryptos, rebalancePeriod, customWeights)
		console.log(newIndex)
		if (newIndex.result) {
			if (fileSelected) {
				const addLogo = await uploadImage(fileSelected, 'logo', newIndex.data._id.$oid)
				console.log(addLogo)
			}
			mutate(baseUrl('/get-user-indexes'))
			navigate(`/indexes/my-indexes/${newIndex.data._id.$oid}`)
			return
		}
		setLoadingPreview(false)
		toast.error(newIndex.message)
	}

	const loadData = () => {
		return {
			data: { index: returnData },
			isLoading: false,
			isError: false	
		}
	}

	const loadPreview = async () => {
		if (initialValue && selectedCryptos.length) {
			const customWeights = getCustomWeights()
			setLoadingPreview(true)
			const data = await generateChartPreview(weightingMethod, initialValue, selectedCryptos, customWeights)
			setReturnData(data.data)
			setLoadingPreview(false)
			setPreviewShown(true)
		}
	}

	const getCustomWeights = () => {
		if (weightingMethod !== 'custom_weights') {
			return {}
		}
		const formData = new FormData(customWeightsForm.current);
		const keys = selectedCryptos
		let data = {}
		keys.forEach(key => data[key] = parseInt(formData.get(key)))
		return data
	}

	const handleFileSelect = async (e) => {
		const file = e.target?.files[0]
		setFileSelected(file)
	}

	useEffect(() => {
		if (!localStorage.getItem('username')) {
			navigate('/?sessionExpired=true')
		}
	}, [])

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 bg-gray-50">
			<div className="col-span-2 space-y-4 bg-white rounded border p-4 m-4">
				<h1 className="text-xl font-bold mb-4">Basic</h1>
				<label>Index Logo</label>
				<BFUploadImage handleFileSelect={handleFileSelect} fileSelected={fileSelected} />

				<div className="space-y-4">
					<div>
						<label className="font-bold text-sm">Index Name</label>
						<input onChange={(e) => setName(e.target?.value)} value={name} className="w-full px-2 py-1 border rounded" type="text" placeholder="e.g. Windmaker" />
					</div>

					<div className="relative">

						<label className="font-bold text-sm">Choose Cryptocurrency</label>
						<BFSelectCryptos selectedCryptos={selectedCryptos} setSelectedCryptos={setSelectedCryptos} />
					</div>

					<div className="grid grid-cols-2 items-center gap-2">
						<div>
							<label className="font-bold text-sm">Initial Balance</label>
							<input 
								onChange={(e) => setInitialValue(e.target?.value)} 
								value={initialValue} 
								className="w-full px-2 py-1 border rounded" 
								type="text" 
								placeholder="e.g. 123" 
							/>
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
						<textarea onChange={(e) => setDescription(e.target?.value)} value={description} className='w-full border h-32'></textarea>
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
								id: 'equal_weight',
								label: 'Equal Weight'
							},
							{
								id: 'market_cap',
								label: 'Weighted by Market Cap'
							},
							{
								id: 'custom_weights',
								label: 'Custom Weights'
							}
						]} />
					</div>
					{weightingMethod === 'custom_weights' && <hr />}
					{weightingMethod === 'custom_weights' && 
						<form ref={customWeightsForm}>
							<div>
								<p>{selectedCryptos.length > 0 ? 'Enter Custom Weights (Total Must Add To 100)' : 'Select coins to allow for weight entry'}</p>
								{selectedCryptos.map(crypto => {
									const coin = coinImageMappings.find(obj => obj.symbol === crypto)
									return (
										<div key={crypto + '-custom-weights'} className="flex flex-row gap-2 items-center bg-gray-100 my-2 rounded-lg p-2">
											<BFCryptoImage symbol={crypto} index={0} isLarge={true} />
											<p className="font-bold">{coin.name.slice(0, coin.name.length - 6)}</p>
											<p className="text-gray-500">{crypto}</p>
										
											<p className="ml-auto font-bold">Custom Weight</p>
											<input className="border rounded p-1 w-24 md:w-36" type="number" min="0" max="100" step="1" name={crypto} /> 
										</div>
									)
								})}
							</div>
						</form>
					}
				</div>

				<div className="bg-white mt-4 rounded-md border space-y-4">
					<GraphCard title="Chart Preview" subtractWidth={500} hook={loadData} />
				</div>
			</div>

			<div className="bg-white fixed bottom-3 w-72 right-4">
				<div className="flex flex-row gap-2">
					<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => navigate(-1)}>Cancel</button>
					{!previewShown && <button className="shadow font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => loadPreview()}>{loadingPreview ? <BFLoading isCenter={true} /> : 'Preview'}</button>}
					{previewShown && <button className="shadow font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => handleCreateIndex()}>{loadingPreview ? <BFLoading isCenter={true} /> : 'Create'}</button>}
				</div>
			</div>

		</div>
	)
}