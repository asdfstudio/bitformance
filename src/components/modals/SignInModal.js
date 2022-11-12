import { Link } from 'react-router-dom'
import bitLogoWhite from '../../bitLogoWhite.png'

export default function SignInModal({ setShowModalType }) {
	
	const signIn = () => {
		//TODO: sign in
	}

	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		 
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
	
	   		<button 
	   			onClick={() => setShowModalType('')} 
	   			className="absolute top-0 right-4 rounded-full bg-gray-100"
	   		>
	   			x
	   		</button>

		    <div className="flex flex-row">
		    	<div className="bg-blue-800 p-4 text-white space-y-8 flex flex-col">
		    		<img src={bitLogoWhite} alt="bitformance logo" />
		    		<h1 className="text-4xl">Sign in to Bitformance</h1>
		    		<p>Bitformance is the easiest <br/> place to track, analyze, and create cryptocurrency indexes.</p>
		    		<div className="mt-auto space-y-2">
		    			<p>Don&apos;t have an account?</p>
		    			<button className="w-full text-sm rounded bg-blue-100 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_UP')}>Sign Up</button>
		    		</div>
		    	</div>

		    	<div>
		    		<label>Username or Email Address</label>
		    		<input type="text" />

		    		<label>Password</label>
		    		<input type="password" />

		    		<input type="checkbox" />
		    		<label>Remember</label>

		    		<Link>Forgot Password?</Link>

		    		{/* RECAPTCHA */}
		    		<button onClick={() => signIn()}>Sign In</button>
		    	</div>
		    </div>
		  </div>
		</div>
	)
}