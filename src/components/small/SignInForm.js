import ReCAPTCHA from "react-google-recaptcha"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CloseModal from '../small/CloseModal'
import { login } from '../../endpoints/index'
import { validateUsername, validatePassword } from '../small/validation'

export default function SignInForm({ setShowModalType, viewShown, setViewShown }) {

	const [errorMessage, setErrorMessage] = useState('')
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [isRemember, setIsRemember] = useState(false);

	const signIn = async (e) => {
		e.preventDefault()
		setErrorMessage('')
		const formData = new FormData(e.target);
		const keys = [
			'username',
			'password',
			'remember-me'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))


		const usernameError = validateUsername(data.username)
		if (usernameError) {
			setErrorMessage(usernameError)
			return
		}
		const passwordError = validatePassword(data.password)
		if (passwordError) {
			setErrorMessage(passwordError)
			return
		}

		const result = await login(data.username, data.password)
		console.log(result)
		if (!result.result) {
			setErrorMessage(result.error)
			return
		}

		//TODO: save token
		localStorage.setItem('accessToken', result['access-token'])
		localStorage.setItem('userId', result.user.id)
		localStorage.setItem('firstName', result.user.first_name)
		localStorage.setItem('lastName', result.user.last_name)
		localStorage.setItem('username', result.user.username)
		// localStorage.setItem('picture', result.user.profile)
		setShowModalType('')
	}

	const backToSignIn = () => {
		setViewShown('sign-in')
	}

	const resetPasswordLink = () => {
		//TODO:
		setViewShown('reset-link')
	}

	function onRecaptchaChange(value) {
	  console.log('captch value: ', value)
	  setCompletedRecaptcha(true)
	}

	const ControlButtons = ({ backTo = 'sign-in' }) => (<>
		<button 
			onClick={() => setViewShown(backTo)} 
			className="float-left rounded-full px-1 bg-gray-100"
		>
			back
		</button>
 		<CloseModal setShowModalType={setShowModalType} topStyle="top-0" />
	</>)


	return (<>
		{viewShown === 'reset-link' && <>
			<ControlButtons backTo="forgot-password" />
			<br />

			<h1 className="text-2xl">Check your email</h1>
			<p>If this email address exists in our system, you will receive an email containing instructions on how to reset your password. Please check your spam if you can not find the email.</p>
			<div className="mt-auto">
				<button className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => backToSignIn()}>Go to Sign In</button>
			</div>
		</>}

		{viewShown === 'forgot-password' && <>
			<ControlButtons backTo="sign-in" />
   		<br />

   		<h1 className="text-2xl">Forgot your password?</h1>
   		<p>We will send you an email with instructions on how to reset your password.</p>

   		<div>
   			<label className="font-bold">Username or Email Address</label>
   			<input className="w-full py-1 border rounded" type="text" />
   		</div>

   		<div className="mt-auto pb-4">
   			<button className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => resetPasswordLink()}>Send Reset Link</button>
   		</div>
		</>}


		{viewShown === 'sign-in' && <>
			<CloseModal setShowModalType={setShowModalType} />
			{errorMessage && <span className="rounded-lg bg-gray-100 p-2 text-red-500 text-xs m-0">* {errorMessage}</span>}
			<form onSubmit={(e) => signIn(e)}>
				<div>
					<label className="font-bold text-sm">Username or Email Address</label>
					<input name="username" id="username" className="w-full py-1 border rounded" type="text" />
				</div>

				<div>
					<label className="font-bold text-sm">Password</label>
					<input name="password" id="password" className="w-full py-1 border rounded" type="password" />
				</div>

				<div className="flex flex-row gap-2">
					<input name="remember-me" id="remember-me" type="checkbox" />
					<label className="text-sm">Remember</label>

					<button onClick={() => setViewShown('forgot-password')} className="ml-auto underline text-blue-500 text-sm">Forgot Password?</button>
				</div>


				<ReCAPTCHA
				  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
				  onChange={onRecaptchaChange}
				  className="ml-0 sm:ml-6" 
				/>


				<div className="mt-auto">
					<input type="submit" className="w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2 mt-2" value="Sign In" />
				</div>
			</form>
		</>}
	</>)

}