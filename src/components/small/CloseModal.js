import BFIcon from '../BFIcon'

export default function CloseModal({ setShowModalType, topStyle = 'top-2' }) {
	return (
		<button 
			onClick={() => setShowModalType('')} 
			className={`absolute right-4 rounded-full w-[20px] h-[20px] bg-gray-500 ${topStyle}`}
		>
			<span className="absolute -top-[2px] left-[6px]"><BFIcon iconName="close" size="2xs" color="white" /></span>
		</button>
	)
}