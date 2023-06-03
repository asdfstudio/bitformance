import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'
import BFLoading from './BFLoading'
import { registerAccount } from '../../endpoints/index'

export default function SignUpForm({ setShowModalType }) {

	const [errorMessage, setErrorMessage] = useState('')
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [loading, setLoading] = useState(false)

	function onRecaptchaChange(value) {
	//   console.log('captch value: ', value)
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
		// console.log(result)
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
			<div className="flex flex-col gap-4 sm:flex-row">
				<div>
					<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">First Name</label>
					<input name="first_name" type='text' className="w-full py-1 border rounded mt-1 px-2" />
				</div>
				<div>
					<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Last Name</label>
					<input name="last_name" type="text" className="w-full py-1 border rounded mt-1 px-2" />
				</div>
			</div>

			<div>
				<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Username</label>
				<input name="username" type="text" className="w-full py-1 border rounded mt-1 px-2" />
			</div>

			<div>
				<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Email Address</label>
				<input name="email" type="email" className="w-full py-1 border rounded mt-1 px-2" />
			</div>

			<div>
				<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Confirm Email Address</label>
				<input name="email_confirm" type="email" className="w-full py-1 border rounded mt-1 px-2" />
			</div>

			<div>
				<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Password (Must be at least 8 characters)</label>
				<input name="password" type="password" className="w-full py-1 border rounded mt-1 mb-2 px-2" />
			</div>


			<p className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black text-start sm:text-center">By signing up, I agree to Bitformance&apos;s <a className="text-blue-500" href="/terms-of-services" target="_blank" rel="noopener">terms of service</a> and <a className="text-blue-500" href="/privacy-policy" target="_blank" rel="noopener">privacy policy.</a></p>
			<ReCAPTCHA
			  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
			  onChange={onRecaptchaChange}
			  className="ml-0 sm:ml-6" 
			/>
			{errorMessage && <p className="text-red-500 text-sm">*{errorMessage}</p>}
			<div className="mt-auto">
				<button type="submit" className="w-full text-sm rounded-lg bg-main-buttonBlue hover:bg-blue:600 text-main-white font-bold py-2 mt-2 cursor-pointer shadow-sm shadow-main-shadowBlue">{loading ? <BFLoading isCenter={true} /> : 'Sign Up'}</button>
			</div>
		</form>

	)
}