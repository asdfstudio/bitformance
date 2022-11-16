import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'
export default function SignUpForm() {

	//TODO: add error messages
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)

	function onRecaptchaChange(value) {
	  console.log('captch value: ', value)
	  setCompletedRecaptcha(true)
	}

	const signUp = () => {
		//TODO: regex, validate, etc.
	}

	return(
		<>
			<div className="flex flex-row gap-2">
				<div>
					<label className="font-bold text-sm">First Name</label>
					<input type='text' className="w-full py-1 border rounded" />
				</div>
				<div>
					<label className="font-bold text-sm">Last Name</label>
					<input type="text" className="w-full py-1 border rounded" />
				</div>
			</div>

			<div>
				<label className="font-bold text-sm">Username</label>
				<input type="text" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Email Address</label>
				<input type="email" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Confirm Email Address</label>
				<input type="email" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Password (Must be at least 8 characters)</label>
				<input type="password" className="w-full py-1 border rounded" />
			</div>


			<p className="font-bold text-center text-sm">By signing up, I agree to Bitformance&apos;s <a className="text-blue-500" href="/terms-of-service" target="_blank" rel="noopener">terms of service</a> and <a className="text-blue-500" href="/privacy-policy" target="_blank" rel="noopener">privacy policy.</a></p>
			<ReCAPTCHA
			  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
			  onChange={onRecaptchaChange}
			  className="ml-0 sm:ml-6" 
			/>

			<div className="mt-auto">
				<button className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => signUp()}>Sign Up</button>
			</div>

		</>
	)
}