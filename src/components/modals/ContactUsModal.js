import BFIcon from '../BFIcon'
import ReCAPTCHA from "react-google-recaptcha"
import CloseModal from '../small/CloseModal'
import { contactForm } from '../../endpoints/index'
import { useState } from 'react'

export default function ContactUsModal({ setShowModalType }) {

	const [formSendSuccess, setFormSendSuccess] = useState(false)

	const sendContactForm = async (e) => {
		e.preventDefault()
		setFormSendSuccess(false)
		const formData = new FormData(e.target);
		const keys = [
			'username',
			'subject',
			'email',
			'message'
		]

		let data = {}
		keys.forEach(key => data[key] = formData.get(key))


		//error check

		const result = await contactForm({ ...data })
		console.log(result)
		if (result.result) {
			setFormSendSuccess(true)
			return
		}

		//TODO: error message
		setShowModalType('')
	}

	const onRecaptchaChange = (value) => {
		console.log('captch value: ', value)
		// setCompletedRecaptcha(true)
	}



	return(
		<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
		  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
		    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-main-lightGray">
		    	<CloseModal setShowModalType={setShowModalType} />
		      <div className="sm:flex items-center">
		        <div className="mx-auto flex h-12 w-12 text-[50px] flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
		          <BFIcon color="#40C8B8" iconName="contact-us" />
		        </div>
		        <div className="text-center sm:mt-0 sm:ml-6 sm:text-left">
		          <h3 className="text-[22px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black" id="modal-title">Contact Us</h3>
		        </div>
		      </div>
		    </div>

		    {formSendSuccess ? 
		    	<div className="mx-auto p-8 space-y-4">
		    		<p className="text-lg">Form received <BFIcon iconName="checked-circle" color="green" /></p>
		    		<p><em>We&apos;ll generally reply within 1-2 business days.</em></p>
		    	</div>	
		    :
			    <form onSubmit={(e) => sendContactForm(e)}>
				    <div className="p-4 space-y-4">
				    	<div className='text-[16px] font-DM_Sans leading-normal tracking-normal'>
				    		<label className="text-main-black font-medium">Username</label>
				    		<input name="username" className="w-full px-2 py-2 mt-2 text-sm border rounded-md bg-main-inputBackground text-main-placeholder font-normal" type="text" placeholder="e. g. johndoe" />
				    	</div>
				    	<div className='text-[16px] font-DM_Sans leading-normal tracking-normal'>
				    		<label className="text-main-black font-medium">Subject</label>
				    		<input name="subject" className="w-full px-2 py-2 mt-2 text-sm border rounded-md bg-main-inputBackground text-main-placeholder font-normal" type="text" placeholder="e. g. Need Support" />
				    	</div>
				    	<div className='text-[16px] font-DM_Sans leading-normal tracking-normal'>
				    		<label className="text-main-black font-medium">Email Address</label>
				    		<input name="email" className="w-full px-2 py-2 mt-2 text-sm border rounded-md bg-main-inputBackground text-main-placeholder font-normal" type="text" placeholder="e. g. yourname@gmail.com" />
				    	</div>
				    	<div className="flex flex-row gap-2 items-center text-[12px]">
				    		<span className='pb-5'><BFIcon iconName="info" color="#b7c3d1" /></span>
				    		<p className="text-[16px] font-DM_Sans leading-5 tracking-normal font-normal text-main-placeholder">Please enter a valid email address. We will reply to your inquires to this email.</p>
				    	</div>
				    	<div className='text-[16px] font-DM_Sans leading-normal tracking-normal '>
				    		<label className="text-main-black font-medium">Description</label>
				    		<br />
				    		<textarea name="message" className='w-full px-2 py-2 mt-2 text-sm border rounded-md h-32 text-main-placeholder font-normal'></textarea>
				    	</div>

				    	<ReCAPTCHA
				    	  sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
				    	  onChange={onRecaptchaChange}
				    	/>

				    	<hr />
				    	<div className="mt-auto flex flex-row gap-6">
				    		<button className="w-full rounded-lg bg-main-gColor bg-opacity-10 text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gColor py-2" onClick={() => setShowModalType('')}>Cancel</button>
				    		<button type="submit" className="w-full rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal shadow-sm shadow-main-shadowBlue text-white py-2">Submit</button>
				    	</div>
			    	</div>
			    </form>
		    }

		  </div>
		</div>
	)
}