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
		    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-gray-50">		   
		    </div>

		 
		    <form onSubmit={(e) => confirmSessionPassword(e)}>
			    <div className="p-4 space-y-4">
			    	<div>
			    		<label className="font-bold text-sm">Confirm Password</label>
			    		<input name="password" className="w-full p-2 border rounded" type="password" placeholder="******" />
			    	</div>
			    	<div className="mt-auto flex flex-row gap-2">
			    		<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => redirect()}>Cancel</button>
			    		<button type="submit" className="font-bold w-full text-sm rounded bg-blue-500 hover:bg-blue:600 text-white py-2">Submit</button>
			    	</div>
		    	</div>
		    </form>
		  </div>
		</div>
	)
}