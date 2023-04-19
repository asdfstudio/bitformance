import { useState } from 'react'
import SignInForm from '../small/SignInForm'
import BitformanceLeftPanelHeader from '../small/BitformanceLeftPanelHeader';
import BitformanceLeftPanelFooter from '../small/BitformanceLeftPanelFooter';
import BitformanceLeftPanel from '../small/BitformanceLeftPanel';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function SignInModal({ setShowModalType }) {

	const { width } = useWindowDimensions();

	const [forgotPassword, setForgotPassword] = useState(false);
	const [viewShown, setViewShown] = useState('sign-in')

	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="rounded-2xl relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">

			{
				width <= 640 ? 
				<div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 text-main-white flex flex-col space-y-13 bg-main-lightGray sm:bg-gradient-to-b from-main-gradientColor2 to-main-gradientColor1">
		    		<BitformanceLeftPanelHeader setShowModalType={setShowModalType} showInfo={viewShown} viewShown={viewShown} />
		    	</div>

		    	<div className="col-span-3 p-4 space-y-4 px-6">
		    		<SignInForm setShowModalType={setShowModalType} setViewShown={setViewShown} viewShown={viewShown} />
		    	</div>
				{viewShown === 'sign-in' && 
					<div className="col-span-2 text-white flex flex-col p-4 bg-main-lightGray sm:bg-main-gradientColor1">
		    			<BitformanceLeftPanelFooter setShowModalType={setShowModalType} showInfo={viewShown}  />
		    		</div>
				}
		    	</div> 
				
				:

				<div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 bg-gradient-to-b from-main-gradientColor2 to-main-gradientColor1 text-main-white flex flex-col p-5 space-y-13">
		    		<BitformanceLeftPanel setShowModalType={setShowModalType} showInfo={viewShown}  />
		    	</div>

		    	<div className="col-span-3 p-3 space-y-4 px-6">
		    		<SignInForm setShowModalType={setShowModalType} setViewShown={setViewShown} viewShown={viewShown} />
		    	</div>
		    </div>
			}
		  </div>
		</div>
	)
}