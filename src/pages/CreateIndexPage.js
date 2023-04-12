import BFChooseOption from '../components/small/BFChooseOption'
import GraphCard from '../components/GraphCard'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BFUploadImage from '../components/small/BFUploadImage'
import { generateChartPreview, uploadImage, createIndex, baseUrl, deleteIndex, useAreMarketCapCoinsAvailable } from '../endpoints/index'
import BFSelectCryptos from '../components/small/BFSelectCryptos'
import BFLoading from '../components/small/BFLoading'
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { coinImageMappings } from '../data/coinImages'
import BFCryptoImage from '../components/small/BFCryptoImage'

export default function CreateIndexPage() {

	const navigate = useNavigate()
	const location = useLocation()
	const { mutate } = useSWRConfig()
	const customWeightsForm = useRef(null);

	const [loadingPreview, setLoadingPreview] = useState(false)
	const [previewShown, setPreviewShown] = useState(false)

	const [name, setName] = useState(location.state?.name || '')
	const [description, setDescription] = useState(location.state?.description || '')
	const [weightingMethod, setWeightingMethod] = useState(location.state?.weightingMethod || 'equal_weight')
	const [initialValue, setInitialValue] = useState(location.state?.initialValue || '')
	const [rebalancePeriod, setRebalancePeriod] = useState(location.state?.rebalancePeriod || 'never')
	const [selectedCryptos, setSelectedCryptos] = useState(location.state?.selectedCryptos || [])
	const [returnData, setReturnData] = useState(function(){})

	const [fileSelected, setFileSelected] = useState(null)

	const [isMarketCapWeightAvailable, setIsMarketCapWeightAvailable] = useState(true)

	const { data, isLoading } = useAreMarketCapCoinsAvailable()	

	const handleCreateIndex = async () => {
		setLoadingPreview(true)
		const customWeights = getCustomWeights()
		const newIndex = await createIndex(name, weightingMethod, description, initialValue, selectedCryptos, rebalancePeriod, customWeights, location.state?.logo || '')
		// console.log(newIndex)

		if (location.state?.previousId) {
			deleteIndex(location.state.previousId)
		}

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

	useEffect(() => {
		setLoadingPreview(false)
		setPreviewShown(false)
		setReturnData(null)

		if (selectedCryptos.some(crypto => data.data[crypto] === false )) {
			setIsMarketCapWeightAvailable(false)
			setWeightingMethod('equal_weight')
		} else {
			setIsMarketCapWeightAvailable(true)
		}
	}, [selectedCryptos, initialValue])

	return (
		<div className="grid grid-cols-1 xl:grid-cols-5 bg-main-lightGray">
			<div className="col-span-2 space-y-4 bg-white rounded-lg border p-4 m-4">
				<h1 className="text-[22px] mb-6 font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Basic</h1>
				<label className='text-[16px] mb-6 font-DM_Sans font-medium leading-normal tracking-normal text-main-black'>Index Logo</label>
				<BFUploadImage handleFileSelect={handleFileSelect} fileSelected={fileSelected} src={location.state?.logo} />

				<div className="space-y-4">
					<div className='mt-1'>
						<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Index Name</label>
						<input onChange={(e) => setName(e.target?.value)} value={name} 
							className="w-full px-2 py-1 mt-1 border border-main-inputBorder rounded text-[15px] font-DM_Sans font-normal leading-normal tracking-normal" 
							type="text" 
							placeholder="e.g. Windmaker" 
						/>
					</div>

					<div className="relative pt-1">
						<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Choose Cryptocurrency</label>
						<BFSelectCryptos 
							showIndexes={false} 
							selectedCryptos={selectedCryptos} 
							setSelectedCryptos={setSelectedCryptos} 
						/>
					</div>

					<div className="grid grid-cols-2 items-center gap-2">
						<div className='mt-1'>
							<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Initial Balance</label>
							<input 
								onChange={(e) => setInitialValue(e.target?.value)} 
								value={initialValue} 
								className="w-full px-2 py-[5px] border rounded mt-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal" 
								type="text" 
								placeholder="e.g. 123" 
							/>
						</div>

						<div className="flex flex-col mt-1">
							<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Rebalance Period</label>
							<select 
								onChange={(e) => setRebalancePeriod(e.target?.value)} 
								value={rebalancePeriod}
								className="rounded border px-2 py-[5px] mt-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black bg-main-inputBackground focus:border-main-buttonBlue"
							>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="never">Never</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="daily">Daily</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="weekly">Weekly</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="monthly">Monthly</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="quarterly">Quarterly</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="six-months">6 Months</option>
								<option className='text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black' value="yearly">Yearly</option>
							</select>
						</div>
					</div>

					<div className='pt-1'>
						<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Description</label>
						<textarea 
							onChange={(e) => setDescription(e.target?.value)} 
							value={description} placeholder="Enter description here..." 
							className='w-full border p-2 h-32 mt-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal rounded'
						/>
					</div>

				</div>
			</div>


			<div className="col-span-3 m-4">
				<div className="bg-white p-4 rounded-lg border space-y-4">
					<div className=" flex flex-row items-center gap-2">
						<h1 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Weighting Method</h1>
						<span className="bg-main-lightSkyBlue rounded py-1 px-2 text-[13px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gray">5</span>
					</div>
					<div className="space-x-4 flex flex-row pb-2">
						<BFChooseOption isMarketCapWeightAvailable={isMarketCapWeightAvailable} onSelect={setWeightingMethod} selected={weightingMethod} options={[
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
								<p className='text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black'>{selectedCryptos.length > 0 ? 'Enter Custom Weights (Total Must Add To 100)' : 'Select coins to allow for weight entry'}</p>
								{selectedCryptos.map(crypto => {
									const coin = coinImageMappings.find(obj => obj.symbol === crypto)
									return (
										<div key={crypto + '-custom-weights'} className="flex flex-row gap-2 items-center bg-gray-100 my-2 rounded-lg p-2">
											<BFCryptoImage symbol={crypto} index={0} isLarge={true} />
											<p className="text-[16px] font-DM_Sans font-bold leading-normal tracking-normal text-main-black">{coin.name.slice(0, coin.name.length - 6)}</p>
											<p className="text-[14px] font-DM_Sans font-normal leading-normal tracking-normal text-main-symbol">{crypto}</p>
										
											<p className="ml-auto text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Custom Weight</p>
											<input className="border rounded p-1 w-24 md:w-36 bg-main-lightGray" type="number" min="0" max="100" step="1" name={crypto} /> 
										</div>
									)
								})}
							</div>
						</form>
					}
				</div>

				<div className="bg-white mt-4 rounded-md border space-y-4">
					{returnData && <GraphCard title="Chart Preview" subtractWidth={650} hook={loadData} />}
				</div>
			</div>

			<div className="bg-white fixed bottom-1 w-72 right-4">
				<div className="flex flex-row gap-2">
					<button className="w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor bg-opacity-10 text-main-gColor py-2" onClick={() => navigate(-1)}>Cancel</button>
					{!previewShown && <button className="shadow w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor hover:bg-main-buttonBlue text-white py-2" onClick={() => loadPreview()}>{loadingPreview ? <BFLoading isCenter={true} /> : 'Preview'}</button>}
					{previewShown && <button className="shadow w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor hover:bg-main-buttonBlue text-white py-2" onClick={() => handleCreateIndex()}>{loadingPreview ? <BFLoading isCenter={true} /> : 'Create'}</button>}
				</div>
			</div>

		</div>
	)
}