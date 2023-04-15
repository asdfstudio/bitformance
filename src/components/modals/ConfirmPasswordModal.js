import BFIcon from '../BFIcon'
import ReCAPTCHA from "react-google-recaptcha"
import CloseModal from '../small/CloseModal'
import { contactForm } from '../../endpoints/index'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ConfirmPasswordModal({ setShowModalType }) {
	const navigate = useNavigate()
	const [formSendSuccess, setFormSendSuccess] = useState(false)

	const confirmSessionPassword = async (e) => {
		e.preventDefault()
		setFormSendSuccess(false)
		const formData = new FormData(e.target);
		const keys = [
			'password'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))


		//error check

		//TODO: error message
		sessionStorage.setItem("password", data.password);
		setShowModalType('')
	}

	const redirect = () => {
		setShowModalType('')
		navigate('/')
	}



	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-main-lightGray">		   
		    </div>
		    <form onSubmit={(e) => confirmSessionPassword(e)}>
			    <div className="p-4 space-y-4">
			    	<div>
			    		<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Confirm Password</label>
			    		<input name="password" className="w-full px-2 py-2 mt-2 text-sm border rounded-md bg-main-inputBackground" type="password" placeholder="******" />
			    	</div>
			    	<div className="mt-auto flex flex-row gap-2">
			    		<button className="w-full rounded-lg bg-main-gColor bg-opacity-10 text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gColor py-2" onClick={() => redirect()}>Cancel</button>
			    		<button type="submit" className="w-full rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow-sm shadow-main-shadowBlue text-white py-2">Submit</button>
			    	</div>
		    	</div>
		    </form>
		  </div>
		</div>
	)
}