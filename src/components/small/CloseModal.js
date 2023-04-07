import BFIcon from '../BFIcon'

export default function CloseModal({ setShowModalType, topStyle = 'top-2' }) {
	return (
		<button 
			onClick={() => setShowModalType('')} 
			className={`absolute right-4 top-4 rounded-full w-[16px] h-[16px] bg-main-gray ${topStyle}`}
		>
			<span className="absolute -top-[4px] left-[4.5px]"><BFIcon iconName="close" size="2xs" color="white" /></span>
		</button>
	)
}