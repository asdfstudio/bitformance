import ReCAPTCHA from "react-google-recaptcha"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CloseModal from '../small/CloseModal'
import { login, forgotPassword } from '../../endpoints/index'
import { validateUsername, validatePassword } from '../small/validation'
import { useSWRConfig } from 'swr'
import BFLoading from '../small/BFLoading'
import BFIcon from '../BFIcon'

export default function SignInForm({ setShowModalType, viewShown, setViewShown }) {

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [username, setUsername] = useState(localStorage.getItem('saved_username') || '')
	const [completedRecaptcha, setCompletedRecaptcha] = useState(false)
	const [isRemember, setIsRemember] = useState(false);
	const [resetAccount, setResetAccount] = useState('')

	const { mutate } = useSWRConfig()

	const signIn = async (e) => {
		e.preventDefault()
		setErrorMessage('')
		setIsLoading(true)
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
			setIsLoading(false)
			return
		}
		const passwordError = validatePassword(data.password)
		if (passwordError) {
			setErrorMessage(passwordError)
			setIsLoading(false)
			return
		}

		const result = await login(data.username, data.password)
		console.log(result)
		if (!result.result) {
			setErrorMessage(result.error)
			setIsLoading(false)
			return
		}

		localStorage.setItem('accessToken', result['access-token'])
		localStorage.setItem('userId', result.user.id)
		localStorage.setItem('firstName', result.user.first_name)
		localStorage.setItem('lastName', result.user.last_name)
		localStorage.setItem('username', result.user.username)
		localStorage.setItem('picture', result.user.profile_pic || '')
		setShowModalType('')	
		mutate(`${process.env.REACT_APP_API_URL}/get-user-indexes`)
		mutate(`${process.env.REACT_APP_API_URL}/get-favorited-indexes`)

	}

	const backToSignIn = () => {
		setViewShown('sign-in')
	}

	const resetPasswordLink = async () => {
		const result = await forgotPassword(resetAccount)
		setViewShown('reset-link')
	}

	function onRecaptchaChange(value) {
	  console.log('captch value: ', value)
	  setCompletedRecaptcha(true)
	}

	const ControlButtons = ({ backTo = 'sign-in' }) => (<>
	<div>
		<button 
			onClick={() => setViewShown(backTo)} 
			className="float-left rounded-full px-1 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray"
		>
			<BFIcon iconName="back"/>
		</button>
 		<CloseModal setShowModalType={setShowModalType} topStyle="top-0" />
		 </div>
	</>)


	return (<>
		{viewShown === 'reset-link' && <>
			<ControlButtons backTo="forgot-password" />
			<br />
			<div className="text-[44px] px-2">
				<BFIcon iconName="contact-us" color={"#b7c3d1"} />
			</div>
			<h1 className="text-[30px] mt-2 font-DM_Sans font-medium leading-medium tracking-tight text-main-black">Check your email</h1>
			<p className="text-[14px] font-DM_Sans font-medium leading-normal tracking-normal text-main-gray">If this email address exists in our system, you will receive an email containing instructions on how to reset your password. Please check your spam if you can not find the email.</p>
			<div className="mt-auto">
				<button className="w-full text-sm rounded-lg bg-main-buttonBlue hover:bg-blue:600 text-main-white font-bold py-2 mb-2 cursor-pointer" onClick={() => backToSignIn()}>Go to Sign In</button>
			</div>
		</>}

		{viewShown === 'forgot-password' && <>
			<ControlButtons backTo="sign-in" />
   		<br />

   		<h1 className="text-[30px] mt-2 font-DM_Sans font-medium leading-medium tracking-tight text-main-black">Forgot your password?</h1>
   		<p className="text-[14px] font-DM_Sans font-medium leading-normal tracking-normal text-main-gray">We will send you an email with instructions on how to reset your password.</p>

   		<div>
   			<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal">Username or Email Address</label>
   			<input value={resetAccount} onChange={(e) => setResetAccount(e.target?.value)} className="w-full py-1 border rounded mt-2" type="text" />
   		</div>

   		<div className="mt-auto pb-4">
   			<button className="w-full text-sm rounded-lg bg-main-buttonBlue hover:bg-blue:600 text-main-white font-bold py-2 mt-2 cursor-pointer" onClick={() => resetPasswordLink()}>Send Reset Link</button>
   		</div>
		</>}


		{viewShown === 'sign-in' && <>
			<CloseModal setShowModalType={setShowModalType} />
			{errorMessage && <span className="rounded-lg bg-gray-100 p-2 text-red-500 text-xs m-0">* {errorMessage}</span>}
			<form className="space-y-4" onSubmit={(e) => signIn(e)}>
				<div>
					<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Username or Email Address</label>
					<input value={username} onChange={(e) => setUsername(e.target?.value)} name="username" id="username" className="w-full py-1 border rounded mt-2" type="text" />
				</div>

				<div>
					<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Password</label>
					<input name="password" id="password" className="w-full py-1 mt-2 border rounded" type="password" />
				</div>

				<div className="flex flex-row gap-2">
					<input name="remember-me" id="remember-me" type="checkbox" className="rounded-full"/>
					<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Remember</label>

					<div className="ml-auto flex flex-row">
					<div className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black pr-1">Forgot Password?</div>
					<button type="button" onClick={() => setViewShown('forgot-password')} className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-buttonBlue">Reset</button>
	                </div>			
				</div>


				<ReCAPTCHA
				  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
				  onChange={onRecaptchaChange}
				  className="ml-0 sm:ml-6" 
				/>


				<div className="mt-auto">
					{isLoading ? <div className="mt-2"><BFLoading isCenter={true} /></div> : <input type="submit" className="w-full text-sm rounded-lg bg-main-buttonBlue hover:bg-blue:600 text-main-white font-bold py-2 mt-2 cursor-pointer" value="Sign In" />}
				</div>
			</form>
		</>}
	</>)

}