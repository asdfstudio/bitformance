import BitformanceLeftPanel from '../small/BitformanceLeftPanel'
import CloseModal from '../small/CloseModal'
import SignUpForm from '../small/SignUpForm'

export default function SignUpModal({ setShowModalType }) {
	return (
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
			
		    <div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 bg-blue-900 text-white flex flex-col p-4 space-y-15">
		    		<BitformanceLeftPanel setShowModalType={setShowModalType} showInfo="sign-up"  />
		    	</div>

		    	<div className="col-span-3 p-4 space-y-4">
		    		<CloseModal setShowModalType={setShowModalType} />
		    		<SignUpForm setShowModalType={setShowModalType} />
		    	</div>
		    </div>
		  </div>
		</div>
	)
}