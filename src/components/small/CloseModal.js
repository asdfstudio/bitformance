import BFIcon from '../BFIcon'

export default function CloseModal({ setShowModalType, topStyle = 'top-2' }) {
	return (
		<button 
			onClick={() => setShowModalType('')} 
			className={`absolute right-4 top-4 rounded-full w-[16px] h-[16px] bg-main-black ${topStyle}`}
		>
			<div className='flex items-center justify-center'>
			<span className="absolute text-[12.5px]"><BFIcon iconName="close" size="2xs" color="white" /></span>
			</div>
		</button>
	)
}