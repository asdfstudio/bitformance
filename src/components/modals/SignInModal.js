import { Link } from 'react-router-dom'
import bitLogoWhite from '../../bitLogoWhite.png'
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'

export default function SignInModal({ setShowModalType }) {
	
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [isRemember, setIsRemember] = useState(false);

	const signIn = () => {
		//TODO: sign in
	}

	function onRecaptchaChange(value) {
	  console.log('captch value: ', value)
	  setCompletedRecaptcha(true)
	}

	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
	
	   		<button 
	   			onClick={() => setShowModalType('')} 
	   			className="absolute top-0 right-4 rounded-full px-1 bg-gray-100"
	   		>
	   			x
	   		</button>

		    <div className="grid grid-cols-1 sm:grid-cols-5">
		    	<div className="col-span-2 bg-blue-900 p-4 text-white flex flex-col space-y-16">
		    		<div className="space-y-4">
		    			<img className="w-44" src={bitLogoWhite} alt="bitformance logo" />
		    			<h1 className="text-4xl mt-2">Sign in to Bitformance</h1>
		    			<p>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		    		</div>
		    		<div className="mt-auto space-y-2">
		    			<p>Don&apos;t have an account?</p>
		    			<button className="w-full text-sm rounded bg-blue-100 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_UP')}>Sign Up</button>
		    		</div>
		    	</div>

		    	<div className="col-span-3 p-6 space-y-4">

		    		<div>
		    			<label className="font-bold">Username or Email Address</label>
		    			<input className="w-full py-1 border rounded" type="text" />
		    		</div>

		    		<div>
		    			<label className="font-bold">Password</label>
		    			<input className="w-full py-1 border rounded" type="password" />
		    		</div>

		    		<div className="flex flex-row gap-2">
		    			<input type="checkbox" />
		    			<label>Remember</label>

		    			<Link className="ml-auto underline text-blue-500">Forgot Password?</Link>
		    		</div>

		    		<ReCAPTCHA
		    		  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
		    		  onChange={onRecaptchaChange}
		    		  className="ml-0 sm:ml-6"
		    		/>

		    		<button className="mt-auto w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => signIn()}>Sign In</button>
		    	</div>
		    </div>
		  </div>
		</div>
	)
}