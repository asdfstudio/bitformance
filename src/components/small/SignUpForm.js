import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'
import BFLoading from './BFLoading'
import { registerAccount } from '../../endpoints/index'

export default function SignUpForm({ setShowModalType }) {

	const [errorMessage, setErrorMessage] = useState('')
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [loading, setLoading] = useState(false)

	function onRecaptchaChange(value) {
	  console.log('captch value: ', value)
	  setCompletedRecaptcha(true)
	}

	const signUp = async (e) => {
		e.preventDefault()
		setErrorMessage('')
		setLoading(true)
		const formData = new FormData(e.target);
		const keys = [
			'username',
			'password',
			'email',
			'email_confirm',
			'first_name',
			'last_name'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))

		const error = validate(data)
		if (error) {
			setErrorMessage(error)
			setLoading(false)
			return
		}

		const result = await registerAccount({ ...data })
		console.log(result)
		if (result.result) {
			setShowModalType('SIGN_IN')
			localStorage.setItem('saved_username', data.username)
			return
		}		
		setErrorMessage(result.error)
		setLoading(false)
	}

	const validate = (data) => {
		if (data.email !== data.email_confirm) {
			return 'Emails must be matching.'
		} else if (data.password.length < 8) {
			return 'Password must be 8 characters or longer.'
		} else if (data.username.length < 8) {
			return 'Username must be 8 characters or longer.'
		} else if (!data.username || !data.email || !data.email_confirm || !data.first_name || !data.last_name) {
			return 'Please fill out the whole form.'
		}
		return ''
	}

	return(

		<form className="space-y-4" onSubmit={(e) => signUp(e)}>
			<div className="flex flex-row gap-2">
				<div>
					<label className="font-bold text-sm">First Name</label>
					<input name="first_name" type='text' className="w-full py-1 border rounded" />
				</div>
				<div>
					<label className="font-bold text-sm">Last Name</label>
					<input name="last_name" type="text" className="w-full py-1 border rounded" />
				</div>
			</div>

			<div>
				<label className="font-bold text-sm">Username</label>
				<input name="username" type="text" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Email Address</label>
				<input name="email" type="email" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Confirm Email Address</label>
				<input name="email_confirm" type="email" className="w-full py-1 border rounded" />
			</div>

			<div>
				<label className="font-bold text-sm">Password (Must be at least 8 characters)</label>
				<input name="password" type="password" className="w-full py-1 border rounded" />
			</div>


			<p className="font-bold text-center text-sm">By signing up, I agree to Bitformance&apos;s <a className="text-blue-500" href="/terms-of-services" target="_blank" rel="noopener">terms of service</a> and <a className="text-blue-500" href="/privacy-policy" target="_blank" rel="noopener">privacy policy.</a></p>
			<ReCAPTCHA
			  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
			  onChange={onRecaptchaChange}
			  className="ml-0 sm:ml-6" 
			/>
			{errorMessage && <p className="text-red-500 text-sm">*{errorMessage}</p>}
			<div className="mt-auto">
				<button type="submit" className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2">{loading ? <BFLoading isCenter={true} /> : 'Sign Up'}</button>
			</div>
		</form>

	)
}