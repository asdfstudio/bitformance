import ReCAPTCHA from "react-google-recaptcha"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CloseModal from '../small/CloseModal'

export default function SignInForm({ setShowModalType, viewShown, setViewShown }) {

	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [isRemember, setIsRemember] = useState(false);

	const signIn = () => {
		//TODO: sign in
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

	const SignIn = () => (<>
		<CloseModal setShowModalType={setShowModalType} />
		<div>
			<label className="font-bold text-sm">Username or Email Address</label>
			<input className="w-full py-1 border rounded" type="text" />
		</div>

		<div>
			<label className="font-bold text-sm">Password</label>
			<input className="w-full py-1 border rounded" type="password" />
		</div>

		<div className="flex flex-row gap-2">
			<input type="checkbox" />
			<label className="text-sm">Remember</label>

			<button onClick={() => setViewShown('forgot-password')} className="ml-auto underline text-blue-500 text-sm">Forgot Password?</button>
		</div>

		<ReCAPTCHA
		  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
		  onChange={onRecaptchaChange}
		  className="ml-0 sm:ml-6" 
		/>

		<div className="mt-auto">
			<button className="w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => signIn()}>Sign In</button>
		</div>
	</>)

	const ForgotPassword = () => (<>
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
	</>)

	const ResetLinkSent =() => (<>
		<ControlButtons backTo="forgot-password" />
		<br />

		<h1 className="text-2xl">Check your email</h1>
		<p>If this email address exists in our system, you will receive an email containing instructions on how to reset your password. Please check your spam if you can not find the email.</p>
		<div className="mt-auto">
			<button className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2" onClick={() => backToSignIn()}>Go to Sign In</button>
		</div>
	</>)

	return viewShown === 'reset-link' ? <ResetLinkSent /> 
	: viewShown === 'forgot-password' ? <ForgotPassword /> 
	: <SignIn />
}