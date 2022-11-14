import { useState } from 'react'
import BitformanceLeftPanel from '../small/BitformanceLeftPanel'
import SignInForm from '../small/SignInForm'

export default function SignInModal({ setShowModalType }) {

	const [forgotPassword, setForgotPassword] = useState(false);
	const [viewShown, setViewShown] = useState('sign-in')

	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
			
		    <div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 bg-blue-900 p-4 text-white flex flex-col space-y-14">
		    		<BitformanceLeftPanel setShowModalType={setShowModalType} showInfo={viewShown === 'sign-in'}  />
		    	</div>

		    	<div className="col-span-3 p-6 space-y-4">
		    		<SignInForm setShowModalType={setShowModalType} setViewShown={setViewShown} viewShown={viewShown} />
		    	</div>
		    </div>
		  </div>
		</div>
	)
}