import BFIcon from '../BFIcon'

export default function CloseModal({ setShowModalType, topStyle = 'top-2' }) {
	return (
		<button 
			onClick={() => setShowModalType('')} 
			className={`absolute right-4 rounded-full px-1 bg-gray-100 ${topStyle}`}
		>
			<BFIcon iconName="close" size="xs" />
		</button>
	)
}