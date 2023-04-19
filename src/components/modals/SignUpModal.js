import useWindowDimensions from '../../hooks/useWindowDimensions';
import BitformanceLeftPanel from '../small/BitformanceLeftPanel';
import BitformanceLeftPanelFooter from '../small/BitformanceLeftPanelFooter'
import BitformanceLeftPanelHeader from '../small/BitformanceLeftPanelHeader'
import CloseModal from '../small/CloseModal'
import SignUpForm from '../small/SignUpForm'

export default function SignUpModal({ setShowModalType }) {

	const { width } = useWindowDimensions();

	return (
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="rounded-2xl relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
		  {
				width <= 640 ? 
		    <div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 text-white flex flex-col p-4 space-y-15 bg-main-lightGray sm:bg-gradient-to-b from-main-gradientColor2 to-main-gradientColor1">
		    		<BitformanceLeftPanelHeader setShowModalType={setShowModalType} showInfo="sign-up"  />
		    	</div>

		    	<div className="col-span-3 p-4 space-y-4 px-6">
		    		<CloseModal setShowModalType={setShowModalType} />
		    		<SignUpForm setShowModalType={setShowModalType} />
		    	</div>

				<div className="col-span-2 text-white flex flex-col p-4 bg-main-lightGray sm:bg-main-gradientColor1">
		    		<BitformanceLeftPanelFooter setShowModalType={setShowModalType} showInfo="sign-up"  />
		    	</div>
		    </div>
			:
			<div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 bg-gradient-to-b from-main-gradientColor2 to-main-gradientColor1 text-white flex flex-col p-6 space-y-15">
		    		<BitformanceLeftPanel setShowModalType={setShowModalType} showInfo="sign-up"  />
		    	</div>

		    	<div className="col-span-3 p-6 space-y-4 px-6">
		    		<CloseModal setShowModalType={setShowModalType} />
		    		<SignUpForm setShowModalType={setShowModalType} />
		    	</div>
		    </div>
			}
		  </div>
		</div>
	)
}