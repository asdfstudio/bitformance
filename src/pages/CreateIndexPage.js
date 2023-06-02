import BFChooseOption from '../components/small/BFChooseOption'
import GraphCard from '../components/GraphCard'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import BFUploadImage from '../components/small/BFUploadImage'
import { generateChartPreview, uploadImage, createIndex, baseUrl, deleteIndex, useAreMarketCapCoinsAvailable } from '../endpoints/index'
import BFSelectCryptos from '../components/small/BFSelectCryptos'
import BFLoading from '../components/small/BFLoading'
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { coinImageMappings } from '../data/coinImages'
import BFCryptoImage from '../components/small/BFCryptoImage'
import BFIcon from '../components/BFIcon'

export default function CreateIndexPage() {

	const navigate = useNavigate()
	const location = useLocation()
	const { mutate } = useSWRConfig()
	const customWeightsForm = useRef(null);

	const [loadingPreview, setLoadingPreview] = useState(false)
	const [previewShown, setPreviewShown] = useState(false)

	const [name, setName] = useState(location.state?.name || '')
	const [description, setDescription] = useState(location.state?.description || '')
	const [isWeighted, setWeighted] = useState(false)
	const [isWeightedNegative, setWeightedNegative] = useState(false)
	const [weightingMethod, setWeightingMethod] = useState(location.state?.weightingMethod || 'equal_weight')
	const [initialValue, setInitialValue] = useState(location.state?.initialValue || '')
	const [rebalancePeriod, setRebalancePeriod] = useState(location.state?.rebalancePeriod || 'never')
	const [selectedCryptos, setSelectedCryptos] = useState(location.state?.selectedCryptos || [])
	const [returnData, setReturnData] = useState(function(){})
	const [showMenu, setShowMenu] = useState(false)
	const [showAlertMenu, setShowAlertMenu] = useState(false)
	const [checkInput, setCheckInput] = useState(false)
	const [alertType, setAlertType] = useState("")
	const [alertMax, setAlertMax] = useState("")
	const [alertTotalWeight, setAlertTotalWeight] = useState(0)

	const [WordCountDesc, setWordCountDesc] = useState(0)
	const [WordCountTitle, setWordCountTitle] = useState(0)

	const [fileSelected, setFileSelected] = useState(null)

	const [isMarketCapWeightAvailable, setIsMarketCapWeightAvailable] = useState(true)

	const { data, isLoading } = useAreMarketCapCoinsAvailable()	

	const handleCreateIndex = async () => {
		setShowMenu(false)
		setLoadingPreview(true)
		const customWeights = getCustomWeights()
		const newIndex = await createIndex(name, weightingMethod, description, initialValue, selectedCryptos, rebalancePeriod, customWeights, location.state?.logo || '')

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
		if (initialValue && selectedCryptos.length && !checkInput) {
			const customWeights = getCustomWeights()
			
			if(customWeights != null){
				setLoadingPreview(true)
				const data = await generateChartPreview(weightingMethod, initialValue, selectedCryptos, customWeights)
				setReturnData(data.data)
				setLoadingPreview(false)
				setPreviewShown(true)
			}
		}else{
			if(checkInput){
				setAlertType("emptyBalance")
				setShowAlertMenu(!showAlertMenu)
			}
			if(!initialValue){
				setAlertType("emptyBalance")
				setShowAlertMenu(!showAlertMenu)
			}
			if(!selectedCryptos.length){
				setAlertType("emptyCrypto")
				setShowAlertMenu(!showAlertMenu)
			}
		}
	}

	const getCustomWeights = () => {
		if (weightingMethod !== 'custom_weights') {
			return {}
		}
		const formData = new FormData(customWeightsForm.current);
		const keys = selectedCryptos
		let data = {}
		let dataa = []
		let total = 0;
		setAlertTotalWeight("0")
		
		const maxWeight = 100;
		const minWeight = 100;
		keys.forEach(key => 
			data[key] = parseInt(formData.get(key)) & 
			dataa.push(parseInt(formData.get(key)))
		)
		for (var i in dataa) {
			total += dataa[i];
		}

		if(total == maxWeight && total <= minWeight && isWeighted ){
			return data
		}else{
			setShowAlertMenu(!showAlertMenu)
			{
				isWeightedNegative ? setAlertType("weightNegative") : setAlertType("weight") 
			}
			setAlertMax(maxWeight)
			{total ? setAlertTotalWeight(total) : setAlertTotalWeight(0)}

			return null
		}
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

	const maxWord = 200;
	const maxTitle = 30;
	const maxWeight = 100;
	const minWeight = 0;

	const countWordsDesc = (e) => {
		const text = e.target?.value;
		setWordCountDesc(text.length);
		if(WordCountDesc < maxWord){
			setDescription(text)
		}else{
			setShowAlertMenu(!showAlertMenu)
			setAlertType("Desc")
			setAlertMax(maxWord)
		}
	}
	const checkWeight = (e) => {
		const weight = e.target?.value;

		if(Math.sign(weight) === -1){
			setWeightedNegative(true)
		}else{
			setWeightedNegative(false)
		}

		if(weight <= maxWeight && weight >= minWeight){
			setWeighted(true)
		}else{
			setWeighted(false)
		}
	}
	const countWordsName = (e) => {
		const text = e.target?.value;

		setWordCountTitle(text.trim().length);
		if(WordCountTitle < maxTitle){
			setName(text)
		}else{
			setShowAlertMenu(!showAlertMenu)
			setAlertType("Name")
			setAlertMax(maxTitle)
		}
	}
	const haldleInput = (e) => {
		const num = e.target?.value;
		setInitialValue(num)

		if(!isNaN(+num)){
			setInitialValue(num)
			setCheckInput(false)
		}else{
			setCheckInput(true)
		}
	}

	return (
		<div className="grid grid-cols-1 pb-1 xl:grid-cols-5 bg-main-lightGray">
			<div className="col-span-2 space-y-4 bg-white border p-4 mt-2 md:m-4 md:rounded-lg">
				<h1 className="text-[22px] mb-6 font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Basic</h1>
				<label className='text-[16px] mb-6 font-DM_Sans font-medium leading-normal tracking-normal text-main-black'>Index Logo</label>
				<BFUploadImage handleFileSelect={handleFileSelect} fileSelected={fileSelected} src={location.state?.logo} />

				<div className="space-y-4">
					<div className='mt-1'>
						<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Index Name</label>
						<input onChange={(e) =>countWordsName(e)} value={name} 
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
								className="w-full px-2 py-[5px] border rounded mt-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal" 
								placeholder="e.g. 123"
								onChange={(e) => haldleInput(e)} 
								value={initialValue}
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
					{
						checkInput ? 
						<p className="text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-red relative">
							{'Value must be a Number!'}
						</p> : <p className=''></p>
					}

					<div className=''>
						<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Description</label>
						<textarea 
							onChange={(e) => countWordsDesc(e)} 
							value={description} placeholder="Enter description here..." 
							className='w-full border p-2 h-52 mt-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal rounded'
						/>
					</div>
					<div className='flex flex-row justify-end text-[14px] font-DM_Sans font-normal leading-normal tracking-wide text-main-grayText'>
						<p>{WordCountDesc}</p>
						<p>{'/'}{maxWord}</p>
					</div>

				</div>
			</div>


			<div className="col-span-3 mt-4 md:m-4 md:rounded-lg">
				<div className="bg-white p-4 border space-y-4 md:rounded-lg">
					<div className=" flex flex-row items-center gap-2">
						<h1 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Weighting Method</h1>
						{/* <span className="bg-main-lightSkyBlue rounded py-1 px-2 text-[13px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gray">5</span> */}
					</div>
					<div className="flex flex-col pb-2 md:space-x-4 md:flex-row">
						<BFChooseOption isMarketCapWeightAvailable={isMarketCapWeightAvailable} onSelect={setWeightingMethod} onChange={setReturnData} preview={setPreviewShown} selected={weightingMethod} options={[
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
											<input 
												className={`rounded p-1 w-24 md:w-36 bg-main-lightGray border-2`} 
												type="number" 
												min="0" 
												max="100" 
												step="1" 
												name={crypto}
												onChange={(e) => checkWeight(e) & setReturnData(null) & setPreviewShown(false)}
											/>
										</div>
									)
								})}
							</div>
						</form>
					}
				</div>

				<div className="bg-white mt-4 rounded-md border space-y-4">
					{returnData && <GraphCard title="Chart Preview" subtractWidth={360} hook={loadData} halfGraph={true} createIndex={true}/>}
				</div>

				{/* <div className={`bg-main-white fixed w-full md:w-72 right-0 ${previewShown ? 'bottom-0' : 'bottom-0 md:bottom-0'}`}> */}
					<div className="flex flex-row gap-2 p-2 bg-main-white border rounded-lg mt-4 justify-end">
						<button className="w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor bg-opacity-10 text-main-gColor py-2 md:w-[150px]" onClick={() => navigate(-1)}>Cancel</button>
						{!previewShown && 
							<button 
								className="shadow w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor hover:bg-main-buttonBlue text-white py-2 md:w-[150px]" 
								onClick={() => loadPreview()}>
									{loadingPreview ? <BFLoading isCenter={true} /> : 'Preview'}
							</button>}
						{previewShown && 
							<button 
								className="shadow w-full text-[15px] font-DM_Sans font-bold leading-normal tracking-normal rounded bg-main-gColor hover:bg-main-buttonBlue text-white py-2 md:w-[150px]" 
								onClick={() => setShowMenu(!showMenu)}>
									{loadingPreview ? <BFLoading isCenter={true} /> : 'Create'}
							</button>}
					</div>
			  	{/* </div> */}
			</div>
			
			{showMenu &&
			<div className="relative z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
   			    <div className="fixed inset-0 z-[70] overflow-y-auto">
			      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		           <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		             <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-main-white"/>
						<div className="p-4 space-y-6">
						  <div className='text-[38px] flex justify-center'>
							<BFIcon color="#40C8B8" iconName="checkToSlot" />
						  </div>
							<p className='text-[18px] font-DM_Sans font-medium leading-normal tracking-normal flex justify-center'>Index Created Successfully!</p>
					  	<div className="mt-auto flex flex-col gap-2">
						  <Link onClick={() => handleCreateIndex()}>
							<button type="submit" className="w-full rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow-sm shadow-main-shadowBlue text-white py-2">Great, View Index</button>
							</Link>
						  <Link to='/indexes/my-indexes' onClick={() => handleCreateIndex()}>
							<button className="w-full rounded-lg bg-main-gColor bg-opacity-10 text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gColor py-2">Go to My Index</button>
							</Link>
				    	</div>
					</div>
				  </div>
				</div> 
			</div>
		  </div>
		  }
		  
		{showAlertMenu &&
		<div className="relative z-[60]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
   			    <div className="fixed inset-0 z-[70] overflow-y-auto">
			      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		           <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		             <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-main-white"/>
						<div className="p-4 space-y-6">
						  <div className='text-[38px] flex justify-center'>
							<BFIcon color="#fd5d60" iconName="alert" />
						  </div>
							<p className='text-[18px] font-DM_Sans font-medium leading-normal tracking-normal flex justify-center text-center'>
								{alertType === "weight" && "Custom weight should be equal to "+'"'+alertMax+'"' + ", Current total is equal to "+'"'+alertTotalWeight+'"'+"."}
								{alertType === "weightNegative" && "Custom weight value cannot be Negative."}
								{alertType === "Desc" && "You cannot put more than "+alertMax+" words."}
								{alertType === "Name" && "You cannot put more than "+alertMax+" characters."}
								{alertType === "emptyBalance" && "Please fill the Initial Balance properly to Preview."}
								{alertType === "emptyCrypto" && "Please Selete any Crypto to Preview."}
							</p>
					  	<div className="mt-auto flex flex-col gap-2">
						  <Link onClick={() => setShowAlertMenu(false)}>
							<button type="submit" className="w-full rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow-sm shadow-main-shadowBlue text-white py-2">Ok</button>
							</Link>
				    	</div>
					</div>
				  </div>
				</div> 
			</div>
		  </div>
		}
		</div>
	)
}
