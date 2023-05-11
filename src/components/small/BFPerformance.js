import { calculateDrawdown, calculateReturn } from "../../helpers"
import BFIcon from "../BFIcon"

export default function BFPerformance({
	data,
}) {

	const totalReturn = calculateReturn(data.index.value || data.index.price, data.index.initial_value)
	const drawdown = calculateDrawdown(data.index.daily_graph_data.prices || data.index.daily_graph_data.price || [])

	const UpTag = ({ value }) => (
		<span className="text-[30px] font-DM_Sans font-medium leading-normal tracking-normal text-main-green"><BFIcon iconName="up-right-arrow" /> {Math.abs(value).toFixed(2)}%</span>
	)

	const DownTag = ({ value }) => (
		<span className="text-[30px] font-DM_Sans font-medium leading-normal tracking-normal text-main-deepOrange"><BFIcon iconName="down-left-arrow" /> {Math.abs(value).toFixed(2)}%</span>
	)
	return (<>

			<div className={`hidden xl:block relative bg-white top-[300px]`}>
				<h2 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Performance Metrics</h2>
				<div className="pt-4 flex flex-col justify-between items-start">
					<div className="w-full flex flex-col">
						<p className="flex flex-col items-start ">
							{data.index.drawdown > 0 ? <UpTag value={data.index.drawdown || drawdown} /> : <DownTag value={data.index.drawdown || drawdown} /> }
							<span className="ml-2 mt-0.5 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black">Maximum Drawdown</span>
						</p>
						
						<div className='hidden md:block border-r-[1px] my-2 border-main-lightGrayBorder'/>

						<div className='border-t-[1px] my-2 border-main-lightGrayBorder'/>

						<p className="flex flex-col items-start">
							{totalReturn > 0 ? <UpTag value={totalReturn} /> : <DownTag value={totalReturn} /> }
							<span className="ml-2 mt-0.5 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-black">Total Return</span>
						</p>
					</div>
				</div>
			</div>
	</>)
}
